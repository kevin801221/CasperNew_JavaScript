import React, { createContext, useState, useContext } from 'react';

// 創建圖片上下文
const ImageContext = createContext();

// 自定義 Hook 以便於在組件中使用上下文
export const useImageContext = () => useContext(ImageContext);

// 上下文提供者組件
export const ImageContextProvider = ({ children }) => {
  // 狀態管理
  const [currentPage, setCurrentPage] = useState('main'); // 'main' 或 'batch'
  const [autoRemoveBackground, setAutoRemoveBackground] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [backgroundCategory, setBackgroundCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100% (正常大小)

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

  // 切換頁面函數
  const enterBatchMode = () => setCurrentPage('batch');
  const exitBatchMode = () => setCurrentPage('main');

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

  // 提供的上下文值
  const contextValue = {
    // 狀態
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
    
    // 功能函數
    enterBatchMode,
    exitBatchMode,
    toggleBackgroundRemoval,
    toggleImageSelection,
    deleteSelectedImages,
    deleteImage,
    handleFileUpload,
    zoomIn,
    zoomOut
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
