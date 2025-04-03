# AI 商品圖設計室

AI 商品圖設計室是一個用於處理和編輯產品圖片的 React 網頁應用程式，主要功能包括圖片上傳、背景去除（去背）、批量處理以及背景替換等。系統由兩個主要頁面組成：主頁面（AI 商品圖-2）和批量處理頁面（AI 商品圖-2-1）。

## 功能特點

- 圖片上傳（支援拖放、剪貼板貼上）
- 自動去背功能
- 批量處理多張圖片
- 背景替換
- 圖片編輯
- 多種格式下載 (JPG, PNG, PDF)

## 技術棧

- **前端框架**: React
- **UI 元件**: 自定義元件 + Lucide Icons
- **樣式**: Tailwind CSS

## 專案結構

```
react-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/               # 通用組件
│   │   │   ├── Button.js
│   │   │   └── Toggle.js
│   │   ├── layout/               # 佈局組件
│   │   │   ├── Header.js
│   │   │   └── Sidebar.js
│   │   ├── MainMode/             # 主頁面組件
│   │   │   ├── MainModeContent.js
│   │   │   └── UploadArea.js
│   │   └── BatchMode/            # 批量處理頁面組件
│   │       ├── BackgroundPanel.js
│   │       ├── BatchModeContent.js
│   │       ├── ImageGrid.js
│   │       └── ZoomControls.js
│   ├── contexts/                 # React 上下文
│   │   └── ImageContext.js
│   ├── hooks/                    # 自定義 Hooks
│   │   ├── useImageEditor.js
│   │   └── useImageUpload.js
│   ├── utils/                    # 工具函數
│   │   ├── fileUtils.js
│   │   └── imageUtils.js
│   ├── pages/                    # 頁面組件
│   │   └── AIProductImageDesigner.js
│   ├── App.js                    # 應用程序入口
│   └── index.js                  # React 入口
└── package.json
```

## 安裝與運行

### 安裝依賴

```bash
cd react-frontend
npm install
```

### 開發模式運行

```bash
npm start
```

### 構建生產版本

```bash
npm run build
```

### 運行生產版本

```bash
npx serve -s build
```

## 頁面說明

### 主頁面 (AI 商品圖-2)

主頁面提供圖片上傳功能，支援拖放、剪貼板貼上和檔案選擇。用戶可以設置是否自動去背。上傳圖片後會自動進入批量處理頁面。

### 批量處理頁面 (AI 商品圖-2-1)

批量處理頁面分為三個主要區域：

1. **左側面板**：提供背景選擇功能，包括推薦背景、最近常用背景、搜索和分類。
2. **中央區域**：顯示已上傳的圖片網格，支援選擇、刪除、去背和編輯操作。
3. **右側控制欄**：提供縮放控制和上傳更多圖片的功能。

## 代碼組織

專案採用模組化設計，將不同功能拆分為獨立的組件和工具函數，以提高代碼的可維護性和可重用性。主要模組包括：

- **上下文管理**：使用 React Context API 管理全局狀態
- **自定義 Hooks**：封裝複雜的業務邏輯
- **工具函數**：提供通用的圖片和檔案處理功能
- **組件層次結構**：從頁面到具體功能組件的清晰層次
