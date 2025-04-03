import React, { useState } from 'react';
import { Trash2, Scissors, Edit, X, Loader } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import useImageEditor from '../../hooks/useImageEditor';
import Button from '../common/Button';

/**
 * 批量處理頁面的圖片網格組件
 */
const ImageGrid = () => {
  const { 
    uploadedImages, 
    selectedImages, 
    toggleImageSelection, 
    deleteSelectedImages, 
    deleteImage,
    zoomLevel,
    updateImage
  } = useImageContext();
  
  const { removeBackground, batchRemoveBackground } = useImageEditor();
  const [processingImages, setProcessingImages] = useState([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  // 處理單個圖片刪除
  const handleDeleteImage = (e, id) => {
    e.stopPropagation(); // 防止觸發選擇事件
    deleteImage(id);
  };

  // 處理單個圖片去背
  const handleRemoveBackground = async (e, id) => {
    e.stopPropagation(); // 防止觸發選擇事件
    console.log('去背圖片:', id);
    
    try {
      // 設置圖片為處理中狀態
      setProcessingImages(prev => [...prev, id]);
      
      // 獲取圖片數據
      const image = uploadedImages.find(img => img.id === id);
      if (!image) {
        console.error('找不到圖片:', id);
        return;
      }
      
      console.log('準備處理圖片:', image.url);
      
      // 如果是本地文件 URL，先轉換為完整 URL
      let imageUrl = image.url;
      if (imageUrl.startsWith('/') && !imageUrl.startsWith('//')) {
        const origin = window.location.origin;
        imageUrl = `${origin}${imageUrl}`;
        console.log('轉換後的完整 URL:', imageUrl);
      }
      
      // 調用去背 API
      const processedImageUrl = await removeBackground(imageUrl);
      console.log('去背成功，處理後的 URL 長度:', processedImageUrl.length);
      
      // 更新圖片數據
      updateImage(id, {
        url: processedImageUrl,
        has_bg_removed: true
      });
      
      console.log('圖片數據已更新');
    } catch (error) {
      console.error('圖片去背失敗:', error);
      alert('圖片去背處理失敗，請稍後再試。');
    } finally {
      // 移除處理中狀態
      setProcessingImages(prev => prev.filter(imgId => imgId !== id));
    }
  };

  // 處理單個圖片編輯
  const handleEditImage = (e, id) => {
    e.stopPropagation(); // 防止觸發選擇事件
    console.log('編輯圖片:', id);
    // 這裡可以添加編輯的邏輯
  };
  
  // 處理批量去背
  const handleBatchRemoveBackground = async () => {
    if (selectedImages.length === 0 || isBatchProcessing) return;
    
    try {
      setIsBatchProcessing(true);
      
      // 獲取選中圖片的 URL
      const imagesToProcess = uploadedImages
        .filter(img => selectedImages.includes(img.id))
        .map(img => img.url);
      
      // 調用批量去背 API
      const processedImageUrls = await batchRemoveBackground(imagesToProcess);
      
      // 更新圖片數據
      selectedImages.forEach((id, index) => {
        if (index < processedImageUrls.length) {
          updateImage(id, {
            url: processedImageUrls[index],
            has_bg_removed: true
          });
        }
      });
      
      alert(`成功處理 ${processedImageUrls.length} 張圖片的背景`);
    } catch (error) {
      console.error('批量去背失敗:', error);
      alert('批量去背處理失敗，請稍後再試。');
    } finally {
      setIsBatchProcessing(false);
    }
  };

  // 計算圖片尺寸
  const getImageSize = () => {
    const baseSize = 180;
    return {
      width: baseSize * zoomLevel,
      height: baseSize * 0.8 * zoomLevel
    };
  };

  const { width, height } = getImageSize();

  return (
    <div className="p-4">
      {/* 頂部操作欄 */}
      <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
          {selectedImages.length > 0 && (
            <>
              <Button 
                variant="secondary"
                onClick={deleteSelectedImages}
                className="mr-2"
              >
                <Trash2 size={16} className="mr-1" />
                刪除 ({selectedImages.length})
              </Button>
              
              <Button 
                variant="primary"
                onClick={handleBatchRemoveBackground}
                className="mr-2"
                disabled={isBatchProcessing}
              >
                {isBatchProcessing ? (
                  <>
                    <Loader size={16} className="mr-1 animate-spin" />
                    處理中...
                  </>
                ) : (
                  <>
                    <Scissors size={16} className="mr-1" />
                    批量去背 ({selectedImages.length})
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* 圖片網格 */}
      <div 
        className="grid gap-4" 
        style={{ 
          gridTemplateColumns: `repeat(auto-fill, minmax(${width}px, 1fr))`,
        }}
      >
        {uploadedImages.map((image) => (
          <div 
            key={image.id} 
            className={`relative rounded overflow-hidden border-2 transition-all ${
              selectedImages.includes(image.id) ? 'border-amber-500' : 'border-transparent'
            }`}
            style={{ height: `${height}px` }}
            onClick={() => toggleImageSelection(image.id)}
          >
            {/* 選擇框 */}
            <div className="absolute top-2 left-2 z-10">
              <div 
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  selectedImages.includes(image.id) 
                    ? 'bg-amber-500 border-amber-500' 
                    : 'border-white bg-black bg-opacity-20'
                }`}
              >
                {selectedImages.includes(image.id) && (
                  <X size={14} className="text-white" />
                )}
              </div>
            </div>
            
            {/* 功能按鈕 */}
            <div className="absolute top-2 right-2 z-10 flex">
              <button 
                className="w-6 h-6 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white mr-1"
                onClick={(e) => handleDeleteImage(e, image.id)}
                title="刪除"
              >
                <Trash2 size={14} />
              </button>
              <button 
                className="w-6 h-6 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white mr-1"
                onClick={(e) => handleRemoveBackground(e, image.id)}
                title="去背"
                disabled={processingImages.includes(image.id)}
              >
                {processingImages.includes(image.id) ? (
                  <Loader size={14} className="animate-spin" />
                ) : (
                  <Scissors size={14} />
                )}
              </button>
              <button 
                className="w-6 h-6 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white"
                onClick={(e) => handleEditImage(e, image.id)}
                title="編輯"
              >
                <Edit size={14} />
              </button>
            </div>
            
            {/* 圖片 */}
            <img 
              src={image.url} 
              alt={image.name || '上傳圖片'} 
              className="w-full h-full object-contain"
            />
            
            {/* 去背標記 */}
            {image.has_bg_removed && (
              <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                已去背
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 空狀態 */}
      {uploadedImages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="mb-2">尚未上傳圖片</p>
          <p className="text-sm">請上傳圖片或從主頁面進入批量模式</p>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
