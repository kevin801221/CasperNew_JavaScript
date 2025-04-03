import React from 'react';

/**
 * 開關切換組件
 * @param {Object} props - 組件屬性
 * @param {boolean} props.isOn - 開關狀態
 * @param {Function} props.onToggle - 切換事件處理函數
 * @param {string} [props.className=''] - 額外的 CSS 類名
 */
const Toggle = ({ isOn, onToggle, className = '' }) => {
  return (
    <div 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors
        ${isOn ? 'bg-yellow-500 justify-end' : 'bg-gray-300 justify-start'} ${className}`}
    >
      <div className="w-4 h-4 rounded-full bg-white transition-transform"></div>
    </div>
  );
};

export default Toggle;
