# IT-Box: All-In-One Toolkit

> 🛠️ Công cụ hỗ trợ kỹ thuật viên máy tính và dân văn phòng

![IT-Box Banner](https://img.shields.io/badge/IT--Box-All--In--One%20Toolkit-6b5ce7?style=for-the-badge&logo=windows-terminal&logoColor=white)

## ✨ Tính năng

### 📦 Tab 1: Auto Installer (Giống Ninite)
- Hiển thị danh sách phần mềm theo nhóm (Trình duyệt, Văn phòng, Dev...)
- Tìm kiếm phần mềm nhanh
- Chọn nhiều app → Tải Script `.bat` → Chạy để cài tự động qua **Winget**

### 🛠️ Tab 2: Kho Cứu Hộ
- Các tool portable cần thiết: Rufus, CPU-Z, CrystalDiskInfo...
- Tải về trực tiếp từ server

### 🌐 Tab 3: Tiện ích Online
- Link đến các dịch vụ Docker: PDF Tools, Speed Test, IT-Tools...

## 🚀 Cài đặt & Triển khai

### Yêu cầu
- Windows Server với IIS hoặc Laragon/Apache
- Trình duyệt hiện đại (Chrome, Firefox, Edge)

### Cấu trúc thư mục
```
All_In_One/
├── index.html          # Trang chính
├── css/
│   └── style.css       # CSS tùy chỉnh (Dark/Cyberpunk)
├── js/
│   ├── software-data.js # Dữ liệu phần mềm (dễ chỉnh sửa)
│   └── main.js         # Logic xử lý
├── assets/
│   └── icons/          # Icon phần mềm (PNG)
└── repo/               # Thư mục chứa tool portable
```

### Deploy
1. Clone repo về thư mục web server
2. Thêm icon vào `assets/icons/`
3. Thêm tool portable vào `repo/`
4. Truy cập qua trình duyệt

## ⚙️ Tùy chỉnh

### Thêm phần mềm mới
Chỉnh sửa file `js/software-data.js`:

```javascript
// Thêm vào mảng software của category tương ứng
{
    id: "Winget.Package.ID",  // ID Winget (bắt buộc)
    name: "Tên hiển thị",     // Tên phần mềm
    icon: "icon.png"          // File icon trong assets/icons/
}
```

### Thêm tool cứu hộ
```javascript
// Thêm vào mảng RESCUE_TOOLS
{
    id: "tool-id",
    name: "Tên Tool",
    description: "Mô tả ngắn",
    icon: "🔧",               // Emoji icon
    filename: "tool.zip",     // File trong thư mục /repo/
    category: "disk"
}
```

### Thêm dịch vụ online
```javascript
// Thêm vào mảng ONLINE_SERVICES
{
    id: "service-id",
    name: "Tên dịch vụ",
    description: "Mô tả",
    icon: "📄",
    url: "https://service.domain.com"
}
```

## 🎨 Tech Stack

- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **Font**: Orbitron (display), Inter (body)
- **Style**: Dark Mode, Cyberpunk (Tím than + Xanh Neon)
- **100% Client-side** - Không cần backend

## 📝 Script .bat tạo ra

Script tự động tạo có các tính năng:
- `chcp 65001` - Hỗ trợ tiếng Việt
- Kiểm tra quyền Administrator
- Kiểm tra Winget đã cài chưa
- `winget install -e --id [ID] --silent` - Cài đặt im lặng
- Hiển thị tiến trình và kết quả

## 📜 License

MIT License - Tự do sử dụng và chỉnh sửa

---

Made with ❤️ for IT Technicians
