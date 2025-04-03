import React, { useState } from 'react';
import { ChevronLeft, Droplet, Palette, RefreshCw } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 顏色調整面板組件
 * 用於在單張編輯模式中調整圖片顏色
 */
const ColorPanel = ({ onClose }) => {
  // 當前顏色模式
  const [colorMode, setColorMode] = useState('solid'); // 'solid', 'gradient', 'eyedropper'
  
  // 顏色選擇
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  
  // 漸層顏色
  const [gradientStartColor, setGradientStartColor] = useState('#ffffff');
  const [gradientEndColor, setGradientEndColor] = useState('#000000');
  const [gradientDirection, setGradientDirection] = useState('to-right');
  
  // 透明度
  const [opacity, setOpacity] = useState(100);
  
  // 預設顏色
  const presetColors = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', 
    '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080'
  ];
  
  // 漸層方向選項
  const gradientDirections = [
    { id: 'to-right', label: '向右', icon: '→' },
    { id: 'to-bottom', label: '向下', icon: '↓' },
    { id: 'to-left', label: '向左', icon: '←' },
    { id: 'to-top', label: '向上', icon: '↑' },
    { id: 'to-bottom-right', label: '右下', icon: '↘' },
    { id: 'to-bottom-left', label: '左下', icon: '↙' },
    { id: 'to-top-right', label: '右上', icon: '↗' },
    { id: 'to-top-left', label: '左上', icon: '↖' },
    { id: 'radial', label: '放射', icon: '○' }
  ];
  
  // 處理顏色應用
  const handleApplyColor = () => {
    console.log('應用顏色');
    if (colorMode === 'solid') {
      console.log('純色:', selectedColor, '透明度:', opacity);
    } else if (colorMode === 'gradient') {
      console.log('漸層:', gradientStartColor, '到', gradientEndColor);
      console.log('方向:', gradientDirection, '透明度:', opacity);
    } else if (colorMode === 'eyedropper') {
      console.log('使用吸管工具選擇顏色');
    }
    // 在實際應用中，這裡會應用顏色設置
  };
  
  // 重設顏色
  const handleResetColor = () => {
    console.log('重設顏色');
    setSelectedColor('#ffffff');
    setGradientStartColor('#ffffff');
    setGradientEndColor('#000000');
    setGradientDirection('to-right');
    setOpacity(100);
  };
  
  // 渲染純色模式內容
  const renderSolidMode = () => (
    <div>
      <h4 className="font-medium mb-2">顏色</h4>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {presetColors.map((color, index) => (
          <div 
            key={index}
            className={`w-full aspect-square border ${selectedColor === color ? 'border-amber-500' : 'border-gray-300'} rounded cursor-pointer`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">自定義顏色</label>
        <div className="flex gap-2">
          <input 
            type="color" 
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-10 h-10 p-0 border-0"
          />
          <input 
            type="text" 
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm">透明度</label>
          <span className="text-xs">{opacity}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={opacity}
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
  
  // 渲染漸層模式內容
  const renderGradientMode = () => (
    <div>
      <h4 className="font-medium mb-2">漸層顏色</h4>
      <div className="flex gap-2 mb-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">起始顏色</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={gradientStartColor}
              onChange={(e) => setGradientStartColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
            />
            <input 
              type="text" 
              value={gradientStartColor}
              onChange={(e) => setGradientStartColor(e.target.value)}
              className="w-20 p-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">結束顏色</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={gradientEndColor}
              onChange={(e) => setGradientEndColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
            />
            <input 
              type="text" 
              value={gradientEndColor}
              onChange={(e) => setGradientEndColor(e.target.value)}
              className="w-20 p-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
      </div>
      
      <h4 className="font-medium mb-2">漸層方向</h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {gradientDirections.map(direction => (
          <button 
            key={direction.id}
            className={`p-2 text-center text-sm border ${gradientDirection === direction.id ? 'border-amber-500' : 'border-gray-300'} rounded`}
            onClick={() => setGradientDirection(direction.id)}
          >
            <span className="block text-lg">{direction.icon}</span>
            <span className="text-xs">{direction.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm">透明度</label>
          <span className="text-xs">{opacity}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={opacity}
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <div 
          className="w-full h-16 rounded border border-gray-300"
          style={{ 
            background: `linear-gradient(${gradientDirection === 'to-right' ? 'to right' : 
                                         gradientDirection === 'to-bottom' ? 'to bottom' : 
                                         gradientDirection === 'to-left' ? 'to left' : 
                                         gradientDirection === 'to-top' ? 'to top' : 
                                         gradientDirection === 'to-bottom-right' ? 'to bottom right' : 
                                         gradientDirection === 'to-bottom-left' ? 'to bottom left' : 
                                         gradientDirection === 'to-top-right' ? 'to top right' : 
                                         gradientDirection === 'to-top-left' ? 'to top left' : 
                                         gradientDirection === 'radial' ? 'radial-gradient(circle' : 'to right'}, ${gradientStartColor}, ${gradientEndColor})`,
            opacity: opacity / 100
          }}
        ></div>
      </div>
    </div>
  );
  
  // 渲染吸管模式內容
  const renderEyedropperMode = () => (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        點擊畫布上的任何位置來選擇顏色。
      </p>
      
      <div className="flex items-center mb-4">
        <div 
          className="w-12 h-12 border border-gray-300 rounded mr-2"
          style={{ backgroundColor: selectedColor }}
        ></div>
        <div>
          <span className="block text-sm">{selectedColor}</span>
          <span className="block text-xs text-gray-500">點擊吸管後選擇顏色</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm">透明度</label>
          <span className="text-xs">{opacity}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={opacity}
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">顏色</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="flex mb-4">
          <button 
            className={`flex-1 flex items-center justify-center py-2 text-sm ${colorMode === 'solid' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-l`}
            onClick={() => setColorMode('solid')}
          >
            <Droplet size={14} className="mr-1" />
            純色
          </button>
          <button 
            className={`flex-1 flex items-center justify-center py-2 text-sm ${colorMode === 'gradient' ? 'bg-gray-200 font-medium' : 'bg-white'} border-t border-b border-gray-300`}
            onClick={() => setColorMode('gradient')}
          >
            <Palette size={14} className="mr-1" />
            漸層
          </button>
          <button 
            className={`flex-1 flex items-center justify-center py-2 text-sm ${colorMode === 'eyedropper' ? 'bg-gray-200 font-medium' : 'bg-white'} border border-gray-300 rounded-r`}
            onClick={() => setColorMode('eyedropper')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M18 16.5l-4.5 4.5-7-7L11 9.5" />
              <path d="M14 6.5l3.5 3.5" />
              <path d="M8 2l-4 4 11.5 11.5" />
            </svg>
            吸管
          </button>
        </div>
        
        {colorMode === 'solid' && renderSolidMode()}
        {colorMode === 'gradient' && renderGradientMode()}
        {colorMode === 'eyedropper' && renderEyedropperMode()}
        
        <div className="flex gap-2 mt-4">
          <button 
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            onClick={handleResetColor}
          >
            <RefreshCw size={14} className="inline mr-1" />
            重設
          </button>
          <button 
            className="flex-1 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 text-sm"
            onClick={handleApplyColor}
          >
            套用
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPanel;
