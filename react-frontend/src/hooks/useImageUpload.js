import { useState, useCallback } from 'react';

/**
 * 自定義 Hook 用於處理圖片上傳和相關操作
 * @param {boolean} autoRemoveBackground - 是否自動去背
 * @param {Function} onUpload - 上傳成功後的回調函數
 * @returns {Object} 上傳相關的狀態和方法
 */
const useImageUpload = (autoRemoveBackground = true, onUpload = () => {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  /**
   * 處理檔案上傳
   * @param {FileList} files - 上傳的檔案列表
   */
  const handleUpload = useCallback((files) => {
    if (!files || files.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length === 0) {
        throw new Error('請上傳有效的圖片檔案 (JPG, JPEG, PNG)');
      }

      const newImages = imageFiles.map(file => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        name: file.name,
        has_bg_removed: autoRemoveBackground,
        file: file // 保存原始檔案以便後續處理
      }));

      onUpload(newImages);
    } catch (error) {
      setUploadError(error.message);
      console.error('上傳圖片時發生錯誤:', error);
    } finally {
      setIsUploading(false);
    }
  }, [autoRemoveBackground, onUpload]);

  /**
   * 處理拖放上傳
   * @param {DragEvent} e - 拖放事件對象
   */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  }, [handleUpload]);

  /**
   * 處理粘貼上傳
   * @param {ClipboardEvent} e - 粘貼事件對象
   */
  const handlePaste = useCallback((e) => {
    if (e.clipboardData && e.clipboardData.items) {
      const items = e.clipboardData.items;
      
      const imageItems = Array.from(items).filter(item => item.type.startsWith('image/'));
      
      if (imageItems.length > 0) {
        const files = imageItems.map(item => item.getAsFile());
        handleUpload(files);
      }
    }
  }, [handleUpload]);

  /**
   * 防止拖放事件的默認行為
   * @param {DragEvent} e - 拖放事件對象
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return {
    isUploading,
    uploadError,
    handleUpload,
    handleDrop,
    handleDragOver,
    handlePaste
  };
};

export default useImageUpload;
