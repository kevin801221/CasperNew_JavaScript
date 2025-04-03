import React, { useState } from 'react';
import { ChevronLeft, Crop, Maximize, Zap } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 裁切功能面板組件
 * 用於在單張編輯模式中裁切和擴展圖片
 */
const CropPanel = ({ onClose }) => {
  const { 
    canvasWidth,
    canvasHeight
  } = useImageContext();
  
  // 當前模式
  const [mode, setMode] = useState('crop'); // 'crop' 或 'expand'
  
  // 裁切比例
  const [cropRatio, setCropRatio] = useState('free');
  
  // 擴圖設置
  const [expandWidth, setExpandWidth] = useState(canvasWidth);
  const [expandHeight, setExpandHeight] = useState(canvasHeight);
  const [expandColor, setExpandColor] = useState('#ffffff');
  
  // 處理智慧裁切
  const handleSmartCrop = () => {
    console.log('智慧裁切');
    // 在實際應用中，這裡會使用 AI 進行智慧裁切
  };
  
  // 處理裁切應用
  const handleApplyCrop = () => {
    console.log('應用裁切');
    // 在實際應用中，這裡會應用裁切設置
  };
  
  // 處理擴圖應用
  const handleApplyExpand = () => {
    console.log('應用擴圖');
    console.log('擴圖尺寸:', expandWidth, 'x', expandHeight);
    console.log('擴圖顏色:', expandColor);
    // 在實際應用中，這裡會應用擴圖設置
  };
  
  // 渲染裁切模式內容
  const renderCropMode = () => (
    <div>
      <div className="mb-4">
        <button 
          className="w-full py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
          onClick={handleSmartCrop}
        >
          <Zap size={14} className="mr-1" />
          智慧裁切
        </button>
      </div>
      
      <h4 className="font-medium mb-2">寬高比</h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === 'free' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('free')}
        >
          自由
        </button>
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === '1:1' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('1:1')}
        >
          1:1
        </button>
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === '4:3' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('4:3')}
        >
          4:3
        </button>
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === '16:9' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('16:9')}
        >
          16:9
        </button>
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === '3:4' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('3:4')}
        >
          3:4
        </button>
        <button 
          className={`p-2 text-center text-sm border ${cropRatio === '9:16' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setCropRatio('9:16')}
        >
          9:16
        </button>
      </div>
      
      <div className="mt-auto">
        <button 
          className="w-full py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
          onClick={handleApplyCrop}
        >
          套用
        </button>
      </div>
    </div>
  );
  
  // 渲染擴圖模式內容
  const renderExpandMode = () => (
    <div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">畫布尺寸</h4>
        <div className="flex gap-2 mb-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">寬度</label>
            <input 
              type="number" 
              value={expandWidth}
              onChange={(e) => setExpandWidth(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">高度</label>
            <input 
              type="number" 
              value={expandHeight}
              onChange={(e) => setExpandHeight(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">背景顏色</h4>
        <div className="flex gap-2">
          <div 
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: '#ffffff' }}
            onClick={() => setExpandColor('#ffffff')}
          ></div>
          <div 
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: '#000000' }}
            onClick={() => setExpandColor('#000000')}
          ></div>
          <div 
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: '#ff0000' }}
            onClick={() => setExpandColor('#ff0000')}
          ></div>
          <div 
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: '#00ff00' }}
            onClick={() => setExpandColor('#00ff00')}
          ></div>
          <div 
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: '#0000ff' }}
            onClick={() => setExpandColor('#0000ff')}
          ></div>
          <input 
            type="color" 
            value={expandColor}
            onChange={(e) => setExpandColor(e.target.value)}
            className="w-8 h-8 p-0 border-0"
          />
        </div>
      </div>
      
      <div className="mt-auto">
        <button 
          className="w-full py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
          onClick={handleApplyExpand}
        >
          套用
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">裁切</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="flex mb-4">
          <button 
            className={`flex-1 flex items-center justify-center py-2 ${mode === 'crop' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-l`}
            onClick={() => setMode('crop')}
          >
            <Crop size={14} className="mr-1" />
            裁切
          </button>
          <button 
            className={`flex-1 flex items-center justify-center py-2 ${mode === 'expand' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-r border-l-0`}
            onClick={() => setMode('expand')}
          >
            <Maximize size={14} className="mr-1" />
            擴圖
          </button>
        </div>
        
        {mode === 'crop' ? renderCropMode() : renderExpandMode()}
      </div>
    </div>
  );
};

export default CropPanel;
