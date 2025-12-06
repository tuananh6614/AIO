/**
 * AIO - All-In-One Toolkit
 * Main Logic - Ninite-style UI
 */

// ========================================
// Loading Screen
// ========================================
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hide');
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Hide loading screen when page is fully loaded
window.addEventListener('load', () => {
    // Minimum display time for branding (1.5s)
    setTimeout(hideLoadingScreen, 1500);
});

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
// Tab Navigation & Theme System
// ========================================
const THEMES = {
    installer: {
        class: '',
        logo: 'assets/logo/AIO-logo.png'
    },
    rescue: {
        class: 'theme-rescue',
        logo: 'assets/logo/AIO-logo2.png'
    },
    online: {
        class: 'theme-online',
        logo: 'assets/logo/AIO-logo3.png'
    }
};

function switchTheme(tabName) {
    const theme = THEMES[tabName];
    if (!theme) return;
    
    // Remove all theme classes
    document.body.classList.remove('theme-rescue', 'theme-online');
    
    // Add new theme class
    if (theme.class) {
        document.body.classList.add(theme.class);
    }
    
    // Animate logo change
    const logoImg = document.querySelector('.logo-img');
    if (logoImg && logoImg.src !== theme.logo) {
        logoImg.classList.add('fade-out');
        setTimeout(() => {
            logoImg.src = theme.logo;
            logoImg.classList.remove('fade-out');
        }, 200);
    }
}

function initTabs() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.dataset.tab;
            
            // Update nav links
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Switch theme with animation
            switchTheme(targetTab);
            
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
const VISIBLE_ITEMS_LIMIT = 5;

function renderSoftwareCategories() {
    DOM.softwareCategories.innerHTML = '';
    
    SOFTWARE_DATA.categories.forEach((category, index) => {
        const totalItems = category.software.length;
        const hasMore = totalItems > VISIBLE_ITEMS_LIMIT;
        const hiddenCount = totalItems - VISIBLE_ITEMS_LIMIT;
        
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category';
        categoryEl.innerHTML = `
            <div class="category-header">${category.name}</div>
            <div class="category-content ${hasMore ? 'collapsed' : ''}" data-category="${index}">
                ${category.software.map((sw, i) => renderSoftwareItem(sw, hasMore && i >= VISIBLE_ITEMS_LIMIT)).join('')}
                ${hasMore ? `
                    <button class="category-toggle" data-category="${index}" data-count="${hiddenCount}" title="+${hiddenCount}">
                        <span class="toggle-dots">•••</span>
                        <span class="toggle-count">+${hiddenCount}</span>
                    </button>
                ` : ''}
            </div>
        `;
        DOM.softwareCategories.appendChild(categoryEl);
    });
    
    addSoftwareItemListeners();
    addCategoryToggleListeners();
}

function addCategoryToggleListeners() {
    document.querySelectorAll('.category-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const categoryIndex = btn.dataset.category;
            const content = btn.closest('.category-content');
            const isExpanded = !content.classList.contains('collapsed');
            
            if (isExpanded) {
                // Collapse
                content.classList.add('collapsed');
                btn.classList.remove('expanded');
            } else {
                // Expand
                content.classList.remove('collapsed');
                btn.classList.add('expanded');
            }
        });
    });
}

// Render software item - With real icon from assets/icons/
function renderSoftwareItem(software, isHidden = false) {
    const iconPath = `assets/icons/${software.icon}`;
    const fallback = software.name.charAt(0).toUpperCase();
    const hiddenClass = isHidden ? ' hidden-item' : '';
    
    return `
        <div class="software-item${hiddenClass}" data-id="${software.id}" data-name="${software.name.toLowerCase()}">
            <input type="checkbox" class="software-checkbox" id="sw-${software.id.replace(/\./g, '-')}">
            <img class="software-icon" src="${iconPath}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="software-icon-fallback">${fallback}</span>
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
        const customInput = document.getElementById('customWingetIds');
        const hasCustomIds = customInput && customInput.value.trim().length > 0;
        const hasSelectedSoftware = State.selectedSoftware.size > 0;
        
        if (hasSelectedSoftware || hasCustomIds) {
            generateAndDownloadScript();
        } else {
            showToast('Vui long chon phan mem hoac nhap Custom ID!');
        }
    });
}

// Generate .bat script - Pure ASCII for CMD compatibility
function generateAndDownloadScript() {
    const selectedIds = Array.from(State.selectedSoftware);
    
    // Get custom Winget IDs from input
    const customInput = document.getElementById('customWingetIds');
    const customIdsRaw = customInput ? customInput.value : '';
    const customIds = customIdsRaw
        .split(',')
        .map(id => id.trim())
        .filter(id => id.length > 0);
    
    // Combine selected + custom
    const allIds = [...selectedIds];
    const total = allIds.length + customIds.length;
    
    // Build script content directly with CRLF
    let script = '';
    const addLine = (line = '') => { script += line + '\r\n'; };
    
    // Header + Auto-Elevate to Administrator
    addLine('@echo off');
    addLine('setlocal EnableDelayedExpansion');
    addLine();
    addLine(':: Check for admin rights and self-elevate if needed');
    addLine('set "SCRIPT_PATH=%~f0"');
    addLine('net session >nul 2>&1');
    addLine('if %errorlevel% neq 0 (');
    addLine('    echo.');
    addLine('    echo ============================================');
    addLine('    echo    Dang yeu cau quyen Administrator...');
    addLine('    echo    Vui long chon YES trong hop thoai tiep theo');
    addLine('    echo ============================================');
    addLine('    echo.');
    addLine('    timeout /t 2 >nul');
    addLine('    powershell -Command "Start-Process cmd -ArgumentList \'/c \"\"%SCRIPT_PATH%\"\"\' -Verb RunAs"');
    addLine('    exit /b 0');
    addLine(')');
    addLine();
    addLine(':: ============================================');
    addLine(':: RUNNING AS ADMINISTRATOR');
    addLine(':: ============================================');
    addLine('title AIO - Auto Installer [Administrator]');
    addLine('mode con: cols=80 lines=40');
    addLine();
    addLine(':: Setup colors using PowerShell');
    addLine('for /F "delims=" %%a in (\'powershell -Command "[char]27"\') do set "E=%%a"');
    addLine();
    addLine(':: RGB Animation Loading');
    addLine('for %%c in (196 202 208 214 220 226 190 154 118 82 46 47 48 49 50 51 45 39 33 27 21 57 93 129 165 201 200 199 198 197) do (');
    addLine('    cls');
    addLine('    echo.');
    addLine('    echo.');
    addLine('    echo.');
    addLine('    echo.');
    addLine('    echo   %E%[38;5;%%cm    ###    ####  #######  %E%[0m');
    addLine('    echo   %E%[38;5;%%cm   ## ##    ##  ##     ## %E%[0m');
    addLine('    echo   %E%[38;5;%%cm  ##   ##   ##  ##     ## %E%[0m');
    addLine('    echo   %E%[38;5;%%cm ##     ##  ##  ##     ## %E%[0m');
    addLine('    echo   %E%[38;5;%%cm #########  ##  ##     ## %E%[0m');
    addLine('    echo   %E%[38;5;%%cm ##     ##  ##  ##     ## %E%[0m');
    addLine('    echo   %E%[38;5;%%cm ##     ## ####  #######  %E%[0m');
    addLine('    echo.');
    addLine('    echo   %E%[38;5;%%cm        ALL-IN-ONE TOOLKIT%E%[0m');
    addLine('    echo.');
    addLine('    echo            %E%[90mDang khoi dong...%E%[0m');
    addLine('    ping -n 1 -w 50 127.0.0.1 >nul');
    addLine(')');
    addLine();
    addLine('cls');
    addLine('echo.');
    addLine('echo  %E%[38;5;208m    ###    ####  #######  %E%[0m');
    addLine('echo  %E%[38;5;214m   ## ##    ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;220m  ##   ##   ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;226m ##     ##  ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;220m #########  ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;214m ##     ##  ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;208m ##     ## ####  #######  %E%[0m');
    addLine('echo.');
    addLine('echo  %E%[36m===========================================================%E%[0m');
    addLine('echo  %E%[97m          ALL-IN-ONE TOOLKIT  -  Auto Installer%E%[0m');
    addLine('echo  %E%[36m===========================================================%E%[0m');
    addLine('echo.');
    addLine('echo  %E%[90m  [*] So luong phan mem :%E%[0m %E%[93m' + total + '%E%[0m');
    addLine('echo  %E%[90m  [*] Quyen             :%E%[0m %E%[92mAdministrator%E%[0m');
    addLine('echo  %E%[90m  [*] Powered by        :%E%[0m %E%[96mWinget%E%[0m');
    addLine('echo.');
    addLine('echo  %E%[36m===========================================================%E%[0m');
    addLine('echo.');
    addLine();
    
    // Check and Auto-Install Winget
    addLine('echo  %E%[96m[*]%E%[0m Dang kiem tra Winget...');
    addLine('where winget >nul 2>&1');
    addLine('if %errorlevel% neq 0 (');
    addLine('    echo  %E%[93m[!]%E%[0m Winget chua duoc cai dat!');
    addLine('    echo  %E%[96m[*]%E%[0m Dang tu dong cai dat Winget...');
    addLine('    echo.');
    addLine('    ');
    addLine('    :: Download and install Winget from GitHub');
    addLine('    set "WINGET_URL=https://github.com/microsoft/winget-cli/releases/latest/download/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle"');
    addLine('    set "WINGET_FILE=%TEMP%\\WingetInstaller.msixbundle"');
    addLine('    ');
    addLine('    echo  %E%[96m[*]%E%[0m Dang tai Winget tu GitHub...');
    addLine('    powershell -Command "Invoke-WebRequest -Uri \'%WINGET_URL%\' -OutFile \'%WINGET_FILE%\'"');
    addLine('    if not exist "%WINGET_FILE%" (');
    addLine('        echo  %E%[91m[X]%E%[0m Khong the tai Winget! Vui long kiem tra ket noi mang.');
    addLine('        echo  %E%[96m[*]%E%[0m Thu cai thu cong tu Microsoft Store...');
    addLine('        start ms-windows-store://pdp/?productid=9NBLGGH4NNS1');
    addLine('        pause');
    addLine('        exit /b 1');
    addLine('    )');
    addLine('    ');
    addLine('    echo  %E%[96m[*]%E%[0m Dang cai dat Winget...');
    addLine('    powershell -Command "Add-AppxPackage -Path \'%WINGET_FILE%\'"');
    addLine('    del "%WINGET_FILE%" >nul 2>&1');
    addLine('    ');
    addLine('    :: Verify installation');
    addLine('    timeout /t 3 >nul');
    addLine('    where winget >nul 2>&1');
    addLine('    if %errorlevel% neq 0 (');
    addLine('        echo  %E%[91m[X]%E%[0m Cai dat Winget that bai!');
    addLine('        echo  %E%[96m[*]%E%[0m Vui long cai thu cong tu Microsoft Store.');
    addLine('        start ms-windows-store://pdp/?productid=9NBLGGH4NNS1');
    addLine('        pause');
    addLine('        exit /b 1');
    addLine('    )');
    addLine('    echo  %E%[92m[OK]%E%[0m Winget da duoc cai dat thanh cong!');
    addLine('    echo.');
    addLine(')');
    addLine('echo  %E%[92m[OK]%E%[0m Winget san sang!');
    addLine('echo.');
    addLine();
    
    // Init counters
    addLine('echo  %E%[96m[*]%E%[0m Bat dau cai dat %E%[93m' + total + '%E%[0m phan mem...');
    addLine('echo.');
    addLine('set /a total=' + total);
    addLine('set /a current=0');
    addLine('set /a success=0');
    addLine('set /a failed=0');
    addLine();
    
    // Install each software from list
    selectedIds.forEach((id, index) => {
        const software = findSoftwareById(id);
        const name = software ? software.name : id;
        // Remove special characters from name for CMD
        const safeName = name.replace(/[^a-zA-Z0-9\s\-\.\+]/g, '');
        
        addLine('set /a current+=1');
        addLine('echo.');
        addLine('echo  %E%[36m-----------------------------------------------------------%E%[0m');
        addLine('echo  %E%[97m[!current!/!total!]%E%[0m %E%[38;5;208m' + safeName + '%E%[0m');
        addLine('echo  %E%[36m-----------------------------------------------------------%E%[0m');
        addLine('winget install -e --id ' + id + ' --force --accept-package-agreements --accept-source-agreements');
        addLine('if !errorlevel! equ 0 (');
        addLine('    echo  %E%[92m[OK]%E%[0m ' + safeName + ' - Thanh cong!');
        addLine('    set /a success+=1');
        addLine(') else (');
        addLine('    echo  %E%[93m[~]%E%[0m ' + safeName + ' - Da co hoac loi');
        addLine('    set /a failed+=1');
        addLine(')');
        addLine();
    });
    
    // Install custom Winget IDs
    if (customIds.length > 0) {
        addLine('echo.');
        addLine('echo  %E%[95m==================== CUSTOM INSTALL ====================%E%[0m');
        addLine('echo.');
        
        customIds.forEach((id) => {
            // Use ID as name for custom installs
            const safeName = id.replace(/[^a-zA-Z0-9\s\-\.\+]/g, '');
            
            addLine('set /a current+=1');
            addLine('echo.');
            addLine('echo  %E%[35m-----------------------------------------------------------%E%[0m');
            addLine('echo  %E%[97m[!current!/!total!]%E%[0m %E%[95m[CUSTOM]%E%[0m %E%[38;5;213m' + safeName + '%E%[0m');
            addLine('echo  %E%[35m-----------------------------------------------------------%E%[0m');
            addLine('winget install -e --id ' + id + ' --force --accept-package-agreements --accept-source-agreements');
            addLine('if !errorlevel! equ 0 (');
            addLine('    echo  %E%[92m[OK]%E%[0m ' + safeName + ' - Thanh cong!');
            addLine('    set /a success+=1');
            addLine(') else (');
            addLine('    echo  %E%[93m[~]%E%[0m ' + safeName + ' - Da co hoac loi');
            addLine('    set /a failed+=1');
            addLine(')');
            addLine();
        });
    }
    
    // Summary with nice box
    addLine('echo.');
    addLine('echo  %E%[36m===========================================================%E%[0m');
    addLine('echo.');
    addLine('echo  %E%[38;5;208m    ###    ####  #######  %E%[0m');
    addLine('echo  %E%[38;5;214m   ## ##    ##  ##     ## %E%[0m   %E%[97mHOAN TAT CAI DAT!%E%[0m');
    addLine('echo  %E%[38;5;220m  ##   ##   ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;226m ##     ##  ##  ##     ## %E%[0m   %E%[92mThanh cong:%E%[0m %E%[92m!success!%E%[0m / %E%[93m!total!%E%[0m');
    addLine('echo  %E%[38;5;220m #########  ##  ##     ## %E%[0m   %E%[91mThat bai:%E%[0m  %E%[91m!failed!%E%[0m / %E%[93m!total!%E%[0m');
    addLine('echo  %E%[38;5;214m ##     ##  ##  ##     ## %E%[0m');
    addLine('echo  %E%[38;5;208m ##     ## ####  #######  %E%[0m');
    addLine('echo.');
    addLine('echo  %E%[36m===========================================================%E%[0m');
    addLine('echo.');
    addLine('echo  %E%[90mNhan phim bat ky de dong...%E%[0m');
    addLine('pause >nul');
    
    // Download as ASCII/ANSI (no BOM, no UTF-8)
    downloadBatFile('AIO-Installer.bat', script);
    
    // Show toast with details
    let toastMsg = 'Da tai script cai dat ' + total + ' phan mem';
    if (customIds.length > 0) {
        toastMsg += ' (bao gom ' + customIds.length + ' custom)';
    }
    showToast(toastMsg);
    
    // Clear custom input after download
    if (customInput) customInput.value = '';
}

// Download .bat file - Manual byte encoding for CRLF
function downloadBatFile(filename, content) {
    try {
        // Manually convert to bytes, ensuring \r\n stays as 0x0D 0x0A
        const bytes = [];
        for (let i = 0; i < content.length; i++) {
            const charCode = content.charCodeAt(i);
            // Only use ASCII range (0-127)
            if (charCode < 128) {
                bytes.push(charCode);
            }
        }
        
        const uint8Array = new Uint8Array(bytes);
        const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('Loi tai file: ' + error.message);
    }
}

function findSoftwareById(id) {
    for (const cat of SOFTWARE_DATA.categories) {
        const found = cat.software.find(sw => sw.id === id);
        if (found) return found;
    }
    return null;
}

// ========================================
// Tab 2: Tool & Crack
// ========================================
const RESCUE_CATEGORIES = {
    crack: "CR@CK & ACTIVATE",
    boot: "BOOT & CÀI WIN",
    info: "THÔNG TIN PHẦN CỨNG",
    disk: "QUẢN LÝ Ổ CỨNG",
    driver: "DRIVER",
    benchmark: "KIỂM TRA & STRESS TEST",
    rescue: "BỘ CÔNG CỤ CỨU HỘ"
};


function renderRescueTools() {
    // Nhóm tools theo category
    const grouped = RESCUE_TOOLS.reduce((acc, tool) => {
        const cat = tool.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(tool);
        return acc;
    }, {});
    
    // Build Quick Navigation
    let navHtml = '<div class="rescue-nav">';
    for (const catId of Object.keys(RESCUE_CATEGORIES)) {
        if (grouped[catId]) {
            const name = RESCUE_CATEGORIES[catId];
            const count = grouped[catId].length;
            navHtml += `<a href="#cat-${catId}" class="rescue-nav-item" data-cat="${catId}">
                <span class="nav-name">${name}</span>
                <span class="nav-count">${count}</span>
            </a>`;
        }
    }
    navHtml += '</div>';
    
    // Render theo từng nhóm
    let html = navHtml + '<div class="rescue-content">';
    for (const [catId, tools] of Object.entries(grouped)) {
        const catName = RESCUE_CATEGORIES[catId] || catId.toUpperCase();
        html += `
            <div class="rescue-category" id="cat-${catId}">
                <h3 class="category-header">${catName}</h3>
                <div class="rescue-list">
                    ${tools.map(tool => `
                        <div class="rescue-item">
                            <span class="rescue-item-name">${tool.name}</span>
                            <span class="rescue-item-spacer"></span>
                            <span class="rescue-item-desc">${tool.description}</span>
                            <a href="repo/${tool.filename}" class="rescue-item-btn" download title="Tải ${tool.name}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    html += '</div>'; // Close rescue-content
    
    DOM.rescueTools.innerHTML = html;
    
    // Add smooth scroll for quick nav
    document.querySelectorAll('.rescue-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const catId = item.dataset.cat;
            const target = document.getElementById(`cat-${catId}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Highlight active nav
                document.querySelectorAll('.rescue-nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// Tab 3: Online Services (Modern Cards)
// ========================================
function renderOnlineServices() {
    DOM.onlineServices.innerHTML = ONLINE_SERVICES.map(service => {
        const isInternal = service.url.startsWith('speedtest/');
        return `
        <a href="${service.url}" 
           ${isInternal ? '' : 'target="_blank" rel="noopener"'}
           class="online-card" 
           style="--card-color: ${service.color}">
            <span class="status-badge">Online</span>
            <h3 class="online-name">${service.name}</h3>
            <p class="online-desc">${service.description}</p>
        </a>
    `}).join('');
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
// Dark Mode Toggle
// ========================================
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('aio-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('aio-theme', isDark ? 'dark' : 'light');
    });
}

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initTabs();
    renderSoftwareCategories();
    renderRescueTools();
    renderOnlineServices();
    initSearch();
    initActionButtons();
    State.updateUI();
});
