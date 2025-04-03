import React, { createContext, useState, useContext, useRef } from 'react';
import { rotateImage, flipImage, adjustBrightness, adjustContrast, adjustSaturation, adjustSharpness, applyImageAdjustments, autoAdjustParams } from '../utils/imageProcessing';

// 創建圖片上下文
const ImageContext = createContext();

// 自定義 Hook 以便於在組件中使用上下文
export const useImageContext = () => useContext(ImageContext);

// 上下文提供者組件
export const ImageContextProvider = ({ children }) => {
  // 頁面狀態管理
  // 'main': 主頁面
  // 'batch': 批量處理頁面
  // 'customBg': 自定義背景頁面 (AI 商品圖-2-2)
  // 'bgResults': 背景生成結果頁面 (AI 商品圖-2-3)
  // 'sizeAdjust': 尺寸調整頁面 (AI 商品圖-2-4)
  // 'singleEditor': 單張編輯模式 (AI 商品圖-3)
  // 'singleEditorResult': 單張編輯背景生成結果頁面
  const [currentPage, setCurrentPage] = useState('main');
  
  // 基本設置
  const [autoRemoveBackground, setAutoRemoveBackground] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [backgroundCategory, setBackgroundCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100% (正常大小)
  
  // 自定義背景頁面狀態
  const [bgDesignMode, setBgDesignMode] = useState('recommend'); // 'recommend' 或 'custom'
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [referenceImages, setReferenceImages] = useState([]);
  
  // 背景生成結果頁面狀態
  const [generatedBackgrounds, setGeneratedBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  
  // 尺寸調整頁面狀態
  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [canvasHeight, setCanvasHeight] = useState(1200);
  const [aspectRatio, setAspectRatio] = useState('custom'); // 'custom', '1:1', '4:3', '16:9'
  const [margin, setMargin] = useState(20); // 圖片與畫布的邊距
  
  // 單張編輯模式狀態
  const [currentMode, setCurrentMode] = useState('main'); // 'main' 或 'result'
  const [activeTool, setActiveTool] = useState(''); // 'canvas', 'background', 'element', 'text', 'ruler', 'upload'
  const [zoom, setZoom] = useState(50); // 縮放百分比
  const [productImageUrl, setProductImageUrl] = useState('/api/placeholder/600/600?text=商品圖');
  const [bgPrompt, setBgPrompt] = useState('');
  const [bgNegativePrompt, setBgNegativePrompt] = useState('');
  const bgReferenceInputRef = useRef(null);
  
  // 圖片處理狀態
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 標尺設置
  const [rulerStyle, setRulerStyle] = useState(0);
  const [rulerTab, setRulerTab] = useState('數值');
  const [rulerValue, setRulerValue] = useState(50);
  const [rulerUnit, setRulerUnit] = useState('cm(公分)');
  const [rulerPosition, setRulerPosition] = useState('線條中間');
  const [rulerText, setRulerText] = useState('');
  
  // 文字設置
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  
  // 生成結果
  const [generatedResults, setGeneratedResults] = useState([
    '/api/placeholder/300/300?text=背景1',
    '/api/placeholder/300/300?text=背景2',
    '/api/placeholder/300/300?text=背景3',
    '/api/placeholder/300/300?text=背景4'
  ]);

  // 模擬數據
  const recommendedBackgrounds = [
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90'
  ];
  
  const recentlyUsedBackgrounds = [
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90'
  ];

  // 背景圖分類
  const backgroundCategories = [
    { id: 'all', name: '全部' },
    { id: 'literary', name: '文青' },
    { id: 'minimal', name: '簡約' },
    { id: 'fashion', name: '時尚' },
    { id: 'more', name: '更多' }
  ];
  
  const backgroundSubCategories = [
    { id: 'home', name: '居家' },
    { id: 'kitchen', name: '餐廚' },
    { id: 'flower', name: '花' }
  ];

  // 頁面導航函數
  const enterBatchMode = () => setCurrentPage('batch');
  const exitBatchMode = () => setCurrentPage('main');
  const enterCustomBgMode = () => setCurrentPage('customBg');
  const enterBgResultsMode = () => setCurrentPage('bgResults');
  const enterSizeAdjustMode = () => setCurrentPage('sizeAdjust');
  const enterSingleEditorMode = () => setCurrentPage('singleEditor');
  const enterSingleEditorResultMode = () => {
    setCurrentPage('singleEditorResult');
    setCurrentMode('result');
  };
  const goToMainPage = () => setCurrentPage('main');
  const goBack = () => {
    // 根據當前頁面決定返回哪個頁面
    switch (currentPage) {
      case 'customBg':
        setCurrentPage('batch');
        break;
      case 'bgResults':
        setCurrentPage('customBg');
        break;
      case 'sizeAdjust':
        setCurrentPage('bgResults');
        break;
      case 'singleEditorResult':
        setCurrentPage('singleEditor');
        setCurrentMode('main');
        break;
      default:
        setCurrentPage('main');
    }
  };

  // 切換自動去背功能
  const toggleBackgroundRemoval = () => setAutoRemoveBackground(!autoRemoveBackground);

  // 切換圖片選擇狀態
  const toggleImageSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // 刪除選中的圖片
  const deleteSelectedImages = () => {
    setUploadedImages(uploadedImages.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  };

  // 刪除單個圖片
  const deleteImage = (id) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== id));
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    }
  };

  // 處理檔案上傳
  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map(file => ({
          id: Date.now() + Math.random(),
          url: URL.createObjectURL(file),
          name: file.name,
          has_bg_removed: autoRemoveBackground
        }));
      
      setUploadedImages(prev => [...prev, ...newImages]);
      
      // 如果在主頁面上傳圖片，自動進入批量模式
      if (currentPage === 'main') {
        setCurrentPage('batch');
      }
    }
  };

  // 縮放控制
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  // 生成背景函數
  const generateBackgrounds = () => {
    console.log('生成背景，提示詞:', prompt);
    console.log('負面提示詞:', negativePrompt);
    console.log('參考圖片數量:', referenceImages.length);
    
    // 模擬生成背景的過程
    // 在實際應用中，這裡會調用 API 生成背景
    const mockGeneratedBackgrounds = [
      '/api/placeholder/300/300?text=背景1',
      '/api/placeholder/300/300?text=背景2',
      '/api/placeholder/300/300?text=背景3',
      '/api/placeholder/300/300?text=背景4'
    ];
    
    setGeneratedBackgrounds(mockGeneratedBackgrounds);
    setSelectedBackground(mockGeneratedBackgrounds[0]); // 默認選中第一個
    
    // 導航到背景生成結果頁面
    enterBgResultsMode();
  };
  
  // 單張編輯模式生成背景函數
  const handleGenerateBackground = () => {
    console.log('生成背景，提示詞:', bgPrompt);
    console.log('負面提示詞:', bgNegativePrompt);
    console.log('參考圖片數量:', referenceImages.length);
    
    // 模擬生成背景的過程
    const mockResults = [
      '/api/placeholder/300/300?text=背景1',
      '/api/placeholder/300/300?text=背景2',
      '/api/placeholder/300/300?text=背景3',
      '/api/placeholder/300/300?text=背景4'
    ];
    
    setGeneratedResults(mockResults);
    enterSingleEditorResultMode();
  };
  
  // 生成更多背景選項
  const generateMoreBackgrounds = () => {
    console.log('生成更多背景選項');
    
    // 模擬生成更多背景
    const mockMoreBackgrounds = [
      '/api/placeholder/300/300?text=新背景1',
      '/api/placeholder/300/300?text=新背景2',
      '/api/placeholder/300/300?text=新背景3',
      '/api/placeholder/300/300?text=新背景4'
    ];
    
    setGeneratedBackgrounds(mockMoreBackgrounds);
    setSelectedBackground(mockMoreBackgrounds[0]);
  };
  
  // 單張編輯模式生成更多背景
  const handleGenerateMoreBackgrounds = () => {
    console.log('生成更多背景選項');
    
    // 模擬生成更多背景
    const mockMoreResults = [
      '/api/placeholder/300/300?text=新背景5',
      '/api/placeholder/300/300?text=新背景6',
      '/api/placeholder/300/300?text=新背景7',
      '/api/placeholder/300/300?text=新背景8'
    ];
    
    setGeneratedResults(mockMoreResults);
  };
  
  // 單張編輯模式重新生成背景
  const handleRegenerateBackgrounds = () => {
    console.log('重新生成背景');
    
    // 模擬重新生成背景
    const mockRegeneratedResults = [
      '/api/placeholder/300/300?text=重新背景1',
      '/api/placeholder/300/300?text=重新背景2',
      '/api/placeholder/300/300?text=重新背景3',
      '/api/placeholder/300/300?text=重新背景4'
    ];
    
    setGeneratedResults(mockRegeneratedResults);
  };
  
  // 應用選定的背景到所有選中的圖片
  const applyBackgroundToImages = () => {
    if (!selectedBackground) return;
    
    console.log('應用背景到圖片');
    
    // 在實際應用中，這裡會調用 API 將背景應用到圖片
    // 現在只是模擬這個過程
    
    // 返回批量處理頁面
    setCurrentPage('batch');
  };
  
  // 更新畫布尺寸並保持比例
  const updateCanvasSize = (width, height, keepRatio = false) => {
    if (keepRatio) {
      if (width) {
        const newHeight = aspectRatio === '1:1' ? width :
                         aspectRatio === '4:3' ? Math.round(width * 3 / 4) :
                         aspectRatio === '16:9' ? Math.round(width * 9 / 16) :
                         height;
        setCanvasWidth(width);
        setCanvasHeight(newHeight);
      } else if (height) {
        const newWidth = aspectRatio === '1:1' ? height :
                        aspectRatio === '4:3' ? Math.round(height * 4 / 3) :
                        aspectRatio === '16:9' ? Math.round(height * 16 / 9) :
                        width;
        setCanvasHeight(height);
        setCanvasWidth(newWidth);
      }
    } else {
      if (width) setCanvasWidth(width);
      if (height) setCanvasHeight(height);
    }
  };
  
  // 設置畫布比例
  const setCanvasAspectRatio = (ratio) => {
    setAspectRatio(ratio);
    
    // 根據新比例調整畫布尺寸
    if (ratio === 'custom') return; // 自定義比例不自動調整
    
    if (ratio === '1:1') {
      // 使用當前寬度，高度設為相等
      setCanvasHeight(canvasWidth);
    } else if (ratio === '4:3') {
      // 使用當前寬度，計算對應的高度
      setCanvasHeight(Math.round(canvasWidth * 3 / 4));
    } else if (ratio === '16:9') {
      // 使用當前寬度，計算對應的高度
      setCanvasHeight(Math.round(canvasWidth * 9 / 16));
    }
  };

  // 單張編輯模式功能函數
  // 處理工具點擊
  const handleToolClick = (tool) => {
    setActiveTool(tool === activeTool ? '' : tool);
  };
  
  // 處理縮放變更
  const handleZoomChange = (newZoom) => {
    setZoom(Math.max(10, Math.min(100, newZoom)));
  };
  
  // 處理參考圖片上傳
  const handleReferenceImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        name: file.name
      };
      
      setReferenceImages(prev => [...prev, newImage]);
    }
  };
  
  // 移除參考圖片
  const removeReferenceImage = (id) => {
    setReferenceImages(prev => prev.filter(img => img.id !== id));
  };
  
  // 選擇生成的背景
  const handleSelectGeneratedBackground = (index) => {
    console.log('選擇背景:', index);
    // 在實際應用中，這裡會應用選中的背景到圖片
  };
  
  // 旋轉圖片
  const handleRotate = async (degrees) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      console.log('旋轉圖片:', degrees);
      const rotatedImageUrl = await rotateImage(productImageUrl, degrees);
      setProductImageUrl(rotatedImageUrl);
    } catch (error) {
      console.error('旋轉圖片失敗:', error);
      alert('旋轉圖片失敗');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // 翻轉圖片
  const handleFlip = async (direction) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      console.log('翻轉圖片:', direction);
      const flippedImageUrl = await flipImage(productImageUrl, direction);
      setProductImageUrl(flippedImageUrl);
    } catch (error) {
      console.error('翻轉圖片失敗:', error);
      alert('翻轉圖片失敗');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // 刪除圖片
  const handleDelete = () => {
    console.log('刪除圖片');
    // 在實際應用中，這裡會刪除圖片
  };
  
  // 下載圖片
  const handleDownload = () => {
    console.log('下載圖片');
    // 在實際應用中，這裡會下載圖片
  };

  // 提供的上下文值
  const contextValue = {
    // 基本狀態
    currentPage,
    autoRemoveBackground,
    uploadedImages,
    selectedImages,
    isFileMenuOpen,
    isDownloadMenuOpen,
    backgroundCategory,
    searchQuery,
    zoomLevel,
    recommendedBackgrounds,
    recentlyUsedBackgrounds,
    backgroundCategories,
    backgroundSubCategories,
    
    // 自定義背景頁面狀態
    bgDesignMode,
    prompt,
    negativePrompt,
    referenceImages,
    
    // 背景生成結果頁面狀態
    generatedBackgrounds,
    selectedBackground,
    
    // 尺寸調整頁面狀態
    canvasWidth,
    canvasHeight,
    aspectRatio,
    margin,
    
    // 單張編輯模式狀態
    currentMode,
    activeTool,
    zoom,
    productImageUrl,
    bgPrompt,
    bgNegativePrompt,
    bgReferenceInputRef,
    rulerStyle,
    rulerTab,
    rulerValue,
    rulerUnit,
    rulerPosition,
    rulerText,
    letterSpacing,
    lineHeight,
    generatedResults,
    
    // 設置函數
    setCurrentPage,
    setAutoRemoveBackground,
    setUploadedImages,
    setSelectedImages,
    setIsFileMenuOpen,
    setIsDownloadMenuOpen,
    setBackgroundCategory,
    setSearchQuery,
    setZoomLevel,
    setBgDesignMode,
    setPrompt,
    setNegativePrompt,
    setReferenceImages,
    setGeneratedBackgrounds,
    setSelectedBackground,
    setCanvasWidth,
    setCanvasHeight,
    setAspectRatio,
    setMargin,
    setCurrentMode,
    setActiveTool,
    setZoom,
    setProductImageUrl,
    setBgPrompt,
    setBgNegativePrompt,
    setRulerStyle,
    setRulerTab,
    setRulerValue,
    setRulerUnit,
    setRulerPosition,
    setRulerText,
    setLetterSpacing,
    setLineHeight,
    setGeneratedResults,
    
    // 頁面導航函數
    enterBatchMode,
    exitBatchMode,
    enterCustomBgMode,
    enterBgResultsMode,
    enterSizeAdjustMode,
    enterSingleEditorMode,
    enterSingleEditorResultMode,
    goToMainPage,
    goBack,
    
    // 功能函數
    toggleBackgroundRemoval,
    toggleImageSelection,
    deleteSelectedImages,
    deleteImage,
    handleFileUpload,
    zoomIn,
    zoomOut,
    generateBackgrounds,
    generateMoreBackgrounds,
    applyBackgroundToImages,
    updateCanvasSize,
    setCanvasAspectRatio,
    
    // 單張編輯模式功能函數
    handleToolClick,
    handleZoomChange,
    handleReferenceImageUpload,
    removeReferenceImage,
    handleGenerateBackground,
    handleGenerateMoreBackgrounds,
    handleRegenerateBackgrounds,
    handleSelectGeneratedBackground,
    handleRotate,
    handleFlip,
    handleDelete,
    handleDownload
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
