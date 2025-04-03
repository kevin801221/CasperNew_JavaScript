import React, { useState } from 'react';
import { ChevronLeft, Square, RefreshCw } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 邊框樣式面板組件
 * 用於在單張編輯模式中調整圖片邊框樣式
 */
const BorderPanel = ({ onClose }) => {
  // 邊框設置
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderStyle, setBorderStyle] = useState('solid');
  
  // 邊框圓角
  const [borderRadius, setBorderRadius] = useState(0);
  
  // 陰影設置
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.5)');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [shadowOffsetX, setShadowOffsetX] = useState(5);
  const [shadowOffsetY, setShadowOffsetY] = useState(5);
  
  // 預設顏色
  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', 
    '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080'
  ];
  
  // 邊框樣式選項
  const borderStyles = [
    { id: 'solid', label: '實線' },
    { id: 'dashed', label: '虛線' },
    { id: 'dotted', label: '點線' },
    { id: 'double', label: '雙線' }
  ];
  
  // 處理邊框應用
  const handleApplyBorder = () => {
    console.log('應用邊框樣式');
    console.log('邊框寬度:', borderWidth);
    console.log('邊框顏色:', borderColor);
    console.log('邊框樣式:', borderStyle);
    console.log('邊框圓角:', borderRadius);
    
    if (shadowEnabled) {
      console.log('陰影顏色:', shadowColor);
      console.log('陰影模糊:', shadowBlur);
      console.log('陰影偏移:', shadowOffsetX, shadowOffsetY);
    }
    
    // 在實際應用中，這裡會應用邊框設置
  };
  
  // 重設邊框
  const handleResetBorder = () => {
    console.log('重設邊框');
    setBorderWidth(0);
    setBorderColor('#000000');
    setBorderStyle('solid');
    setBorderRadius(0);
    setShadowEnabled(false);
    setShadowColor('rgba(0, 0, 0, 0.5)');
    setShadowBlur(10);
    setShadowOffsetX(5);
    setShadowOffsetY(5);
  };
  
  // 邊框預覽樣式
  const borderPreviewStyle = {
    width: '100%',
    height: '80px',
    backgroundColor: '#f0f0f0',
    borderWidth: `${borderWidth}px`,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: `${borderRadius}px`,
    boxShadow: shadowEnabled ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : 'none'
  };
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">邊框樣式</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <div style={borderPreviewStyle}></div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm">邊框寬度</label>
            <span className="text-xs">{borderWidth}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={borderWidth}
            onChange={(e) => setBorderWidth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">邊框顏色</h4>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {presetColors.map((color, index) => (
              <div 
                key={index}
                className={`w-full aspect-square border ${borderColor === color ? 'border-amber-500' : 'border-gray-300'} rounded cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => setBorderColor(color)}
              ></div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
            <input 
              type="text" 
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">邊框樣式</h4>
          <div className="grid grid-cols-2 gap-2">
            {borderStyles.map(style => (
              <button 
                key={style.id}
                className={`p-2 text-center text-sm border ${borderStyle === style.id ? 'border-amber-500' : 'border-gray-300'} rounded`}
                style={{ borderStyle: style.id }}
                onClick={() => setBorderStyle(style.id)}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm">邊框圓角</label>
            <span className="text-xs">{borderRadius}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input 
              type="checkbox" 
              id="shadowEnabled" 
              checked={shadowEnabled}
              onChange={(e) => setShadowEnabled(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="shadowEnabled" className="text-sm font-medium">啟用陰影</label>
          </div>
          
          {shadowEnabled && (
            <div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">陰影顏色</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={shadowColor.replace(/[^#\w]/g, '#')}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-10 h-10 p-0 border-0"
                  />
                  <input 
                    type="text" 
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">模糊程度</label>
                  <span className="text-xs">{shadowBlur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">水平偏移</label>
                  <span className="text-xs">{shadowOffsetX}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="50" 
                  value={shadowOffsetX}
                  onChange={(e) => setShadowOffsetX(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">垂直偏移</label>
                  <span className="text-xs">{shadowOffsetY}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="50" 
                  value={shadowOffsetY}
                  onChange={(e) => setShadowOffsetY(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            onClick={handleResetBorder}
          >
            <RefreshCw size={14} className="inline mr-1" />
            重設
          </button>
          <button 
            className="flex-1 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 text-sm"
            onClick={handleApplyBorder}
          >
            套用
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorderPanel;
