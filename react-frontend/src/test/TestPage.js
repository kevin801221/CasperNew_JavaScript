import React, { useState, useRef } from 'react';
import { testRemoveBackground, testReplaceBackground, testBatchRemoveBackground } from './testRemoveBg';
import { removeBackgroundAPI, replaceBackgroundAPI } from '../utils/apiService';

/**
 * 測試頁面組件
 * 用於測試 remove.bg API 功能
 */
const TestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userBackground, setUserBackground] = useState(null);
  const [customResult, setCustomResult] = useState(null);
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  // 運行去背測試
  const runRemoveBackgroundTest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setActiveTest('remove-bg');
    
    try {
      // 清除之前的測試結果
      const prevResult = document.getElementById('remove-bg');
      if (prevResult) prevResult.remove();
      
      await testRemoveBackground();
    } catch (err) {
      console.error('去背測試失敗:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 運行背景替換測試
  const runReplaceBackgroundTest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setActiveTest('replace-bg');
    
    try {
      // 清除之前的測試結果
      const prevResult = document.getElementById('replace-bg');
      if (prevResult) prevResult.remove();
      
      await testReplaceBackground();
    } catch (err) {
      console.error('背景替換測試失敗:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 運行批量去背測試
  const runBatchRemoveBackgroundTest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setActiveTest('batch-remove');
    
    try {
      // 清除之前的測試結果
      const prevResult = document.getElementById('batch-results');
      if (prevResult) prevResult.remove();
      
      await testBatchRemoveBackground();
    } catch (err) {
      console.error('批量去背測試失敗:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 處理上傳圖片
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImage(file);
      // 創建一個預覽 URL
      const imageUrl = URL.createObjectURL(file);
      
      // 顯示預覽
      const previewContainer = document.getElementById('image-preview');
      if (previewContainer) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '200px';
        img.style.border = '1px solid #ddd';
        img.style.borderRadius = '4px';
        
        // 清除之前的預覽
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
      }
    }
  };
  
  // 處理上傳背景圖片
  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserBackground(file);
      // 創建一個預覽 URL
      const imageUrl = URL.createObjectURL(file);
      
      // 顯示預覽
      const previewContainer = document.getElementById('background-preview');
      if (previewContainer) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '200px';
        img.style.border = '1px solid #ddd';
        img.style.borderRadius = '4px';
        
        // 清除之前的預覽
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
      }
    }
  };
  
  // 處理自定義圖片去背
  const handleCustomRemoveBackground = async () => {
    if (!userImage || isLoading) return;
    
    setIsLoading(true);
    setActiveTest('custom-remove');
    
    try {
      // 清除之前的結果
      const prevResult = document.getElementById('custom-result');
      if (prevResult) prevResult.remove();
      
      // 調用 API 進行去背
      const result = await removeBackgroundAPI(userImage);
      setCustomResult(result);
      
      // 顯示結果
      displayCustomResult(userImage, result);
    } catch (err) {
      console.error('自定義圖片去背失敗:', err);
      alert('去背失敗: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 處理自定義背景替換
  const handleCustomReplaceBackground = async () => {
    if (!userImage || !userBackground || isLoading) return;
    
    setIsLoading(true);
    setActiveTest('custom-replace');
    
    try {
      // 清除之前的結果
      const prevResult = document.getElementById('custom-result');
      if (prevResult) prevResult.remove();
      
      // 調用 API 進行背景替換
      const result = await replaceBackgroundAPI(userImage, userBackground);
      setCustomResult(result);
      
      // 顯示結果
      displayCustomResult(userImage, result, userBackground);
    } catch (err) {
      console.error('自定義背景替換失敗:', err);
      alert('背景替換失敗: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 顯示自定義結果
  const displayCustomResult = (originalImage, resultImage, backgroundImage = null) => {
    // 創建結果容器
    const resultContainer = document.createElement('div');
    resultContainer.id = 'custom-result';
    resultContainer.style.margin = '20px 0';
    resultContainer.style.padding = '20px';
    resultContainer.style.border = '1px solid #ccc';
    resultContainer.style.borderRadius = '5px';
    resultContainer.style.backgroundColor = '#f9f9f9';
    
    // 添加標題
    const title = document.createElement('h2');
    title.textContent = backgroundImage ? '自定義背景替換結果' : '自定義去背結果';
    resultContainer.appendChild(title);
    
    // 創建圖片容器
    const imagesContainer = document.createElement('div');
    imagesContainer.style.display = 'flex';
    imagesContainer.style.flexWrap = 'wrap';
    imagesContainer.style.gap = '20px';
    
    // 添加原始圖片
    const originalContainer = document.createElement('div');
    const originalTitle = document.createElement('h3');
    originalTitle.textContent = '原始圖片:';
    originalContainer.appendChild(originalTitle);
    
    const originalImg = document.createElement('img');
    originalImg.src = URL.createObjectURL(originalImage);
    originalImg.style.maxWidth = '250px';
    originalImg.style.border = '1px solid #ddd';
    originalContainer.appendChild(originalImg);
    imagesContainer.appendChild(originalContainer);
    
    // 如果有背景圖片，添加背景圖片
    if (backgroundImage) {
      const bgContainer = document.createElement('div');
      const bgTitle = document.createElement('h3');
      bgTitle.textContent = '背景圖片:';
      bgContainer.appendChild(bgTitle);
      
      const bgImg = document.createElement('img');
      bgImg.src = URL.createObjectURL(backgroundImage);
      bgImg.style.maxWidth = '250px';
      bgImg.style.border = '1px solid #ddd';
      bgContainer.appendChild(bgImg);
      imagesContainer.appendChild(bgContainer);
    }
    
    // 添加處理後的圖片
    const processedContainer = document.createElement('div');
    const processedTitle = document.createElement('h3');
    processedTitle.textContent = '處理後的圖片:';
    processedContainer.appendChild(processedTitle);
    
    const resultImg = document.createElement('img');
    resultImg.src = resultImage;
    resultImg.style.maxWidth = '250px';
    resultImg.style.border = '1px solid #ddd';
    processedContainer.appendChild(resultImg);
    imagesContainer.appendChild(processedContainer);
    
    // 添加到主容器
    resultContainer.appendChild(imagesContainer);
    
    // 添加到頁面
    const resultsArea = document.getElementById('test-results');
    resultsArea.appendChild(resultContainer);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Remove.bg API 測試頁面</h1>
      
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button 
          className={`px-6 py-3 rounded font-medium transition-colors ${activeTest === 'remove-bg' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
          onClick={runRemoveBackgroundTest}
          disabled={isLoading}
        >
          {isLoading && activeTest === 'remove-bg' ? '測試中...' : '測試去背功能'}
        </button>
        
        <button 
          className={`px-6 py-3 rounded font-medium transition-colors ${activeTest === 'replace-bg' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
          onClick={runReplaceBackgroundTest}
          disabled={isLoading}
        >
          {isLoading && activeTest === 'replace-bg' ? '測試中...' : '測試背景替換功能'}
        </button>
        
        <button 
          className={`px-6 py-3 rounded font-medium transition-colors ${activeTest === 'batch-remove' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
          onClick={runBatchRemoveBackgroundTest}
          disabled={isLoading}
        >
          {isLoading && activeTest === 'batch-remove' ? '測試中...' : '測試批量去背功能'}
        </button>
      </div>
      
      {/* 上傳自定義圖片的區域 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-center">上傳自定義圖片測試</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 上傳前景圖片 */}
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-3">上傳前景圖片</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="mb-3 w-full p-2 border rounded"
            />
            <div id="image-preview" className="min-h-[100px] flex items-center justify-center border rounded p-2 bg-gray-50">
              <p className="text-gray-500">預覽圖片將顯示在這裡</p>
            </div>
          </div>
          
          {/* 上傳背景圖片 */}
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-3">上傳背景圖片 (可選)</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleBackgroundUpload}
              ref={bgFileInputRef}
              className="mb-3 w-full p-2 border rounded"
            />
            <div id="background-preview" className="min-h-[100px] flex items-center justify-center border rounded p-2 bg-gray-50">
              <p className="text-gray-500">預覽圖片將顯示在這裡</p>
            </div>
          </div>
        </div>
        
        {/* 自定義測試按鈕 */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          <button 
            className={`px-6 py-3 rounded font-medium transition-colors ${activeTest === 'custom-remove' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            onClick={handleCustomRemoveBackground}
            disabled={isLoading || !userImage}
          >
            {isLoading && activeTest === 'custom-remove' ? '處理中...' : '去除圖片背景'}
          </button>
          
          <button 
            className={`px-6 py-3 rounded font-medium transition-colors ${activeTest === 'custom-replace' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            onClick={handleCustomReplaceBackground}
            disabled={isLoading || !userImage || !userBackground}
          >
            {isLoading && activeTest === 'custom-replace' ? '處理中...' : '替換圖片背景'}
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="my-8 p-6 bg-gray-100 rounded-lg text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
            <p className="text-lg font-medium">正在測試 API，請稍候...</p>
            <p className="text-gray-500 mt-2">根據網絡狀況，這可能需要幾秒鐘的時間</p>
          </div>
        </div>
      )}
      
      <div id="test-results" className="mt-6">
        {/* 測試結果會動態添加到這裡 */}
      </div>
      
      <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">使用說明</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>去背功能</strong>: 測試基本的圖片去背功能，使用 remove.bg API 移除圖片背景。</li>
          <li><strong>背景替換功能</strong>: 測試先去除圖片背景，然後替換為新的背景圖片。</li>
          <li><strong>批量去背功能</strong>: 測試同時處理多張圖片的去背功能。</li>
          <li><strong>自定義圖片測試</strong>: 上傳自己的圖片進行去背或背景替換測試。</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
