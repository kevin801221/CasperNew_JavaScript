import React from 'react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 文字屬性面板組件
 * 用於調整文字的樣式和屬性
 */
const TextPropertiesPanel = () => {
  const { 
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <label className="text-sm block mb-1">文字間距</label>
          <div className="flex items-center">
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
              className="flex-1 mr-2"
            />
            <span className="text-sm">{letterSpacing}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-sm block mb-1">行高</label>
          <div className="flex items-center">
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.01"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="flex-1 mr-2"
            />
            <span className="text-sm">{lineHeight.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPropertiesPanel;
