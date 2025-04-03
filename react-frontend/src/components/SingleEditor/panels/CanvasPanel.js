import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 畫布設置面板組件
 * 用於調整畫布尺寸和比例
 */
const CanvasPanel = () => {
  const { 
    canvasWidth, 
    canvasHeight, 
    aspectRatio,
    setCanvasWidth,
    setCanvasHeight,
    setAspectRatio,
    setActiveTool
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">畫布尺寸</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex mb-2">
            <div className="flex-1 mr-2">
              <label className="text-xs text-gray-500 block mb-1">px 寬</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={canvasWidth}
                  onChange={(e) => setCanvasWidth(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">px 高</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={canvasHeight}
                  onChange={(e) => setCanvasHeight(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-sm block mb-1">比例</label>
          <div className="relative">
            <select 
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none"
            >
              <option>自選</option>
              <option>1:1</option>
              <option>4:3</option>
              <option>16:9</option>
            </select>
            <div className="absolute right-2 top-2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
