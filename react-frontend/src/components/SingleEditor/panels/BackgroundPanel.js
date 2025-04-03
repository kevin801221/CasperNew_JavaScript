import React, { useRef } from 'react';
import { ChevronLeft, Plus, X, Upload } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * AI 背景設置面板組件
 * 用於設置和生成 AI 背景
 */
const BackgroundPanel = () => {
  const { 
    bgDesignMode, 
    setBgDesignMode,
    bgPrompt,
    setBgPrompt,
    bgNegativePrompt,
    setBgNegativePrompt,
    referenceImages,
    removeReferenceImage,
    handleReferenceImageUpload,
    handleGenerateBackground,
    setActiveTool,
    recentlyUsedBackgrounds: recentBackgrounds
  } = useImageContext();
  
  const bgReferenceInputRef = useRef(null);

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">AI 背景</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="flex mb-4">
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${bgDesignMode === 'recommend' ? 'border-amber-500 font-medium' : 'border-gray-200 text-gray-500'}`}
            onClick={() => setBgDesignMode('recommend')}
          >
            推薦
          </button>
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${bgDesignMode === 'custom' ? 'border-amber-500 font-medium' : 'border-gray-200 text-gray-500'}`}
            onClick={() => setBgDesignMode('custom')}
          >
            自定義
          </button>
        </div>
        
        {bgDesignMode === 'recommend' ? (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">最近常用</h3>
              <div className="flex flex-wrap gap-2">
                {recentBackgrounds.map((img, i) => (
                  <img key={i} src={img} alt="最近常用背景" className="w-20 h-16 object-cover rounded cursor-pointer" />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">推薦</h3>
              <div className="relative mb-2">
                <input 
                  type="text" 
                  placeholder="輸入圖片關鍵字尋找" 
                  className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
                />
                <svg className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              
              <div className="flex text-sm mb-2 overflow-x-auto py-1">
                <button className="px-2 py-1 bg-gray-200 rounded mr-2 whitespace-nowrap">全部</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">文青</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">簡約</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">時尚</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">更多</button>
              </div>
              
              <div className="flex flex-wrap text-xs mb-2">
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">居家</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">餐廚</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">花</button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 flex justify-between">
                顏色空間
                <span className="text-xs text-gray-500">更多 &gt;</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="w-16 h-16 bg-pink-200 rounded flex items-center justify-center">
                  <Plus size={20} className="text-pink-500" />
                </div>
                {recentBackgrounds.slice(0, 2).map((img, i) => (
                  <img key={i} src={img} alt="顏色空間背景" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 flex justify-between">
                文青白系
                <span className="text-xs text-gray-500">更多 &gt;</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentBackgrounds.map((img, i) => (
                  <img key={i} src={img} alt="文青白系背景" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <button className="w-full py-2 bg-amber-700 text-white rounded">
              生成
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1">描述你想要添加的內容</label>
              <textarea 
                className="w-full border border-gray-300 rounded p-2 text-sm h-24"
                placeholder="例如：簡約純色背景，淺綠色，平滑紋理..."
                value={bgPrompt}
                onChange={(e) => setBgPrompt(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1">不希望生成的內容</label>
              <textarea 
                className="w-full border border-gray-300 rounded p-2 text-sm h-20"
                placeholder="例如：人物，文字，複雜圖案..."
                value={bgNegativePrompt}
                onChange={(e) => setBgNegativePrompt(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1">背景風格參考</label>
              <p className="text-xs text-gray-500 mb-2">上傳1-4張參考圖片</p>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                {referenceImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img 
                      src={image.url} 
                      alt="參考圖" 
                      className="w-full h-20 object-cover rounded" 
                    />
                    <button 
                      className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => removeReferenceImage(image.id)}
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
                
                {referenceImages.length < 4 && (
                  <div 
                    className="w-full h-20 border border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer bg-gray-50"
                    onClick={() => bgReferenceInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={bgReferenceInputRef}
                      onChange={handleReferenceImageUpload}
                      accept="image/jpeg,image/jpg,image/png"
                      style={{ display: 'none' }}
                    />
                    <Upload size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            
            <button 
              className="w-full py-2 bg-amber-700 text-white rounded mt-4"
              onClick={handleGenerateBackground}
            >
              生成
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundPanel;
