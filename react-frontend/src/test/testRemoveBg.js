/**
 * Remove.bg API 測試文件
 * 用於直接測試 API 功能，不依賴於 React 組件
 */

// 導入 API 函數
import { removeBackgroundAPI, replaceBackgroundAPI, batchRemoveBackgroundAPI } from '../utils/apiService';

// 測試用的示例圖片 URL (使用一個公開的測試圖片)
const TEST_IMAGE_URL = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop';
const TEST_PRODUCT_URL = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'; // 運動鞋

// 測試用的背景圖片 URL
// 使用 data URL 以避免 CORS 問題
const TEST_BACKGROUND_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADIAMgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAwQBAgUABgf/xAA0EAACAgEDAwMDAwIFBQEAAAABAgMRAAQSIQUxQRNRYQYicRQygUKRFSOhscEHJDNS0fD/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAAICAwEAAwEBAAAAAAAAAQIRAyESMUEEIjJRYRP/2gAMAwEAAhEDEQA/APnMdQCQOQDjEEbSsABZ8DFYoWdwqjk4/HCkCBVHHk+Tkb0rXZKKJYwGUE+5xmNQqgKABiMUZB3HsO2MxRlmAA5OGzk0vGgVQB2GKaohYwPfNLTxbRfk4rqY9shPvjl2Vx0zTGRzWKyRkHNCSPg0MXeE+2a45bYZYaAZCO+KyRDNCSI1wMXeI+M1mTHLFnvEfGLSRnNCSM+2LyR++aTJjliynjOLSR++MvGcXdDmkrLKIFcXkTGnQ4u6HNJWVjPpnOo4y6nF3XNJWVjJXOo4yy9s6sNlYXacg7TkEbDkbYqABZOOQRGRwo7ZCKWYAd8aijCKAO2RllIYhjCqAO2EjjJIAGNRRE0WFDJt01xxLRRE0WFDJjjvk4xHGWYADNDTRBQCRyc5srqujjjsrFEWYADNHTxBVBIyunhG0EjNHTxjaAR3zLLLbfHHQkUQVQAMZ0sQZgCO+TDENoJHfNDSQjaAR3zLK7b44aHiiG0EjvmhpYhtBI74eGIbQSO+aOliG0EjvmOV26MMdM3SxDaCR3zS0sQ2gkd8PBENoJHfNLSxDaCR3zHK7dGGOmVpYhtBI75p6WIbQSO+HgiG0EjvmlpYhtBI75jldt8cdMnSxDaCR3zU0sQ2gkd8PBEN1EjvmppYhupRZzHK7dGGOmRpYhtBI75q6WIbQSO+GgiG0EjvmtpYRtBI75jldt8cdMbSxDaCR3zX0sQ2gkd8PBEN1EjvmxpYRtBI75jldt8cdMTSxDaCR3zZ0sQ2gkd8PBEN1EjvmzpYRtBI75jldt8cdMPSxDaCR3zZ0sQ2gkd8PBEN1EjvmzpYRtBI75jldt8cdMHSxDaCR3za0sQ2gkd8PBEN1EjvmzpYRtBI75jldt8cdMDSxDaCR3za0sQ2gkd8PBEN1EjvmzpYRtBI75jldt8cdPP6WIbQSO+bWliG0EjvgIIhtBI75taWEbQSO+Y5Xbo4zpiaWIbQSO+belh+0Ejvh9PEN1Ed82tLCNoJHfMcrtvjjpg6aIbQSO+b2lh+0Ejvh9NCNoJHfN7Sw/aCR3zHK7dHHNPP6aIbQSO+cM3tLD9oJHfOzHbf8A89PGRRl2CqOTj0EJdgFHJxvTQFiCRwO+NhVjUKo4GY5ZadPHx7LaaAsQSPtHfGoYizAKOTnRoXYKByca08BZgCOB3yLltpMdAaeAsQSPtHfGYIS7AKOTjoRY1CqOBjMMJdgFHJyLltcx0BDBuYBRyca08G9gCOB3w0MJdgFHJxqGEswCjk5FyVMdA6eDeQCOB3xuGEuwCjk4eGEswCjk41DCWYBRycjyqvECGEswCjk41DCXYBRycNDCWYBRycahgLMAByci5KmOgYYSzAKOTjUMJdgFHJw8MJZgFHJxqGAswAHJyLkqY6BhhLMAo5ONQwl2AUcnDwwlmAUcnGoYCzAAcnIuSpjoGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvEGGEswCjk41DCXYBRycPDCWYBRycahgLMABycjyqvE//Z';

/**
 * 測試 remove.bg API 功能
 */
async function testRemoveBackground() {
  console.log('開始測試 remove.bg API...');
  
  try {
    // 測試 URL 圖片去背
    console.log('測試 URL 圖片去背...');
    const result = await removeBackgroundAPI(TEST_IMAGE_URL);
    console.log('去背成功！結果是一個 base64 字符串，長度為:', result.length);
    
    // 在頁面上顯示結果
    displayResult('remove-bg', TEST_IMAGE_URL, result, '去背測試');
    
    return result;
  } catch (error) {
    console.error('測試失敗:', error);
    displayError(error, '去背測試');
    throw error;
  }
}

/**
 * 測試背景替換 API 功能
 */
async function testReplaceBackground() {
  console.log('開始測試背景替換 API...');
  
  try {
    // 先去除背景，然後替換新背景
    console.log('測試背景替換...');
    const result = await replaceBackgroundAPI(TEST_PRODUCT_URL, TEST_BACKGROUND_URL);
    console.log('背景替換成功！結果是一個 base64 字符串，長度為:', result.length);
    
    // 在頁面上顯示結果
    displayBackgroundReplaceResult(TEST_PRODUCT_URL, TEST_BACKGROUND_URL, result);
    
    return result;
  } catch (error) {
    console.error('背景替換測試失敗:', error);
    displayError(error, '背景替換測試');
    throw error;
  }
}

/**
 * 測試批量去背 API 功能
 */
async function testBatchRemoveBackground() {
  console.log('開始測試批量去背 API...');
  
  try {
    // 測試批量去背
    const imageUrls = [TEST_IMAGE_URL, TEST_PRODUCT_URL];
    console.log('測試批量去背，圖片數量:', imageUrls.length);
    
    const results = await batchRemoveBackgroundAPI(imageUrls);
    console.log('批量去背成功！結果數量:', results.length);
    
    // 在頁面上顯示結果
    displayBatchResults(imageUrls, results);
    
    return results;
  } catch (error) {
    console.error('批量去背測試失敗:', error);
    displayError(error, '批量去背測試');
    throw error;
  }
}

/**
 * 在頁面上顯示結果
 */
function displayResult(id, originalImageUrl, processedImageData, title = 'API 測試結果') {
  // 創建結果容器
  const resultContainer = document.createElement('div');
  resultContainer.id = id;
  resultContainer.style.margin = '20px';
  resultContainer.style.padding = '20px';
  resultContainer.style.border = '1px solid #ccc';
  resultContainer.style.borderRadius = '5px';
  resultContainer.style.backgroundColor = '#f9f9f9';
  
  // 添加標題
  const titleElem = document.createElement('h2');
  titleElem.textContent = title;
  resultContainer.appendChild(titleElem);
  
  // 添加原始圖片
  const originalTitle = document.createElement('h3');
  originalTitle.textContent = '原始圖片:';
  resultContainer.appendChild(originalTitle);
  
  const originalImg = document.createElement('img');
  originalImg.src = originalImageUrl;
  originalImg.style.maxWidth = '300px';
  originalImg.style.border = '1px solid #ddd';
  resultContainer.appendChild(originalImg);
  
  // 添加處理後的圖片
  const processedTitle = document.createElement('h3');
  processedTitle.textContent = '處理後的圖片:';
  resultContainer.appendChild(processedTitle);
  
  const processedImg = document.createElement('img');
  processedImg.src = processedImageData;
  processedImg.style.maxWidth = '300px';
  processedImg.style.border = '1px solid #ddd';
  resultContainer.appendChild(processedImg);
  
  // 添加到頁面
  document.body.appendChild(resultContainer);
}

/**
 * 在頁面上顯示背景替換結果
 */
function displayBackgroundReplaceResult(originalImageUrl, backgroundImageUrl, resultImageData) {
  // 創建結果容器
  const resultContainer = document.createElement('div');
  resultContainer.id = 'replace-bg';
  resultContainer.style.margin = '20px';
  resultContainer.style.padding = '20px';
  resultContainer.style.border = '1px solid #ccc';
  resultContainer.style.borderRadius = '5px';
  resultContainer.style.backgroundColor = '#f9f9f9';
  
  // 添加標題
  const title = document.createElement('h2');
  title.textContent = '背景替換測試結果';
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
  originalImg.src = originalImageUrl;
  originalImg.style.maxWidth = '250px';
  originalImg.style.border = '1px solid #ddd';
  originalContainer.appendChild(originalImg);
  imagesContainer.appendChild(originalContainer);
  
  // 添加背景圖片
  const bgContainer = document.createElement('div');
  const bgTitle = document.createElement('h3');
  bgTitle.textContent = '背景圖片:';
  bgContainer.appendChild(bgTitle);
  
  const bgImg = document.createElement('img');
  bgImg.src = backgroundImageUrl;
  bgImg.style.maxWidth = '250px';
  bgImg.style.border = '1px solid #ddd';
  bgContainer.appendChild(bgImg);
  imagesContainer.appendChild(bgContainer);
  
  // 添加處理後的圖片
  const processedContainer = document.createElement('div');
  const processedTitle = document.createElement('h3');
  processedTitle.textContent = '合成後的圖片:';
  processedContainer.appendChild(processedTitle);
  
  const resultImg = document.createElement('img');
  resultImg.src = resultImageData;
  resultImg.style.maxWidth = '250px';
  resultImg.style.border = '1px solid #ddd';
  processedContainer.appendChild(resultImg);
  imagesContainer.appendChild(processedContainer);
  
  // 添加到主容器
  resultContainer.appendChild(imagesContainer);
  
  // 添加到頁面
  document.body.appendChild(resultContainer);
}

/**
 * 在頁面上顯示批量處理結果
 */
function displayBatchResults(originalUrls, processedResults) {
  // 創建結果容器
  const resultContainer = document.createElement('div');
  resultContainer.id = 'batch-results';
  resultContainer.style.margin = '20px';
  resultContainer.style.padding = '20px';
  resultContainer.style.border = '1px solid #ccc';
  resultContainer.style.borderRadius = '5px';
  resultContainer.style.backgroundColor = '#f9f9f9';
  
  // 添加標題
  const title = document.createElement('h2');
  title.textContent = '批量去背測試結果';
  resultContainer.appendChild(title);
  
  // 創建圖片網格容器
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
  grid.style.gap = '20px';
  
  // 為每對圖片創建容器
  originalUrls.forEach((url, index) => {
    const itemContainer = document.createElement('div');
    itemContainer.style.border = '1px solid #eee';
    itemContainer.style.padding = '10px';
    itemContainer.style.borderRadius = '5px';
    
    // 添加標題
    const itemTitle = document.createElement('h3');
    itemTitle.textContent = `圖片 ${index + 1}`;
    itemTitle.style.fontSize = '16px';
    itemContainer.appendChild(itemTitle);
    
    // 原始圖片
    const originalImg = document.createElement('img');
    originalImg.src = url;
    originalImg.style.width = '100%';
    originalImg.style.marginBottom = '10px';
    originalImg.style.border = '1px solid #ddd';
    itemContainer.appendChild(originalImg);
    
    // 處理後的圖片
    if (processedResults[index]) {
      const processedImg = document.createElement('img');
      processedImg.src = processedResults[index];
      processedImg.style.width = '100%';
      processedImg.style.border = '1px solid #ddd';
      itemContainer.appendChild(processedImg);
    }
    
    grid.appendChild(itemContainer);
  });
  
  resultContainer.appendChild(grid);
  document.body.appendChild(resultContainer);
}

/**
 * 在頁面上顯示錯誤
 */
function displayError(error, testName = 'API 測試') {
  // 創建錯誤容器
  const errorContainer = document.createElement('div');
  errorContainer.style.margin = '20px';
  errorContainer.style.padding = '20px';
  errorContainer.style.border = '1px solid #f00';
  errorContainer.style.borderRadius = '5px';
  errorContainer.style.backgroundColor = '#fff0f0';
  
  // 添加標題
  const title = document.createElement('h2');
  title.textContent = `${testName}失敗`;
  title.style.color = '#f00';
  errorContainer.appendChild(title);
  
  // 添加錯誤信息
  const errorMessage = document.createElement('pre');
  errorMessage.textContent = error.toString();
  errorMessage.style.whiteSpace = 'pre-wrap';
  errorMessage.style.backgroundColor = '#f9f9f9';
  errorMessage.style.padding = '10px';
  errorMessage.style.borderRadius = '3px';
  errorContainer.appendChild(errorMessage);
  
  // 添加到頁面
  document.body.appendChild(errorContainer);
}

// 導出測試函數
export { testRemoveBackground, testReplaceBackground, testBatchRemoveBackground };
export default testRemoveBackground;
