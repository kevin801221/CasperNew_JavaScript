import React from 'react';
import { Upload, Maximize, Minimize } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';

/**
 * 批量處理頁面的縮放控制欄組件
 */
const ZoomControls = () => {
  const { 
    zoomIn, 
    zoomOut, 
    zoomLevel,
    handleFileUpload
  } = useImageContext();
  
  const fileInputRef = React.useRef(null);

  // 處理上傳按鈕點擊
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 處理檔案選擇
  const handleFileSelect = (e) => {
    handleFileUpload(e.target.files);
    
    // 重置 input，以便可以重複上傳相同的檔案
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4">
      {/* 隱藏的檔案輸入框 */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
        accept="image/jpeg,image/jpg,image/png"
        multiple
      />
      
      {/* 上傳按鈕 */}
      <button 
        onClick={handleUploadClick}
        className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white mb-6"
        title="上傳更多圖片"
      >
        <Upload size={16} />
      </button>
      
      {/* 放大按鈕 */}
      <button 
        onClick={zoomIn}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2"
        title="放大"
      >
        <Maximize size={16} />
      </button>
      
      {/* 縮放級別顯示 */}
      <div className="text-xs mb-2">
        {Math.round(zoomLevel * 100)}%
      </div>
      
      {/* 縮小按鈕 */}
      <button 
        onClick={zoomOut}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
        title="縮小"
      >
        <Minimize size={16} />
      </button>
    </div>
  );
};

export default ZoomControls;
