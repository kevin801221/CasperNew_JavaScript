import React from 'react';

/**
 * 側邊欄組件
 * @param {Object} props - 組件屬性
 * @param {string} props.activePage - 當前活動頁面 ('product', 'my', 'history', 'disclaimer')
 */
const Sidebar = ({ activePage }) => {
  // 側邊欄選項
  const sidebarOptions = [
    { id: 'product', label: '商品圖', icon: '📷' },
    { id: 'my', label: '我的', icon: '📁' },
    { id: 'history', label: '生成紀錄', icon: '📜' },
    { id: 'disclaimer', label: '免責聲明', icon: '📝' }
  ];

  return (
    <div className="w-16 bg-amber-50 border-r border-amber-100 flex flex-col items-center py-4">
      {sidebarOptions.map(option => (
        <button 
          key={option.id}
          className={`w-10 h-10 rounded flex flex-col items-center justify-center mb-6 ${
            activePage === option.id ? 'bg-amber-200' : 'hover:bg-amber-100'
          }`}
          title={option.label}
        >
          <span className="text-lg">{option.icon}</span>
          <span className="text-xs mt-1">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
