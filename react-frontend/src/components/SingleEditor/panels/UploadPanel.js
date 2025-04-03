import React, { useRef } from 'react';
import { ChevronLeft, Upload, Image } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 上傳面板組件
 * 用於在單張編輯模式中上傳圖片
 */
const UploadPanel = () => {
  const { 
    setActiveTool,
    handleFileUpload,
    setProductImageUrl
  } = useImageContext();
  
  const fileInputRef = useRef(null);

  // 處理檔案選擇
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // 創建一個臨時的 URL 來顯示圖片
      const imageUrl = URL.createObjectURL(file);
      // 設置產品圖片 URL
      setProductImageUrl(imageUrl);
      // 同時也處理文件上傳
      handleFileUpload(e.target.files);
      
      // 重置 input，以便可以重複上傳相同的檔案
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 處理上傳按鈕點擊
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">上傳圖片</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-4">
            上傳一張新圖片來替換當前的產品圖片
          </p>
          
          {/* 隱藏的檔案輸入框 */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
            accept="image/jpeg,image/jpg,image/png"
          />
          
          <button 
            className="w-full py-2 px-4 bg-amber-700 text-white rounded hover:bg-amber-800 flex items-center justify-center"
            onClick={handleUploadClick}
          >
            <Upload size={16} className="mr-2" />
            選擇圖片
          </button>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">支援格式</h4>
          <p className="text-sm text-gray-600">
            JPG · JPEG · PNG
          </p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">提示</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li className="mb-1">建議上傳高品質的圖片以獲得最佳效果</li>
            <li className="mb-1">上傳的圖片將替換當前的產品圖片</li>
            <li>上傳後可以使用編輯工具進行調整</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;
