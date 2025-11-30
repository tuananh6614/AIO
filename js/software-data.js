/**
 * IT-Box: Software Data
 * File này chứa toàn bộ dữ liệu phần mềm, tools và dịch vụ online
 * Dễ dàng chỉnh sửa: Chỉ cần thêm/xóa object trong mảng tương ứng
 */

// ========================================
// TAB 1: AUTO INSTALLER - Danh sách phần mềm Winget
// ========================================
const SOFTWARE_DATA = {
    categories: [
        {
            id: "browsers",
            name: "TRÌNH DUYỆT WEB",
            software: [
                { id: "Google.Chrome", name: "Google Chrome", icon: "icons8-google-chrome-48.png" },
                { id: "Mozilla.Firefox", name: "Mozilla Firefox", icon: "firefox.png" },
                { id: "Microsoft.Edge", name: "Microsoft Edge", icon: "icons8-microsoft-edge-48.png" },
                { id: "BraveSoftware.BraveBrowser", name: "Brave Browser", icon: "icons8-brave-web-browser-48.png" },
                { id: "Opera.Opera", name: "Opera", icon: "icons8-opera-48.png" },
                { id: "CocCoc.CocCoc", name: "Cốc Cốc", icon: "icons8-coc-coc-48.png" }
            ]
        },

        {
            id: "office",
            name: "VĂN PHÒNG & TÀI LIỆU",
            software: [

            ]
        },
        
        {
            id: "communication",
            name: "CHAT & LIÊN LẠC",
            software: [
                { id: "Zoom.Zoom", name: "Zoom", icon: "zoom.png" },
                { id: "Microsoft.Teams", name: "Microsoft Teams", icon: "icons8-microsoft-team-48.png" },
                { id: "Discord.Discord", name: "Discord", icon: "icons8-discord-48.png" },
                { id: "Telegram.TelegramDesktop", name: "Telegram", icon: "icons8-telegram-48.png" },
                { id: "VNGCorp.Zalo", name: "Zalo", icon: "icons8-zalo-48.png" },

           
            ]
        },
        {
            id: "media",
            name: "ĐA PHƯƠNG TIỆN",
            software: [
                { id: "VideoLAN.VLC", name: "VLC Media Player", icon: "vlc.png" },
                { id: "KMPlayer.KMPlayer", name: "KMPlayer", icon: "kmplayer.png" },
                { id: "Spotify.Spotify", name: "Spotify", icon: "spotify.png" },
                { id: "AIMP.AIMP", name: "AIMP", icon: "aimp.png" },
                { id: "clsid2.mpc-hc", name: "MPC-HC", icon: "mpchc.png" },
                { id: "Daum.PotPlayer", name: "PotPlayer", icon: "potplayer.png" },
                { id: "HiBitSoftware.HiBitUninstaller", name: "HiBit Uninstaller", icon: "hibit.png"},
            ]
        },
        {
            id: "graphics",
            name: "ĐỒ HỌA & CHỈNH SỬA",
            software: [
                { id: "GIMP.GIMP", name: "GIMP", icon: "gimp.png" },
                { id: "Inkscape.Inkscape", name: "Inkscape", icon: "inkscape.png" },
                { id: "IrfanView.IrfanView", name: "IrfanView", icon: "irfanview.png" },
                { id: "ShareX.ShareX", name: "ShareX", icon: "sharex.png" },
                { id: "Greenshot.Greenshot", name: "Greenshot", icon: "greenshot.png" },
                { id: "BlenderFoundation.Blender", name: "Blender", icon: "blender.png" },
                { id: "OBSProject.OBSStudio", name: "OBS Studio", icon: "obs.png" },
                { id: "HandBrake.HandBrake", name: "HandBrake", icon: "handbrake.png" }
            ]
        },
        {
            id: "developer",
            name: "LẬP TRÌNH & DEV TOOLS",
            software: [
                { id: "Microsoft.VisualStudioCode", name: "VS Code", icon: "icons8-visual-studio-code-2019-48.png" },
                { id: "Git.Git", name: "Git", icon: "icons8-git-48.png" },
                { id: "GitHub.GitHubDesktop", name: "GitHub Desktop", icon: "icons8-github-50.png" },
                { id: "OpenJS.NodeJS.LTS", name: "Node.js LTS", icon: "icons8-node-js-48.png" },
                { id: "Python.Python.3.12", name: "Python 3.12", icon: "icons8-python-48.png" },
                { id: "Oracle.JDK.21", name: "Java JDK 21", icon: "icons8-java-48.png" },
                { id: "Docker.DockerDesktop", name: "Docker Desktop", icon: "icons8-docker-48.png" },
                { id: "JetBrains.IntelliJIDEA.Community", name: "IntelliJ IDEA", icon: "icons8-intellij-idea-48.png" },
                { id: "WinSCP.WinSCP", name: "WinSCP", icon: "winscp.png" },
                { id: "PuTTY.PuTTY", name: "PuTTY", icon: "putty.png" },
                { id: "Termius.Termius", name: "Termius", icon: "icons8-termius-64.png" },
                { id: "ArduinoSA.IDE.stable", name: "Arduino IDE", icon: "icons8-arduino-48.png" },
                { id: "Codeium.Windsurf", name: "Windsurf", icon: "icons8-windsurf-48.png"},
                { id: "Microsoft.WindowsTerminal", name: "Windows Terminal", icon: "icons8-terminal-48.png" },
                { id: "ApacheFriends.Xampp.8.2", name: "XAMPP", icon: "xampp.png"},
                { id: "JetBrains.PyCharm", name: "PyCharm", icon: "pycharm.png"},
                { id: "Google.AndroidStudio", name: "AndroidStudio",   icon: "AndroidStudio.png"}
            ]
        },

        {
            id: "utilities",
            name: "TIỆN ÍCH HỆ THỐNG",
            software: [
                { id: "7zip.7zip", name: "7-Zip", icon: "7zip.png" },
                { id: "RARLab.WinRAR", name: "WinRAR", icon: "winrar.png" },
                { id: "voidtools.Everything", name: "Everything", icon: "everything.png" },
                { id: "AntibodySoftware.WizTree", name: "WizTree", icon: "wiztree.png" },
                { id: "Bitwarden.Bitwarden", name: "Bitwarden", icon: "bitwarden.png" },
                { id: "TeamViewer.TeamViewer", name: "TeamViewer", icon: "teamviewer.png" },
                { id: "AnyDesk.AnyDesk", name: "AnyDesk", icon: "anydesk.png" },
                { id: "RustDesk.RustDesk", name: "RustDesk", icon: "rustdesk.png" },
                { id: "Skillbrains.Lightshot", name: "Lightshot", icon: "lightshot.png" },
                { id: "flux.flux", name: "f.lux", icon: "flux.png" }
            ]
        },

        {
            id: "gaming",
            name: "GAME",
            software: [
                { id: "Valve.Steam", name: "Steam", icon: "steam.png" },
                { id: "EpicGames.EpicGamesLauncher", name: "Epic Games", icon: "epicgames.png" },
                { id: "GOG.Galaxy", name: "GOG Galaxy", icon: "gog.png" },
                { id: "Ubisoft.Connect", name: "Ubisoft Connect", icon: "ubisoft.png" },,
                { id: "Blizzard.BattleNet", name: "Battle.net", icon: "Battle.png" },
                { id: "RiotGames.LeagueOfLegends.VN2", name: "League of Legends VN", icon: "lol.png" },
                { id: "RiotGames.LeagueOfLegends.PBE", name: "League of Legends PBE", icon:"lol.png"},
                { id: "Overwolf.Overwolf", name: "Overwolf", icon: "overwolf.png" },
                { id: "Garena.Garena", name: "Garena", icon: "garena.png"}

            ]
        },

        {
            id: "runtime",
            name: "RUNTIME & FRAMEWORK",
            software: [
                { id: "Microsoft.VCRedist.2015+.x64", name: "VC++ 2015-2022 x64", icon: "vcredist.png" },
                { id: "Microsoft.VCRedist.2015+.x86", name: "VC++ 2015-2022 x86", icon: "vcredist.png" },
                { id: "Microsoft.DotNet.DesktopRuntime.8", name: ".NET Desktop 8", icon: "dotnet.png" },
                { id: "Microsoft.DotNet.Runtime.8", name: ".NET Runtime 8", icon: "dotnet.png" },
                { id: "Microsoft.DirectX", name: "DirectX", icon: "directx.png" }
            ]
        }
    ]
};

// ========================================
// TAB 2: RESCUE TOOLS - Các tool portable
// Lưu ý: Đặt file thật vào thư mục /repo/ với tên khớp filename
// ========================================
const RESCUE_TOOLS = [
    // === CRACK & ACTIVATE ===
    { id: "altium", name: "Altium Designer", description: "Thiết kế mạch PCB chuyên nghiệp", filename: "Altium Designer 21.3.2.zip", category: "crack" },
    { id: "proteus", name: "Proteus", description: "Mô phỏng mạch điện tử & vi điều khiển", filename: "Proteus 8.13 Pro Full.zip", category: "crack" },
    
    // === BOOT USB ===
    { id: "rufus", name: "Rufus", description: "Tạo USB Boot cài Windows/Linux", filename: "rufus.exe", category: "boot" },
    { id: "ventoy", name: "Ventoy", description: "Tạo USB Multi-boot từ ISO", filename: "ventoy.zip", category: "boot" },
    { id: "etcher", name: "balenaEtcher", description: "Flash OS image vào USB/SD", filename: "etcher.exe", category: "boot" },
    
    // === HARDWARE INFO ===
    { id: "cpuz", name: "CPU-Z", description: "Xem thông tin CPU chi tiết", filename: "cpu-z.zip", category: "info" },
    { id: "gpuz", name: "GPU-Z", description: "Xem thông tin Card đồ họa", filename: "gpu-z.exe", category: "info" },
    { id: "hwinfo", name: "HWiNFO", description: "Thông tin phần cứng toàn diện", filename: "hwinfo.zip", category: "info" },
    { id: "speccy", name: "Speccy", description: "Tổng quan hệ thống đơn giản", filename: "speccy.exe", category: "info" },
    
    // === DISK TOOLS ===
    { id: "crystaldiskinfo", name: "CrystalDiskInfo", description: "Kiểm tra sức khỏe ổ cứng", filename: "crystaldiskinfo.zip", category: "disk" },
    { id: "crystaldiskmark", name: "CrystalDiskMark", description: "Benchmark tốc độ ổ cứng", filename: "crystaldiskmark.zip", category: "disk" },
    { id: "minitool", name: "MiniTool Partition", description: "Quản lý phân vùng ổ cứng", filename: "minitool.zip", category: "disk" },
    { id: "diskgenius", name: "DiskGenius", description: "Khôi phục dữ liệu & phân vùng", filename: "diskgenius.zip", category: "disk" },
    
    // === DRIVER ===
    { id: "ddu", name: "DDU", description: "Gỡ sạch driver VGA", filename: "ddu.zip", category: "driver" },
    { id: "snappydriver", name: "Snappy Driver", description: "Cài driver offline tự động", filename: "snappy.zip", category: "driver" },
    { id: "driverbooster", name: "Driver Booster", description: "Cập nhật driver online", filename: "driverbooster.exe", category: "driver" },
    
    // === BENCHMARK & STRESS TEST ===
    { id: "aida64", name: "AIDA64", description: "Stress test & Benchmark toàn diện", filename: "aida64.zip", category: "benchmark" },
    { id: "furmark", name: "FurMark", description: "Stress test VGA (GPU burn-in)", filename: "furmark.zip", category: "benchmark" },
    { id: "memtest", name: "MemTest86", description: "Kiểm tra lỗi RAM", filename: "memtest86.zip", category: "benchmark" },
    { id: "prime95", name: "Prime95", description: "Stress test CPU", filename: "prime95.zip", category: "benchmark" },
    // === RESCUE & RECOVERY ===
    { id: "hiren", name: "Boot CD", description: "Bộ công cụ cứu hộ đa năng", filename: "hirens.iso", category: "rescue" },
    { id: "winpe", name: "WinPE ", description: "Mini Windows cứu hộ", filename: "anhdvboot.iso", category: "rescue" },
    { id: "medicat", name: "Medicat USB", description: "Bộ cứu hộ ", filename: "medicat.iso", category: "rescue" }
];

// ========================================
// TAB 3: ONLINE SERVICES - Dịch vụ Docker
// ========================================
const ONLINE_SERVICES = [
    {
        id: "stirlingpdf",
        name: "Stirling PDF",
        description: "Chỉnh sửa PDF online: Nén, ghép, tách, chuyển đổi...",
        icon: "📄",
        url: "https://www.photoroom.com/vi/cac-cong-cu/bo-dien-canh",
        color: "#ff6b6b"
    },
    {
        id: "speedtest",
        name: "Speedtest",
        description: "Kiểm tra tốc độ mạng nội bộ & Internet",
        icon: "⚡",
        url: "https://www.speedtest.net/",
        color: "#4ecdc4"
    },
    {
        id: "ittools",
        name: "IT-Tools",
        description: "Bộ công cụ hữu ích cho Developer: Encode, Hash, JSON...",
        icon: "🧰",
        url: "https://tools.hnaut.id.vn",
        color: "#a55eea"
    },
    {
        id: "vaultwarden",
        name: "Vaultwarden",
        description: "Trình quản lý mật khẩu tự host",
        icon: "🔐",
        url: "https://vault.hnaut.id.vn",
        color: "#26de81"
    },
    {
        id: "uptime",
        name: "Uptime Kuma",
        description: "Giám sát uptime các dịch vụ",
        icon: "📊",
        url: "https://uptime.hnaut.id.vn",
        color: "#45aaf2"
    },
    {
        id: "filebrowser",
        name: "File Browser",
        description: "Quản lý file trên server qua web",
        icon: "📁",
        url: "https://files.hnaut.id.vn",
        color: "#fd9644"
    },
    {
        id: "homepage",
        name: "Homepage",
        description: "Dashboard tổng hợp tất cả dịch vụ",
        icon: "🏠",
        url: "https://home.hnaut.id.vn",
        color: "#778ca3"
    },
    {
        id: "portainer",
        name: "Portainer",
        description: "Quản lý Docker Container",
        icon: "🐳",
        url: "https://docker.hnaut.id.vn",
        color: "#0984e3"
    }
];

// Export để main.js sử dụng (nếu cần)
// Với Vanilla JS, các biến này sẽ tự động available ở global scope
