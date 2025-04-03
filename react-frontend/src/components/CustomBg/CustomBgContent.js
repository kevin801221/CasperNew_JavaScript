import React, { useRef } from 'react';
import { ArrowLeft, X, Upload } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';

/**
 * 自定義背景頁面 (AI 商品圖-2-2)
 * 允許用戶通過文本提示詞和參考圖片自定義背景
 */
const CustomBgContent = () => {
  const { 
    bgDesignMode, 
    setBgDesignMode,
    prompt, 
    setPrompt,
    negativePrompt, 
    setNegativePrompt,
    referenceImages, 
    setReferenceImages,
    generateBackgrounds,
    goBack
  } = useImageContext();
  
  // 文件上傳參考
  const fileInputRef = useRef(null);
  
  // 處理文件上傳
  const handleFileUpload = (e) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map(file => ({
          id: Date.now() + Math.random(),
          url: URL.createObjectURL(file),
          name: file.name
        }));
      
      // 限制最多4張參考圖片
      setReferenceImages(prev => [...prev, ...newImages].slice(0, 4));
    }
    
    // 重置 input，以便可以重複上傳相同的檔案
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 移除參考圖片
  const removeReferenceImage = (id) => {
    setReferenceImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="flex flex-1">
      {/* 左側自定義背景面板 */}
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
          
          {/* 模式選擇 */}
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
            <div className="mt-4">
              {/* 推薦模式內容 - 這部分在 BackgroundPanel 組件中已經實現 */}
              <p className="text-gray-500 text-sm text-center mt-10">
                請切換到【自定義】模式查看背景自定義功能
              </p>
            </div>
          ) : (
            <div className="mt-4">
              {/* 自定義模式內容 */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1">描述你想要添加的內容</label>
                <textarea 
                  className="w-full border border-gray-300 rounded p-2 text-sm h-24"
                  placeholder="例如：簡約純色背景，淺綠色，平滑紋理..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1">不希望生成的內容</label>
                <textarea 
                  className="w-full border border-gray-300 rounded p-2 text-sm h-20"
                  placeholder="例如：人物，文字，複雜圖案..."
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
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
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/jpeg,image/jpg,image/png"
                        style={{ display: 'none' }}
                      />
                      <Upload size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                variant="primary"
                onClick={generateBackgrounds}
                className="w-full mt-4"
                disabled={!prompt.trim()}
              >
                生成
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* 中央圖片網格區域 */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          <div className="text-center text-gray-500 mt-10">
            <p>請在左側面板設定自定義背景參數</p>
            <p className="mt-2">完成設定後點擊「生成」按鈕</p>
          </div>
        </div>
      </div>
      
      {/* 右側控制欄 */}
      <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4">
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <Upload size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomBgContent;
