/**
 * IT-Box: Main Logic
 * File này xử lý toàn bộ logic của ứng dụng
 * Data được import từ software-data.js
 */

// ========================================
// DOM Elements
// ========================================
const DOM = {
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    softwareCategories: document.getElementById('softwareCategories'),
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    selectAll: document.getElementById('selectAll'),
    deselectAll: document.getElementById('deselectAll'),
    downloadScript: document.getElementById('downloadScript'),
    selectedCount: document.getElementById('selectedCount'),
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
    
    addSoftware(id) {
        this.selectedSoftware.add(id);
        this.updateUI();
    },
    
    removeSoftware(id) {
        this.selectedSoftware.delete(id);
        this.updateUI();
    },
    
    toggleSoftware(id) {
        if (this.selectedSoftware.has(id)) {
            this.removeSoftware(id);
        } else {
            this.addSoftware(id);
        }
    },
    
    clearAll() {
        this.selectedSoftware.clear();
        this.updateUI();
    },
    
    selectAllVisible() {
        document.querySelectorAll('.software-card:not(.hidden)').forEach(card => {
            this.selectedSoftware.add(card.dataset.id);
        });
        this.updateUI();
    },
    
    updateUI() {
        DOM.selectedCount.textContent = this.selectedSoftware.size;
        document.querySelectorAll('.software-card').forEach(card => {
            const checkbox = card.querySelector('.software-checkbox');
            if (this.selectedSoftware.has(card.dataset.id)) {
                card.classList.add('selected');
                checkbox.checked = true;
            } else {
                card.classList.remove('selected');
                checkbox.checked = false;
            }
        });
        DOM.downloadScript.disabled = this.selectedSoftware.size === 0;
    }
};

// ========================================
// Tab Navigation
// ========================================
function initTabs() {
    DOM.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            DOM.tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            DOM.tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
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
            <div class="category-header" data-category="${category.id}">
                <span class="category-icon">${category.icon}</span>
                <h3 class="category-title">${category.name}</h3>
                <span class="category-count">${category.software.length} phần mềm</span>
                <span class="category-toggle">▼</span>
            </div>
            <div class="category-content">
                ${category.software.map(sw => renderSoftwareCard(sw)).join('')}
            </div>
        `;
        DOM.softwareCategories.appendChild(categoryEl);
    });
    
    addSoftwareCardListeners();
    addCategoryToggleListeners();
}

function renderSoftwareCard(software) {
    const iconPath = `assets/icons/${software.icon}`;
    const iconFallback = software.name.charAt(0).toUpperCase();
    
    return `
        <div class="software-card" data-id="${software.id}" data-name="${software.name.toLowerCase()}">
            <input type="checkbox" class="software-checkbox" tabindex="-1">
            <img src="${iconPath}" alt="${software.name}" class="software-icon" 
                 onerror="this.outerHTML='<div class=\\'software-icon placeholder\\'>${iconFallback}</div>'">
            <span class="software-name">${software.name}</span>
        </div>
    `;
}

function addSoftwareCardListeners() {
    document.querySelectorAll('.software-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('software-checkbox')) return;
            State.toggleSoftware(card.dataset.id);
        });
        
        card.querySelector('.software-checkbox').addEventListener('change', () => {
            State.toggleSoftware(card.dataset.id);
        });
    });
}

function addCategoryToggleListeners() {
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', () => {
            header.closest('.category').classList.toggle('collapsed');
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
    document.querySelectorAll('.software-card').forEach(card => {
        const name = card.dataset.name;
        const id = card.dataset.id.toLowerCase();
        card.classList.toggle('hidden', !name.includes(query) && !id.includes(query));
    });
    
    document.querySelectorAll('.category').forEach(category => {
        const visible = category.querySelectorAll('.software-card:not(.hidden)').length;
        category.style.display = visible === 0 ? 'none' : 'block';
        if (query && visible > 0) category.classList.remove('collapsed');
    });
}

// Action buttons
function initActionButtons() {
    DOM.selectAll.addEventListener('click', () => {
        State.selectAllVisible();
        showToast('Đã chọn tất cả phần mềm hiển thị');
    });
    
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
title IT-Box Auto Installer
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║         IT-Box: All-In-One Toolkit - Auto Installer          ║
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

    downloadFile('IT-Box-Installer.bat', script);
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
