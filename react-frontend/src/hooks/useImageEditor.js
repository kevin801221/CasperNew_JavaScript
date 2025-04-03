import { useState, useCallback } from 'react';

/**
 * 自定義 Hook 用於處理圖片編輯相關操作
 * @returns {Object} 圖片編輯相關的狀態和方法
 */
const useImageEditor = () => {
  const [editHistory, setEditHistory] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * 添加編輯歷史記錄
   * @param {Object} imageData - 圖片數據
   */
  const addEditHistory = useCallback((imageData) => {
    // 如果當前不是最新的編輯狀態，則刪除之後的歷史記錄
    if (currentEditIndex < editHistory.length - 1) {
      setEditHistory(prev => prev.slice(0, currentEditIndex + 1));
    }
    
    setEditHistory(prev => [...prev, imageData]);
    setCurrentEditIndex(prev => prev + 1);
  }, [editHistory, currentEditIndex]);

  /**
   * 復原編輯
   * @returns {Object|null} 復原後的圖片數據，如果無法復原則返回 null
   */
  const undoEdit = useCallback(() => {
    if (currentEditIndex > 0) {
      setCurrentEditIndex(prev => prev - 1);
      return editHistory[currentEditIndex - 1];
    }
    return null;
  }, [editHistory, currentEditIndex]);

  /**
   * 重做編輯
   * @returns {Object|null} 重做後的圖片數據，如果無法重做則返回 null
   */
  const redoEdit = useCallback(() => {
    if (currentEditIndex < editHistory.length - 1) {
      setCurrentEditIndex(prev => prev + 1);
      return editHistory[currentEditIndex + 1];
    }
    return null;
  }, [editHistory, currentEditIndex]);

  /**
   * 移除圖片背景
   * @param {string} imageUrl - 圖片 URL
   * @returns {Promise<string>} 處理後的圖片 URL
   */
  const removeBackground = useCallback(async (imageUrl) => {
    setIsEditing(true);
    try {
      // 這裡應該是實際的去背處理邏輯
      // 在實際應用中，這可能是一個 API 調用
      console.log('正在處理圖片去背:', imageUrl);
      
      // 模擬處理時間
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 返回處理後的圖片 URL（這裡只是示例）
      const processedImageUrl = imageUrl;
      
      // 添加到編輯歷史
      addEditHistory({ url: processedImageUrl, has_bg_removed: true });
      
      return processedImageUrl;
    } catch (error) {
      console.error('圖片去背處理失敗:', error);
      throw error;
    } finally {
      setIsEditing(false);
    }
  }, [addEditHistory]);

  /**
   * 替換圖片背景
   * @param {string} imageUrl - 圖片 URL
   * @param {string} backgroundUrl - 背景圖片 URL
   * @returns {Promise<string>} 處理後的圖片 URL
   */
  const replaceBackground = useCallback(async (imageUrl, backgroundUrl) => {
    setIsEditing(true);
    try {
      // 這裡應該是實際的背景替換處理邏輯
      console.log('正在處理背景替換:', imageUrl, backgroundUrl);
      
      // 模擬處理時間
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 返回處理後的圖片 URL（這裡只是示例）
      const processedImageUrl = imageUrl;
      
      // 添加到編輯歷史
      addEditHistory({ url: processedImageUrl, background: backgroundUrl });
      
      return processedImageUrl;
    } catch (error) {
      console.error('背景替換處理失敗:', error);
      throw error;
    } finally {
      setIsEditing(false);
    }
  }, [addEditHistory]);

  return {
    isEditing,
    canUndo: currentEditIndex > 0,
    canRedo: currentEditIndex < editHistory.length - 1,
    undoEdit,
    redoEdit,
    removeBackground,
    replaceBackground
  };
};

export default useImageEditor;
