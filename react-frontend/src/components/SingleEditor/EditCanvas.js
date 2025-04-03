import React from 'react';
import { Plus, Minus, Edit3 } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import CanvasTools from './CanvasTools';

/**
 * 編輯畫布組件
 * 用於顯示和編輯圖片的主要區域
 */
const EditCanvas = () => {
  const { 
    canvasWidth, 
    canvasHeight, 
    zoom, 
    handleZoomChange,
    productImageUrl,
    activeTool,
    rulerStyle,
    rulerTab,
    rulerValue,
    rulerUnit,
    rulerText
  } = useImageContext();

  return (
    <div className="flex-1 bg-gray-100 overflow-auto relative">
      <div className="p-8 h-full flex items-center justify-center">
        <div className="relative">
          <div 
            style={{ 
              width: `${canvasWidth * zoom / 100}px`, 
              height: `${canvasHeight * zoom / 100}px`,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }} 
            className="bg-white relative"
          >
            <img 
              src={productImageUrl} 
              alt="商品圖" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full"
            />
            
            {/* 編輯控制點 */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-nw-resize"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform translate-x-1/2 -translate-y-1/2 cursor-ne-resize"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform -translate-x-1/2 translate-y-1/2 cursor-sw-resize"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2 cursor-se-resize"></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-n-resize"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform -translate-x-1/2 translate-y-1/2 cursor-s-resize"></div>
            <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-w-resize"></div>
            <div className="absolute top-1/2 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full transform translate-x-1/2 -translate-y-1/2 cursor-e-resize"></div>
            
            {/* 畫布中可能有的標記尺 */}
            {activeTool === 'ruler' && (
              <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-24 h-px bg-black"></div>
                  {rulerStyle === 0 && <div className="w-2 h-2 bg-white border border-black rounded-full"></div>}
                  {rulerStyle > 0 && rulerStyle < 4 && <div className={`h-2 border-l border-black ${rulerStyle === 3 ? 'border-dashed' : ''}`}></div>}
                  <div className="w-24 h-px bg-black"></div>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-1 text-xs">
                  {rulerTab === '數值' ? `${rulerValue} ${rulerUnit.split('(')[0]}` : rulerText}
                </div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <button className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded opacity-70">
                    <Edit3 size={12} className="inline mr-1" />
                    點擊開始標記
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 畫布工具 */}
      <CanvasTools />
      
      {/* 底部縮放控制 */}
      <div className="absolute bottom-4 right-4 flex items-center bg-white rounded shadow px-2 py-1">
        <button 
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={() => handleZoomChange(zoom - 5)}
          disabled={zoom <= 10}
        >
          <Minus size={16} />
        </button>
        <div className="w-24 mx-2">
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={zoom}
            onChange={(e) => handleZoomChange(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <button 
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={() => handleZoomChange(zoom + 5)}
          disabled={zoom >= 100}
        >
          <Plus size={16} />
        </button>
        <span className="ml-2 text-sm">{zoom}%</span>
      </div>
    </div>
  );
};

export default EditCanvas;
