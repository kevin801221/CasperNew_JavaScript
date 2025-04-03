import React from 'react';
import { ArrowLeft, Upload, Maximize, Minimize } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';
import ImageGrid from '../BatchMode/ImageGrid';

/**
 * 尺寸調整頁面 (AI 商品圖-2-4)
 * 提供批量調整圖片尺寸和邊距的功能
 */
const SizeAdjustContent = () => {
  const { 
    canvasWidth,
    setCanvasWidth,
    canvasHeight,
    setCanvasHeight,
    aspectRatio,
    setAspectRatio,
    margin,
    setMargin,
    updateCanvasSize,
    setCanvasAspectRatio,
    goBack,
    applyBackgroundToImages,
    zoomLevel,
    zoomIn,
    zoomOut
  } = useImageContext();

  // 處理寬度變更
  const handleWidthChange = (e) => {
    const width = parseInt(e.target.value, 10);
    if (!isNaN(width) && width > 0) {
      updateCanvasSize(width, null, aspectRatio !== 'custom');
    }
  };

  // 處理高度變更
  const handleHeightChange = (e) => {
    const height = parseInt(e.target.value, 10);
    if (!isNaN(height) && height > 0) {
      updateCanvasSize(null, height, aspectRatio !== 'custom');
    }
  };

  // 處理比例變更
  const handleAspectRatioChange = (ratio) => {
    setCanvasAspectRatio(ratio);
  };

  // 處理邊距變更
  const handleMarginChange = (e) => {
    const newMargin = parseInt(e.target.value, 10);
    if (!isNaN(newMargin) && newMargin >= 0) {
      setMargin(newMargin);
    }
  };

  return (
    <div className="flex flex-1">
      {/* 左側尺寸調整面板 */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* 返回按鈕 */}
          <button 
            className="flex items-center text-gray-600 mb-4 hover:text-gray-900"
            onClick={goBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            返回
          </button>
          
          {/* 畫布尺寸設置 */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">畫布尺寸</h3>
            
            <div className="flex mb-2">
              <div className="flex-1 mr-2">
                <label className="text-xs text-gray-500 block mb-1">寬度 (px)</label>
                <input 
                  type="number" 
                  value={canvasWidth}
                  onChange={handleWidthChange}
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                  min="1"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">高度 (px)</label>
                <input 
                  type="number" 
                  value={canvasHeight}
                  onChange={handleHeightChange}
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                  min="1"
                />
              </div>
            </div>
            
            {/* 比例選擇 */}
            <div className="mb-2">
              <label className="text-xs text-gray-500 block mb-1">比例</label>
              <div className="flex flex-wrap">
                <button 
                  className={`px-2 py-1 text-xs rounded mr-1 mb-1 ${aspectRatio === 'custom' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleAspectRatioChange('custom')}
                >
                  自選
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded mr-1 mb-1 ${aspectRatio === '1:1' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleAspectRatioChange('1:1')}
                >
                  1:1
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded mr-1 mb-1 ${aspectRatio === '4:3' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleAspectRatioChange('4:3')}
                >
                  4:3
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded mr-1 mb-1 ${aspectRatio === '16:9' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleAspectRatioChange('16:9')}
                >
                  16:9
                </button>
              </div>
            </div>
          </div>
          
          {/* 邊距設置 */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">邊距</h3>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={margin}
              onChange={handleMarginChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>{margin}px</span>
              <span>100</span>
            </div>
          </div>
          
          {/* 應用按鈕 */}
          <Button 
            variant="primary"
            onClick={applyBackgroundToImages}
            className="w-full mt-4"
          >
            應用設置
          </Button>
        </div>
      </div>
      
      {/* 中央圖片網格區域 */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          {/* 圖片網格 */}
          <ImageGrid 
            showSizePreview={true} 
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            margin={margin}
          />
        </div>
      </div>
      
      {/* 右側控制欄 */}
      <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4">
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <Upload size={16} />
        </button>
        
        {/* 縮放控制 */}
        <div className="mt-4">
          <button 
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2"
            onClick={zoomIn}
          >
            <span className="text-sm font-bold">+</span>
          </button>
          
          <div className="text-xs text-center mb-2">{Math.round(zoomLevel * 100)}%</div>
          
          <button 
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            onClick={zoomOut}
          >
            <span className="text-sm font-bold">-</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeAdjustContent;
