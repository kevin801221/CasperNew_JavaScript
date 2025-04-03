import React, { useState } from 'react';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 邊角圓化面板組件
 * 用於在單張編輯模式中調整圖片邊角圓度
 */
const CornerRadiusPanel = ({ onClose }) => {
  // 邊角圓度模式
  const [radiusMode, setRadiusMode] = useState('all'); // 'all', 'individual'
  
  // 統一圓角值
  const [uniformRadius, setUniformRadius] = useState(0);
  
  // 個別圓角值
  const [topLeftRadius, setTopLeftRadius] = useState(0);
  const [topRightRadius, setTopRightRadius] = useState(0);
  const [bottomLeftRadius, setBottomLeftRadius] = useState(0);
  const [bottomRightRadius, setBottomRightRadius] = useState(0);
  
  // 處理圓角應用
  const handleApplyRadius = () => {
    console.log('應用邊角圓度');
    if (radiusMode === 'all') {
      console.log('統一圓角:', uniformRadius);
    } else {
      console.log('左上圓角:', topLeftRadius);
      console.log('右上圓角:', topRightRadius);
      console.log('左下圓角:', bottomLeftRadius);
      console.log('右下圓角:', bottomRightRadius);
    }
    // 在實際應用中，這裡會應用圓角設置
  };
  
  // 重設圓角
  const handleResetRadius = () => {
    console.log('重設圓角');
    setUniformRadius(0);
    setTopLeftRadius(0);
    setTopRightRadius(0);
    setBottomLeftRadius(0);
    setBottomRightRadius(0);
  };
  
  // 圓角預覽樣式
  const cornerPreviewStyle = {
    width: '100%',
    height: '120px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: radiusMode === 'all' 
      ? `${uniformRadius}px` 
      : `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`
  };
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">邊角圓化</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <div style={cornerPreviewStyle}></div>
        </div>
        
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-2 text-sm ${radiusMode === 'all' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-l`}
            onClick={() => setRadiusMode('all')}
          >
            統一圓角
          </button>
          <button 
            className={`flex-1 py-2 text-sm ${radiusMode === 'individual' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-r border-l-0`}
            onClick={() => setRadiusMode('individual')}
          >
            個別圓角
          </button>
        </div>
        
        {radiusMode === 'all' ? (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label className="text-sm">圓角大小</label>
              <span className="text-xs">{uniformRadius}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={uniformRadius}
              onChange={(e) => setUniformRadius(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="text-sm">左上圓角</label>
                <span className="text-xs">{topLeftRadius}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={topLeftRadius}
                onChange={(e) => setTopLeftRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="text-sm">右上圓角</label>
                <span className="text-xs">{topRightRadius}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={topRightRadius}
                onChange={(e) => setTopRightRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="text-sm">左下圓角</label>
                <span className="text-xs">{bottomLeftRadius}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={bottomLeftRadius}
                onChange={(e) => setBottomLeftRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="text-sm">右下圓角</label>
                <span className="text-xs">{bottomRightRadius}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={bottomRightRadius}
                onChange={(e) => setBottomRightRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                className="p-2 text-center text-sm border border-gray-300 rounded"
                onClick={() => {
                  const value = Math.max(topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius);
                  setTopLeftRadius(value);
                  setTopRightRadius(value);
                  setBottomLeftRadius(value);
                  setBottomRightRadius(value);
                }}
              >
                全部設為最大值
              </button>
              <button 
                className="p-2 text-center text-sm border border-gray-300 rounded"
                onClick={() => {
                  const value = Math.min(topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius);
                  setTopLeftRadius(value);
                  setTopRightRadius(value);
                  setBottomLeftRadius(value);
                  setBottomRightRadius(value);
                }}
              >
                全部設為最小值
              </button>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            onClick={handleResetRadius}
          >
            <RefreshCw size={14} className="inline mr-1" />
            重設
          </button>
          <button 
            className="flex-1 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 text-sm"
            onClick={handleApplyRadius}
          >
            套用
          </button>
        </div>
      </div>
    </div>
  );
};

export default CornerRadiusPanel;
