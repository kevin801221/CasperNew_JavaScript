import React from 'react';
import { ChevronLeft, RotateCcw, RotateCw, Flip, Flip2 } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 翻轉面板組件
 * 用於在單張編輯模式中翻轉和旋轉圖片
 */
const FlipRotatePanel = () => {
  const { 
    setActiveTool,
    handleRotate,
    imageRotation,
    imageFlipX,
    imageFlipY,
    handleFlip,
    resetTransform
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">翻轉與旋轉</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3">旋轉</h4>
          <div className="flex justify-between items-center mb-4">
            <button 
              className="flex-1 py-2 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-50"
              onClick={() => handleRotate(-90)}
            >
              <RotateCcw size={18} className="mr-1" />
              向左旋轉
            </button>
            <button 
              className="flex-1 py-2 flex items-center justify-center border border-gray-300 border-l-0 rounded-r hover:bg-gray-50"
              onClick={() => handleRotate(90)}
            >
              <RotateCw size={18} className="mr-1" />
              向右旋轉
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              精確旋轉角度: {imageRotation}°
            </label>
            <input 
              type="range" 
              min="-180" 
              max="180" 
              value={imageRotation}
              onChange={(e) => handleRotate(parseInt(e.target.value) - imageRotation)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-180°</span>
              <span>0°</span>
              <span>180°</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3">翻轉</h4>
          <div className="flex justify-between items-center mb-4">
            <button 
              className={`flex-1 py-2 flex items-center justify-center border rounded-l ${
                imageFlipX 
                  ? 'bg-amber-700 text-white border-amber-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleFlip('horizontal')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 3V21M9 5L9 19M15 5V19M7 7L7 17M17 7V17M5 9L5 15M19 9V15M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              水平翻轉
            </button>
            <button 
              className={`flex-1 py-2 flex items-center justify-center border border-l-0 rounded-r ${
                imageFlipY 
                  ? 'bg-amber-700 text-white border-amber-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleFlip('vertical')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M3 12H21M5 9L19 9M5 15H19M7 7L17 7M7 17H17M9 5L15 5M9 19H15M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              垂直翻轉
            </button>
          </div>
        </div>
        
        <button 
          className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center"
          onClick={resetTransform}
        >
          重置所有變形
        </button>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">提示</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li className="mb-1">旋轉可用於調整圖片方向</li>
            <li className="mb-1">翻轉可用於創建鏡像效果</li>
            <li>精確旋轉可微調圖片角度</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlipRotatePanel;
