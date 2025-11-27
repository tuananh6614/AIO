/**
 * AIO - All-In-One Toolkit
 * Main Logic - Ninite-style UI
 */

// ========================================
// DOM Elements
// ========================================
const DOM = {
    navLinks: document.querySelectorAll('.nav-link'),
    tabContents: document.querySelectorAll('.tab-content'),
    softwareCategories: document.getElementById('softwareCategories'),
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    deselectAll: document.getElementById('deselectAll'),
    downloadScript: document.getElementById('downloadScript'),
    selectedCount: document.getElementById('selectedCount'),
    bottomBar: document.getElementById('bottomBar'),
    rescueTools: document.getElementById('rescueTools'),
    onlineServices: document.getElementById('onlineServices'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// ========================================
// State Management
// ========================================
const State = {
    selectedSoftware: new Set(),
    
    toggle(id) {
        if (this.selectedSoftware.has(id)) {
            this.selectedSoftware.delete(id);
        } else {
            this.selectedSoftware.add(id);
        }
        this.updateUI();
    },
    
    clearAll() {
        this.selectedSoftware.clear();
        this.updateUI();
    },
    
    updateUI() {
        const count = this.selectedSoftware.size;
        DOM.selectedCount.textContent = count;
        
        // Update items
        document.querySelectorAll('.software-item').forEach(item => {
            const checkbox = item.querySelector('.software-checkbox');
            const isSelected = this.selectedSoftware.has(item.dataset.id);
            item.classList.toggle('selected', isSelected);
            checkbox.checked = isSelected;
        });
        
        // Show/hide bottom bar
        DOM.bottomBar.classList.toggle('visible', count > 0);
        DOM.downloadScript.disabled = count === 0;
    }
};

// ========================================
// Tab Navigation
// ========================================
function initTabs() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.dataset.tab;
            
            // Update nav links
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update tab contents
            DOM.tabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetTab);
            });
        });
    });
}

// ========================================
// Tab 1: Auto Installer
// ========================================
function renderSoftwareCategories() {
    DOM.softwareCategories.innerHTML = '';
    
    SOFTWARE_DATA.categories.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category';
        categoryEl.innerHTML = `
            <div class="category-header">${category.name}</div>
            <div class="category-content">
                ${category.software.map(sw => renderSoftwareItem(sw)).join('')}
            </div>
        `;
        DOM.softwareCategories.appendChild(categoryEl);
    });
    
    addSoftwareItemListeners();
}

// Render software item - Checklist style (no icon)
function renderSoftwareItem(software) {
    return `
        <div class="software-item" data-id="${software.id}" data-name="${software.name.toLowerCase()}">
            <input type="checkbox" class="software-checkbox" id="sw-${software.id.replace(/\./g, '-')}">
            <label class="software-label" for="sw-${software.id.replace(/\./g, '-')}">${software.name}</label>
        </div>
    `;
}

function addSoftwareItemListeners() {
    document.querySelectorAll('.software-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent double-trigger from checkbox/label
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;
            State.toggle(item.dataset.id);
        });
        
        item.querySelector('.software-checkbox').addEventListener('change', () => {
            State.toggle(item.dataset.id);
        });
    });
}

// Search
function initSearch() {
    DOM.searchInput.addEventListener('input', (e) => {
        filterSoftware(e.target.value.toLowerCase().trim());
    });
    
    DOM.clearSearch.addEventListener('click', () => {
        DOM.searchInput.value = '';
        filterSoftware('');
        DOM.searchInput.focus();
    });
}

function filterSoftware(query) {
    document.querySelectorAll('.software-item').forEach(item => {
        const name = item.dataset.name;
        const id = item.dataset.id.toLowerCase();
        item.classList.toggle('hidden', !name.includes(query) && !id.includes(query));
    });
    
    // Hide empty categories
    document.querySelectorAll('.category').forEach(category => {
        const visible = category.querySelectorAll('.software-item:not(.hidden)').length;
        category.style.display = visible === 0 ? 'none' : '';
    });
}

// Action buttons
function initActionButtons() {
    DOM.deselectAll.addEventListener('click', () => {
        State.clearAll();
        showToast('Đã bỏ chọn tất cả');
    });
    
    DOM.downloadScript.addEventListener('click', () => {
        if (State.selectedSoftware.size > 0) generateAndDownloadScript();
    });
}

// Generate .bat script
function generateAndDownloadScript() {
    const selectedIds = Array.from(State.selectedSoftware);
    const timestamp = new Date().toLocaleString('vi-VN');
    
    let script = `@echo off
chcp 65001 >nul
title AIO - Auto Installer
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║            AIO - All-In-One Toolkit - Auto Installer         ║
echo  ╠══════════════════════════════════════════════════════════════╣
echo  ║  So luong phan mem: ${String(selectedIds.length).padEnd(40)}║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

:: Kiem tra quyen Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Vui long chay file nay voi quyen Administrator!
    echo Click chuot phai -^> Run as administrator
    pause
    exit /b 1
)

:: Kiem tra Winget
where winget >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Winget chua duoc cai dat!
    echo Vui long cai App Installer tu Microsoft Store.
    start ms-windows-store://pdp/?productid=9NBLGGH4NNS1
    pause
    exit /b 1
)

echo [INFO] Bat dau cai dat ${selectedIds.length} phan mem...
echo.
set /a total=${selectedIds.length}
set /a current=0
set /a success=0
set /a failed=0

`;

    selectedIds.forEach((id, index) => {
        const software = findSoftwareById(id);
        const name = software ? software.name : id;
        script += `
:: [${index + 1}/${selectedIds.length}] ${name}
set /a current+=1
echo.
echo ════════════════════════════════════════════════════════════════
echo [%current%/%total%] Dang cai dat: ${name}
echo ════════════════════════════════════════════════════════════════
winget install -e --id ${id} --silent --accept-package-agreements --accept-source-agreements
if %errorlevel% equ 0 (
    echo [OK] ${name} - Cai dat thanh cong!
    set /a success+=1
) else (
    echo [SKIP] ${name} - Da co hoac loi
    set /a failed+=1
)
`;
    });

    script += `
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    HOAN TAT CAI DAT                          ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Thanh cong: %success% / %total%
echo ║  That bai/Bo qua: %failed% / %total%
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Nhan phim bat ky de dong cua so...
pause >nul
`;

    downloadFile('AIO-Installer.bat', script);
    showToast(`Đã tải script cài đặt ${selectedIds.length} phần mềm`);
}

function findSoftwareById(id) {
    for (const cat of SOFTWARE_DATA.categories) {
        const found = cat.software.find(sw => sw.id === id);
        if (found) return found;
    }
    return null;
}

// ========================================
// Tab 2: Rescue Tools
// ========================================
function renderRescueTools() {
    DOM.rescueTools.innerHTML = RESCUE_TOOLS.map(tool => `
        <div class="rescue-card">
            <div class="rescue-icon">${tool.icon}</div>
            <div class="rescue-info">
                <h3 class="rescue-name">${tool.name}</h3>
                <p class="rescue-desc">${tool.description}</p>
                <a href="repo/${tool.filename}" class="rescue-download" download>
                    ⬇️ Tải về
                </a>
            </div>
        </div>
    `).join('');
}

// ========================================
// Tab 3: Online Services
// ========================================
function renderOnlineServices() {
    DOM.onlineServices.innerHTML = ONLINE_SERVICES.map(service => `
        <div class="online-card">
            <span class="online-icon">${service.icon}</span>
            <h3 class="online-name">${service.name}</h3>
            <p class="online-desc">${service.description}</p>
            <a href="${service.url}" target="_blank" rel="noopener" class="online-link">
                🔗 Truy cập
            </a>
        </div>
    `).join('');
}

// ========================================
// Utilities
// ========================================
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function showToast(message) {
    DOM.toastMessage.textContent = message;
    DOM.toast.classList.add('show');
    setTimeout(() => DOM.toast.classList.remove('show'), 3000);
}

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderSoftwareCategories();
    renderRescueTools();
    renderOnlineServices();
    initSearch();
    initActionButtons();
    State.updateUI();
});
