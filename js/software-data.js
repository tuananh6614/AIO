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
                { id: "Microsoft.Office", name: "Microsoft Office", icon: "office.png" },
                { id: "TheDocumentFoundation.LibreOffice", name: "LibreOffice", icon: "libreoffice.png" },
                { id: "ONLYOFFICE.DesktopEditors", name: "OnlyOffice", icon: "onlyoffice.png" },
                { id: "Foxit.FoxitReader", name: "Foxit Reader", icon: "foxit.png" },
                { id: "Adobe.Acrobat.Reader.64-bit", name: "Adobe Reader", icon: "adobereader.png" },
                { id: "Notepad++.Notepad++", name: "Notepad++", icon: "notepadpp.png" },
                { id: "Notion.Notion", name: "Notion", icon: "notion.png" },
                { id: "Obsidian.Obsidian", name: "Obsidian", icon: "obsidian.png" }
            ]
        },
        {
            id: "communication",
            name: "CHAT & LIÊN LẠC",
            software: [
                { id: "Zoom.Zoom", name: "Zoom", icon: "zoom.png" },
                { id: "Microsoft.Teams", name: "Microsoft Teams", icon: "teams.png" },
                { id: "Discord.Discord", name: "Discord", icon: "discord.png" },
                { id: "Telegram.TelegramDesktop", name: "Telegram", icon: "telegram.png" },
                { id: "SlackTechnologies.Slack", name: "Slack", icon: "slack.png" },
                { id: "WhatsApp.WhatsApp", name: "WhatsApp", icon: "whatsapp.png" },
                { id: "Viber.Viber", name: "Viber", icon: "viber.png" }
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
                { id: "Daum.PotPlayer", name: "PotPlayer", icon: "potplayer.png" }
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
                { id: "Microsoft.VisualStudioCode", name: "VS Code", icon: "vscode.png" },
                { id: "Git.Git", name: "Git", icon: "git.png" },
                { id: "GitHub.GitHubDesktop", name: "GitHub Desktop", icon: "github.png" },
                { id: "OpenJS.NodeJS.LTS", name: "Node.js LTS", icon: "nodejs.png" },
                { id: "Python.Python.3.12", name: "Python 3.12", icon: "python.png" },
                { id: "Oracle.JDK.21", name: "Java JDK 21", icon: "java.png" },
                { id: "Docker.DockerDesktop", name: "Docker Desktop", icon: "docker.png" },
                { id: "JetBrains.IntelliJIDEA.Community", name: "IntelliJ IDEA", icon: "intellij.png" },
                { id: "Postman.Postman", name: "Postman", icon: "postman.png" },
                { id: "WinSCP.WinSCP", name: "WinSCP", icon: "winscp.png" },
                { id: "PuTTY.PuTTY", name: "PuTTY", icon: "putty.png" },
                { id: "Termius.Termius", name: "Termius", icon: "termius.png" },
                { id: "ArduinoSA.IDE.stable", name: "Arduino IDE", icon: "arduino.png" }
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
                { id: "AnyDeskSoftwareGmbH.AnyDesk", name: "AnyDesk", icon: "anydesk.png" },
                { id: "RustDesk.RustDesk", name: "RustDesk", icon: "rustdesk.png" },
                { id: "Skillbrains.Lightshot", name: "Lightshot", icon: "lightshot.png" },
                { id: "flux.flux", name: "f.lux", icon: "flux.png" }
            ]
        },
        {
            id: "security",
            name: "BẢO MẬT & ANTIVIRUS",
            software: [
                { id: "Malwarebytes.Malwarebytes", name: "Malwarebytes", icon: "malwarebytes.png" },
                { id: "ESET.NOD32", name: "ESET NOD32", icon: "eset.png" },
                { id: "Avast.AvastFreeAntivirus", name: "Avast Free", icon: "avast.png" },
                { id: "ProtonTechnologies.ProtonVPN", name: "ProtonVPN", icon: "protonvpn.png" },
                { id: "NordVPN.NordVPN", name: "NordVPN", icon: "nordvpn.png" }
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
// ========================================
const RESCUE_TOOLS = [
    {
        id: "rufus",
        name: "Rufus",
        description: "Tạo USB Boot cài Windows/Linux",
        icon: "💿",
        filename: "rufus.exe",
        category: "boot"
    },
    {
        id: "ventoy",
        name: "Ventoy",
        description: "Tạo USB Multi-boot",
        icon: "🔄",
        filename: "ventoy.zip",
        category: "boot"
    },
    {
        id: "cpuz",
        name: "CPU-Z",
        description: "Xem thông tin CPU chi tiết",
        icon: "🔬",
        filename: "cpu-z.zip",
        category: "info"
    },
    {
        id: "gpuz",
        name: "GPU-Z",
        description: "Xem thông tin Card đồ họa",
        icon: "🎮",
        filename: "gpu-z.exe",
        category: "info"
    },
    {
        id: "hwinfo",
        name: "HWiNFO",
        description: "Thông tin phần cứng toàn diện",
        icon: "🖥️",
        filename: "hwinfo.zip",
        category: "info"
    },
    {
        id: "crystaldiskinfo",
        name: "CrystalDiskInfo",
        description: "Kiểm tra sức khỏe ổ cứng",
        icon: "💾",
        filename: "crystaldiskinfo.zip",
        category: "disk"
    },
    {
        id: "crystaldiskmark",
        name: "CrystalDiskMark",
        description: "Benchmark tốc độ ổ cứng",
        icon: "⚡",
        filename: "crystaldiskmark.zip",
        category: "disk"
    },
    {
        id: "minitool",
        name: "MiniTool Partition",
        description: "Quản lý phân vùng ổ cứng",
        icon: "📊",
        filename: "minitool.zip",
        category: "disk"
    },
    {
        id: "dduninst",
        name: "DDU",
        description: "Gỡ sạch driver VGA",
        icon: "🧹",
        filename: "ddu.zip",
        category: "driver"
    },
    {
        id: "snappydriver",
        name: "Snappy Driver",
        description: "Cài driver offline",
        icon: "📦",
        filename: "snappy.zip",
        category: "driver"
    },
    {
        id: "aida64",
        name: "AIDA64",
        description: "Stress test & Benchmark",
        icon: "🔥",
        filename: "aida64.zip",
        category: "benchmark"
    },
    {
        id: "furmark",
        name: "FurMark",
        description: "Stress test VGA",
        icon: "🐒",
        filename: "furmark.zip",
        category: "benchmark"
    },
    {
        id: "memtest",
        name: "MemTest86",
        description: "Kiểm tra lỗi RAM",
        icon: "🧠",
        filename: "memtest86.zip",
        category: "benchmark"
    },
    {
        id: "hiren",
        name: "Hiren's Boot CD",
        description: "Bộ công cụ cứu hộ đa năng",
        icon: "🛠️",
        filename: "hirens.iso",
        category: "rescue"
    },
    {
        id: "winpe",
        name: "WinPE (Anhdv Boot)",
        description: "Mini Windows cứu hộ",
        icon: "💻",
        filename: "anhdvboot.iso",
        category: "rescue"
    }
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
        url: "https://pdf.hnaut.id.vn",
        color: "#ff6b6b"
    },
    {
        id: "speedtest",
        name: "LibreSpeed",
        description: "Kiểm tra tốc độ mạng nội bộ & Internet",
        icon: "⚡",
        url: "https://speedtest.hnaut.id.vn",
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
