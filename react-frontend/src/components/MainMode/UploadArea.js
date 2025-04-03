import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';
import Toggle from '../common/Toggle';

/**
 * 主頁面的圖片上傳區域組件
 */
const UploadArea = () => {
  const { 
    autoRemoveBackground, 
    toggleBackgroundRemoval, 
    handleFileUpload,
    enterBatchMode
  } = useImageContext();
  
  const fileInputRef = useRef(null);

  // 處理檔案選擇
  const handleFileSelect = (e) => {
    handleFileUpload(e.target.files);
    
    // 重置 input，以便可以重複上傳相同的檔案
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 處理上傳按鈕點擊
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 處理拖放上傳
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // 防止拖放事件的默認行為
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 處理粘貼上傳
  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.items) {
      const items = e.clipboardData.items;
      
      const imageItems = Array.from(items).filter(item => item.type.startsWith('image/'));
      
      if (imageItems.length > 0) {
        const files = imageItems.map(item => item.getAsFile());
        handleFileUpload(files);
      }
    }
  };

  return (
    <div 
      className="flex-1 flex items-center justify-center bg-gray-100"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onPaste={handlePaste}
      tabIndex="0" // 使元素可以接收鍵盤事件
    >
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            T
          </div>
        </div>
        
        {/* 隱藏的檔案輸入框 */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/jpeg,image/jpg,image/png"
          multiple
        />
        
        <Button 
          variant="secondary"
          onClick={handleUploadClick}
          className="mx-auto mb-4"
        >
          <Upload size={16} className="mr-2" />
          上傳圖片
        </Button>
        
        <Button 
          variant="outline"
          onClick={enterBatchMode}
          className="mx-auto mb-8"
        >
          或進入批量生成
        </Button>
        
        <div className="text-sm text-gray-500 mb-2">
          拖曳/複製/貼上圖片至此區塊 · 直接上傳
        </div>
        <div className="text-sm text-gray-500 mb-6">
          支援 JPG · JPEG · PNG
        </div>
        
        <div className="flex items-center justify-center">
          <span className="mr-2">自動去背</span>
          <Toggle 
            isOn={autoRemoveBackground} 
            onToggle={toggleBackgroundRemoval} 
          />
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
