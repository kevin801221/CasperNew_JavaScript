import React from 'react';
import { Layout, ImageIcon, Type, Ruler, Upload } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';

/**
 * 畫布工具欄組件
 * 顯示在畫布左側的工具按鈕
 */
const CanvasTools = () => {
  const { 
    activeTool, 
    handleToolClick 
  } = useImageContext();

  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded shadow-md">
      <div className="flex flex-col items-center">
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'canvas' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('canvas')}
        >
          <Layout size={18} />
          <span className="text-xs">畫布</span>
        </button>
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'background' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('background')}
        >
          <ImageIcon size={18} />
          <span className="text-xs">AI 背景</span>
        </button>
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'element' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('element')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-xs">元素</span>
        </button>
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'text' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('text')}
        >
          <Type size={18} />
          <span className="text-xs">文字</span>
        </button>
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'ruler' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('ruler')}
        >
          <Ruler size={18} />
          <span className="text-xs">標記尺</span>
        </button>
        <button 
          className={`w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-100 ${activeTool === 'upload' ? 'bg-gray-200' : ''}`}
          onClick={() => handleToolClick('upload')}
        >
          <Upload size={18} />
          <span className="text-xs">上傳</span>
        </button>
      </div>
    </div>
  );
};

export default CanvasTools;
