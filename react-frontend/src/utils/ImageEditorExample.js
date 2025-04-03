import React, { useState, useEffect } from 'react';
import { 
  rotateImage, 
  flipImage, 
  adjustBrightness, 
  adjustContrast, 
  adjustSaturation, 
  adjustSharpness,
  applyImageAdjustments,
  autoAdjustParams
} from '../utils/imageProcessing';

/**
 * 圖片編輯器示例組件
 * 展示如何使用前端圖片處理函數
 */
const ImageEditorExample = ({ initialImageUrl }) => {
  // 當前顯示的圖片URL
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl);
  // 原始圖片URL (用於重置)
  const [originalImageUrl, setOriginalImageUrl] = useState(initialImageUrl);
  // 調整參數
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  // 處理狀態
  const [isProcessing, setIsProcessing] = useState(false);
  // 歷史記錄
  const [history, setHistory] = useState([initialImageUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // 當初始圖片改變時，重置所有狀態
  useEffect(() => {
    setCurrentImageUrl(initialImageUrl);
    setOriginalImageUrl(initialImageUrl);
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setSharpness(0);
    setHistory([initialImageUrl]);
    setHistoryIndex(0);
  }, [initialImageUrl]);

  // 添加到歷史記錄
  const addToHistory = (newImageUrl) => {
    // 如果當前不是最新的歷史記錄，則刪除之後的記錄
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }
    
    // 添加新的歷史記錄
    setHistory([...history, newImageUrl]);
    setHistoryIndex(history.length);
  };

  // 處理旋轉
  const handleRotate = async (degrees) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      const rotatedImageUrl = await rotateImage(currentImageUrl, degrees);
      setCurrentImageUrl(rotatedImageUrl);
      addToHistory(rotatedImageUrl);
    } catch (error) {
      console.error('旋轉圖片失敗:', error);
      alert('旋轉圖片失敗');
    } finally {
      setIsProcessing(false);
    }
  };

  // 處理翻轉
  const handleFlip = async (direction) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      const flippedImageUrl = await flipImage(currentImageUrl, direction);
      setCurrentImageUrl(flippedImageUrl);
      addToHistory(flippedImageUrl);
    } catch (error) {
      console.error('翻轉圖片失敗:', error);
      alert('翻轉圖片失敗');
    } finally {
      setIsProcessing(false);
    }
  };

  // 調整亮度
  const handleBrightnessChange = async (value) => {
    setBrightness(value);
  };

  // 調整對比度
  const handleContrastChange = async (value) => {
    setContrast(value);
  };

  // 調整飽和度
  const handleSaturationChange = async (value) => {
    setSaturation(value);
  };

  // 調整銳利度
  const handleSharpnessChange = async (value) => {
    setSharpness(value);
  };

  // 應用所有調整
  const applyAdjustments = async () => {
    if (isProcessing) return;
    if (brightness === 0 && contrast === 0 && saturation === 0 && sharpness === 0) return;
    
    setIsProcessing(true);
    
    try {
      const adjustments = {
        brightness,
        contrast,
        saturation,
        sharpness
      };
      
      const adjustedImageUrl = await applyImageAdjustments(currentImageUrl, adjustments);
      setCurrentImageUrl(adjustedImageUrl);
      addToHistory(adjustedImageUrl);
      
      // 重置調整參數
      setBrightness(0);
      setContrast(0);
      setSaturation(0);
      setSharpness(0);
    } catch (error) {
      console.error('應用調整失敗:', error);
      alert('應用調整失敗');
    } finally {
      setIsProcessing(false);
    }
  };

  // 自動調整
  const handleAutoAdjust = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      // 獲取自動調整參數
      const params = await autoAdjustParams(currentImageUrl);
      
      // 設置調整參數
      setBrightness(params.brightness);
      setContrast(params.contrast);
      setSaturation(params.saturation);
      setSharpness(params.sharpness);
      
      // 應用調整
      const adjustedImageUrl = await applyImageAdjustments(currentImageUrl, params);
      setCurrentImageUrl(adjustedImageUrl);
      addToHistory(adjustedImageUrl);
      
      // 重置調整參數
      setBrightness(0);
      setContrast(0);
      setSaturation(0);
      setSharpness(0);
    } catch (error) {
      console.error('自動調整失敗:', error);
      alert('自動調整失敗');
    } finally {
      setIsProcessing(false);
    }
  };

  // 重置圖片
  const handleReset = () => {
    setCurrentImageUrl(originalImageUrl);
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setSharpness(0);
    setHistory([originalImageUrl]);
    setHistoryIndex(0);
  };

  // 復原
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentImageUrl(history[historyIndex - 1]);
    }
  };

  // 重做
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentImageUrl(history[historyIndex + 1]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">圖片編輯器</h2>
      
      {/* 圖片顯示區域 */}
      <div className="mb-4 flex justify-center">
        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          <img 
            src={currentImageUrl} 
            alt="編輯中的圖片" 
            className="max-w-full max-h-64 object-contain"
          />
        </div>
      </div>
      
      {/* 旋轉和翻轉工具 */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">旋轉與翻轉</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleRotate(-90)} 
            disabled={isProcessing}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            向左旋轉
          </button>
          <button 
            onClick={() => handleRotate(90)} 
            disabled={isProcessing}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            向右旋轉
          </button>
          <button 
            onClick={() => handleFlip('horizontal')} 
            disabled={isProcessing}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            水平翻轉
          </button>
          <button 
            onClick={() => handleFlip('vertical')} 
            disabled={isProcessing}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            垂直翻轉
          </button>
        </div>
      </div>
      
      {/* 圖片調整工具 */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">圖片調整</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 亮度調整 */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">亮度</label>
              <span className="text-xs">{brightness}</span>
            </div>
            <input 
              type="range" 
              min="-100" 
              max="100" 
              value={brightness}
              onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          
          {/* 對比度調整 */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">對比度</label>
              <span className="text-xs">{contrast}</span>
            </div>
            <input 
              type="range" 
              min="-100" 
              max="100" 
              value={contrast}
              onChange={(e) => handleContrastChange(parseInt(e.target.value))}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          
          {/* 飽和度調整 */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">飽和度</label>
              <span className="text-xs">{saturation}</span>
            </div>
            <input 
              type="range" 
              min="-100" 
              max="100" 
              value={saturation}
              onChange={(e) => handleSaturationChange(parseInt(e.target.value))}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          
          {/* 銳利度調整 */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">銳利度</label>
              <span className="text-xs">{sharpness}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sharpness}
              onChange={(e) => handleSharpnessChange(parseInt(e.target.value))}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
        </div>
        
        {/* 應用調整按鈕 */}
        <div className="mt-2 flex space-x-2">
          <button 
            onClick={applyAdjustments} 
            disabled={isProcessing || (brightness === 0 && contrast === 0 && saturation === 0 && sharpness === 0)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            應用調整
          </button>
          <button 
            onClick={handleAutoAdjust} 
            disabled={isProcessing}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            自動調整
          </button>
        </div>
      </div>
      
      {/* 歷史記錄操作 */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">操作</h3>
        <div className="flex space-x-2">
          <button 
            onClick={handleUndo} 
            disabled={isProcessing || historyIndex === 0}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            復原
          </button>
          <button 
            onClick={handleRedo} 
            disabled={isProcessing || historyIndex >= history.length - 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            重做
          </button>
          <button 
            onClick={handleReset} 
            disabled={isProcessing || currentImageUrl === originalImageUrl}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            重置圖片
          </button>
        </div>
      </div>
      
      {/* 歷史記錄信息 */}
      <div className="text-xs text-gray-500">
        歷史記錄: {historyIndex + 1} / {history.length}
      </div>
    </div>
  );
};

export default ImageEditorExample;