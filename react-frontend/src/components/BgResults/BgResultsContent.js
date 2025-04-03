import React from 'react';
import { ArrowLeft, Check, Upload, Maximize, Minimize } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';
import ImageGrid from '../BatchMode/ImageGrid';

/**
 * 背景生成結果頁面 (AI 商品圖-2-3)
 * 顯示 AI 生成的背景選項結果
 */
const BgResultsContent = () => {
  const { 
    generatedBackgrounds,
    selectedBackground,
    setSelectedBackground,
    generateMoreBackgrounds,
    goBack,
    enterCustomBgMode,
    enterSizeAdjustMode,
    applyBackgroundToImages,
    zoomLevel,
    zoomIn,
    zoomOut
  } = useImageContext();

  return (
    <div className="flex flex-1">
      {/* 左側背景結果面板 */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* 返回按鈕 */}
          <button 
            className="flex items-center text-gray-600 mb-4 hover:text-gray-900"
            onClick={goBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            生成結果
          </button>
          
          {/* 生成的背景選項 */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {generatedBackgrounds.map((bg, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer border-2 rounded overflow-hidden ${selectedBackground === bg ? 'border-amber-500' : 'border-transparent'}`}
                  onClick={() => setSelectedBackground(bg)}
                >
                  <img 
                    src={bg} 
                    alt={`背景選項 ${index + 1}`} 
                    className="w-full h-24 object-cover" 
                  />
                  {selectedBackground === bg && (
                    <div className="absolute top-1 right-1 bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 操作按鈕 */}
          <Button 
            variant="outline"
            onClick={generateMoreBackgrounds}
            className="w-full mb-2"
          >
            生成更多內容
          </Button>
          
          <Button 
            variant="outline"
            onClick={enterCustomBgMode}
            className="w-full mb-4"
          >
            重新生成
          </Button>
          
          <Button 
            variant="primary"
            onClick={applyBackgroundToImages}
            className="w-full"
            disabled={!selectedBackground}
          >
            應用背景
          </Button>
        </div>
      </div>
      
      {/* 中央圖片網格區域 */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          {/* 圖片網格 */}
          <ImageGrid showBackgroundPreview={true} backgroundImage={selectedBackground} />
        </div>
      </div>
      
      {/* 右側控制欄 */}
      <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4">
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <Upload size={16} />
        </button>
        
        <button 
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2"
          onClick={enterSizeAdjustMode}
        >
          <Maximize size={16} />
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

export default BgResultsContent;
