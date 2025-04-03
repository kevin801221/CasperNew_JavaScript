import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, Download, RotateCcw, RotateCw, Upload, Trash2, Scissors, Edit, X, Search, Plus, Maximize, Minimize } from 'lucide-react';

const AIProductImageDesigner = () => {
  const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'batch'
  const [autoRemoveBackground, setAutoRemoveBackground] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Sample images for the batch mode sidebar
  const recentlyUsedImages = [
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90'
  ];
  
  const recommendedImages = [
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90',
    '/api/placeholder/120/90'
  ];

  // Batch mode uploaded images (with sample images)
  const batchImages = [
    '/api/placeholder/180/150',
    '/api/placeholder/180/150',
    '/api/placeholder/180/150',
    '/api/placeholder/180/150'
  ];

  const handleFileUpload = (e) => {
    // Handle file upload logic here
    console.log("File upload triggered");
    if (currentPage === 'main') {
      setCurrentPage('batch');
    }
  };

  const toggleBackgroundRemoval = () => {
    setAutoRemoveBackground(!autoRemoveBackground);
  };

  const exitBatchMode = () => {
    setCurrentPage('main');
  };

  const enterBatchMode = () => {
    setCurrentPage('batch');
  };

  const toggleImageSelection = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter(i => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    // Logic to delete selected images
    setSelectedImages([]);
  };

  // Render the main page (AI 商品圖-2)
  const renderMainPage = () => (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="product" />
        
        {/* Upload area */}
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                T
              </div>
            </div>
            
            <button 
              onClick={handleFileUpload}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center justify-center mx-auto mb-4"
            >
              <Upload size={16} className="mr-2" />
              上傳圖片
            </button>
            
            <button 
              onClick={enterBatchMode}
              className="text-gray-700 px-4 py-2 rounded border border-gray-300 flex items-center justify-center mx-auto mb-8"
            >
              或進入批量生成
            </button>
            
            <div className="text-sm text-gray-500 mb-2">
              拖曳/複製/貼上圖片至此區塊 · 直接上傳
            </div>
            <div className="text-sm text-gray-500 mb-6">
              支援 JPG · JPEG · PNG
            </div>
            
            <div className="flex items-center justify-center">
              <span className="mr-2">自動去背</span>
              <div 
                onClick={toggleBackgroundRemoval}
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${autoRemoveBackground ? 'bg-yellow-500 justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the batch mode page (AI 商品圖-2-1)
  const renderBatchModePage = () => (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="product" />
        
        {/* Left panel with background options */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">推薦</h3>
              <div className="flex flex-wrap gap-2">
                {recentlyUsedImages.map((img, i) => (
                  <img key={i} src={img} alt="推薦背景" className="w-20 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">最近常用</h3>
              <div className="flex flex-wrap gap-2">
                {recentlyUsedImages.map((img, i) => (
                  <img key={i} src={img} alt="最近常用背景" className="w-20 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">推薦</h3>
              <div className="relative mb-2">
                <Search size={16} className="absolute left-2 top-2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="輸入圖片關鍵字尋找" 
                  className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              
              <div className="flex text-sm mb-2 overflow-x-auto py-1">
                <button className="px-2 py-1 bg-gray-200 rounded mr-2 whitespace-nowrap">全部</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">文青</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">簡約</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">時尚</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 whitespace-nowrap">更多</button>
              </div>
              
              <div className="flex flex-wrap text-xs mb-2">
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">居家</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">餐廚</button>
                <button className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1">花</button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 flex justify-between">
                顏色空間
                <span className="text-xs text-gray-500">更多 &gt;</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="w-16 h-16 bg-pink-200 rounded flex items-center justify-center">
                  <Plus size={20} className="text-pink-500" />
                </div>
                {recentlyUsedImages.slice(0, 2).map((img, i) => (
                  <img key={i} src={img} alt="顏色空間背景" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 flex justify-between">
                文青白系
                <span className="text-xs text-gray-500">更多 &gt;</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {recommendedImages.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt="文青白系背景" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
            
            <button className="w-full py-2 bg-amber-700 text-white rounded">
              生成
            </button>
          </div>
        </div>
        
        {/* Right panel with uploaded images */}
        <div className="flex-1 bg-gray-100">
          <div className="p-4">
            <div className="flex mb-4 items-center justify-between">
              <button 
                onClick={exitBatchMode}
                className="flex items-center text-gray-700 px-3 py-1 border border-gray-300 rounded mr-4 bg-white"
              >
                <ArrowLeft size={16} className="mr-1" />
                退出批量模式
              </button>
              
              {selectedImages.length > 0 && (
                <button 
                  onClick={deleteSelectedImages}
                  className="flex items-center text-gray-700 px-3 py-1 border border-gray-300 rounded bg-white"
                >
                  <Trash2 size={16} className="mr-1" />
                  刪除
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {batchImages.map((img, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-2 left-2">
                    <div 
                      onClick={() => toggleImageSelection(index)}
                      className={`w-5 h-5 rounded-full border ${selectedImages.includes(index) ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-400'} flex items-center justify-center cursor-pointer`}
                    >
                      {selectedImages.includes(index) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  
                  <img src={img} alt={`商品圖 ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  
                  <div className="absolute top-2 right-2 flex">
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-1">
                      <Trash2 size={14} />
                    </button>
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-1">
                      <Scissors size={14} />
                    </button>
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right sidebar with zoom controls */}
        <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center pt-4">
          <button className="w-8 h-8 rounded flex items-center justify-center mb-2 hover:bg-gray-100">
            <Upload size={18} />
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center mb-2 hover:bg-gray-100">
            <Maximize size={18} />
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center mb-2 hover:bg-gray-100">
            <Minimize size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  // Header component
  const Header = () => (
    <div className="bg-amber-50 p-4 flex justify-between items-center border-b border-amber-100">
      <div className="flex items-center">
        <h1 className="font-bold text-xl mr-6">AI 商品圖設計室</h1>
        <div className="flex space-x-2">
          <div className="relative group">
            <button className="px-3 py-1 hover:bg-amber-100 rounded">檔案</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 w-32 z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">儲存</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">下載</button>
            </div>
          </div>
          <button className="p-1 hover:bg-amber-100 rounded">
            <RotateCcw size={18} />
          </button>
          <button className="p-1 hover:bg-amber-100 rounded">
            <RotateCw size={18} />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4">可用 Point 數：2.50</div>
        <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">前往儲值</button>
        <button className="bg-gray-100 px-3 py-1 rounded">查看 Point 紀錄</button>
      </div>
    </div>
  );

  // Sidebar component
  const Sidebar = ({ activePage }) => (
    <div className="w-16 bg-amber-50 border-r border-amber-100 flex flex-col items-center py-4">
      <button 
        className={`w-10 h-10 rounded flex flex-col items-center justify-center mb-6 ${activePage === 'product' ? 'bg-amber-200' : 'hover:bg-amber-100'}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M4 14L8 10L12 14L20 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="9" cy="8" r="2" fill="currentColor" />
        </svg>
        <span className="text-xs mt-1">商品圖</span>
      </button>
      
      <button className="w-10 h-10 rounded flex flex-col items-center justify-center mb-6 hover:bg-amber-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20C20 16.6863 16.4183 14 12 14C7.58172 14 4 16.6863 4 20" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-xs mt-1">我的</span>
      </button>
      
      <button className="w-10 h-10 rounded flex flex-col items-center justify-center mb-6 hover:bg-amber-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-xs mt-1">生成紀錄</span>
      </button>
      
      <button className="w-10 h-10 rounded flex flex-col items-center justify-center mb-6 hover:bg-amber-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 20V20.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-xs mt-1">免責聲明</span>
      </button>
    </div>
  );

  return currentPage === 'main' ? renderMainPage() : renderBatchModePage();
};

export default AIProductImageDesigner;