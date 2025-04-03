import React from 'react';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 調整面板組件
 * 用於在單張編輯模式中調整圖片的亮度、對比度等參數
 */
const AdjustmentPanel = () => {
  const { 
    setActiveTool,
    imageFilters,
    updateImageFilter,
    resetImageFilters,
    imageOpacity,
    updateImageOpacity
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">調整</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                亮度
              </label>
              <span className="text-xs text-gray-500">{imageFilters.brightness}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={imageFilters.brightness}
              onChange={(e) => updateImageFilter('brightness', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                對比度
              </label>
              <span className="text-xs text-gray-500">{imageFilters.contrast}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={imageFilters.contrast}
              onChange={(e) => updateImageFilter('contrast', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                飽和度
              </label>
              <span className="text-xs text-gray-500">{imageFilters.saturation}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={imageFilters.saturation}
              onChange={(e) => updateImageFilter('saturation', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                模糊
              </label>
              <span className="text-xs text-gray-500">{imageFilters.blur}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1"
              value={imageFilters.blur}
              onChange={(e) => updateImageFilter('blur', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                灰階
              </label>
              <span className="text-xs text-gray-500">{imageFilters.grayscale}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={imageFilters.grayscale}
              onChange={(e) => updateImageFilter('grayscale', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                透明度
              </label>
              <span className="text-xs text-gray-500">{imageOpacity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={imageOpacity}
              onChange={(e) => updateImageOpacity(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <button 
          className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center"
          onClick={resetImageFilters}
        >
          <RefreshCw size={16} className="mr-1" />
          重置所有調整
        </button>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">提示</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li className="mb-1">增加亮度可使圖片更明亮</li>
            <li className="mb-1">增加對比度可使圖片更鮮明</li>
            <li className="mb-1">增加飽和度可使顏色更鮮豔</li>
            <li>灰階可將圖片轉為黑白效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentPanel;
