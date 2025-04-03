import React from 'react';

/**
 * 通用按鈕組件
 * @param {Object} props - 組件屬性
 * @param {string} [props.variant='primary'] - 按鈕變體 (primary, secondary, outline, icon)
 * @param {React.ReactNode} props.children - 按鈕內容
 * @param {Function} props.onClick - 點擊事件處理函數
 * @param {string} [props.className=''] - 額外的 CSS 類名
 * @param {boolean} [props.disabled=false] - 是否禁用按鈕
 */
const Button = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  ...rest 
}) => {
  // 根據變體選擇不同的樣式
  const variantStyles = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    icon: 'text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded flex items-center justify-center transition-colors ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
