import React, { useState } from 'react';
import { ChevronLeft, Eraser, Undo, RefreshCw } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 去背功能面板組件
 * 用於在單張編輯模式中去除圖片背景
 */
const RemoveBackgroundPanel = ({ onClose }) => {
  const { 
    productImageUrl,
    setProductImageUrl
  } = useImageContext();
  
  // 自動識別選項
  const [autoDetectOption, setAutoDetectOption] = useState('product');
  
  // 筆刷大小
  const [brushSize, setBrushSize] = useState(20);
  
  // 當前工具
  const [currentTool, setCurrentTool] = useState('erase'); // 'erase' 或 'restore'
  
  // 處理去背
  const handleRemoveBackground = async () => {
    try {
      console.log('去背處理中...');
      // 在實際應用中，這裡會調用 removeBackgroundAPI
      // 模擬去背處理
      setTimeout(() => {
        console.log('去背完成');
        // 這裡應該更新圖片 URL
      }, 1500);
    } catch (error) {
      console.error('去背處理失敗:', error);
    }
  };
  
  // 重設
  const handleReset = () => {
    console.log('重設去背編輯');
    // 在實際應用中，這裡會重設去背編輯
  };
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">去背</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">AI 自動識別</h4>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-2 py-1 text-sm rounded ${autoDetectOption === 'off' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              onClick={() => setAutoDetectOption('off')}
            >
              關閉
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded ${autoDetectOption === 'portrait' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              onClick={() => setAutoDetectOption('portrait')}
            >
              人像動物
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded ${autoDetectOption === 'product' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              onClick={() => setAutoDetectOption('product')}
            >
              商品貨物
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded ${autoDetectOption === 'icon' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              onClick={() => setAutoDetectOption('icon')}
            >
              圖標印章
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">選取工具</h4>
          <div className="flex mb-2">
            <button 
              className={`flex-1 py-1 text-sm ${currentTool === 'erase' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-l`}
              onClick={() => setCurrentTool('erase')}
            >
              <Eraser size={14} className="inline mr-1" />
              擦除
            </button>
            <button 
              className={`flex-1 py-1 text-sm ${currentTool === 'restore' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-r border-l-0`}
              onClick={() => setCurrentTool('restore')}
            >
              <Undo size={14} className="inline mr-1" />
              恢復
            </button>
          </div>
          
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">筆刷大小</label>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>小</span>
              <span>大</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">局部去背</h4>
          <p className="text-sm text-gray-600 mb-2">
            在圖中框選區域，然後一次去除
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={handleReset}
          >
            <RefreshCw size={14} className="inline mr-1" />
            重設
          </button>
          <button 
            className="flex-1 py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
            onClick={handleRemoveBackground}
          >
            套用
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackgroundPanel;
