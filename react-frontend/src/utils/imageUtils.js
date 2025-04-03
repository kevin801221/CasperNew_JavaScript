/**
 * 圖片處理工具函數庫
 */

/**
 * 將 File 對象轉換為 Data URL
 * @param {File} file - 圖片文件
 * @returns {Promise<string>} 圖片的 Data URL
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * 將 Data URL 轉換為 Blob 對象
 * @param {string} dataURL - 圖片的 Data URL
 * @returns {Blob} 圖片的 Blob 對象
 */
export const dataURLToBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * 下載圖片
 * @param {string} url - 圖片 URL 或 Data URL
 * @param {string} filename - 下載的文件名
 * @param {string} [format='png'] - 下載的文件格式 ('png', 'jpg', 'pdf')
 */
export const downloadImage = (url, filename, format = 'png') => {
  // 創建一個臨時的 a 元素用於下載
  const link = document.createElement('a');
  
  // 如果是 Data URL，直接使用；否則需要先獲取圖片數據
  if (url.startsWith('data:')) {
    link.href = url;
  } else {
    // 對於外部 URL，可能需要先將圖片繪製到 Canvas 上
    // 這裡簡化處理，直接使用原始 URL
    link.href = url;
  }
  
  // 設置文件名和擴展名
  link.download = `${filename}.${format}`;
  
  // 模擬點擊下載
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 調整圖片大小
 * @param {string} src - 圖片 URL 或 Data URL
 * @param {number} maxWidth - 最大寬度
 * @param {number} maxHeight - 最大高度
 * @param {number} [quality=0.8] - 圖片質量 (0-1)
 * @returns {Promise<string>} 調整大小後的圖片 Data URL
 */
export const resizeImage = (src, maxWidth, maxHeight, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // 計算新的尺寸，保持原始比例
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // 創建 Canvas 並繪製調整大小後的圖片
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // 轉換為 Data URL
      const dataURL = canvas.toDataURL('image/jpeg', quality);
      resolve(dataURL);
    };
    
    img.onerror = (error) => reject(error);
    img.src = src;
  });
};

/**
 * 檢查文件是否為有效的圖片
 * @param {File} file - 要檢查的文件
 * @returns {boolean} 是否為有效的圖片
 */
export const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  return file && validTypes.includes(file.type);
};

/**
 * 獲取圖片的主要顏色
 * @param {string} src - 圖片 URL 或 Data URL
 * @returns {Promise<string>} 圖片的主要顏色 (十六進制格式)
 */
export const getDominantColor = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // 創建一個小型 Canvas 用於分析顏色
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 使用較小的尺寸以提高性能
      canvas.width = 50;
      canvas.height = 50;
      
      ctx.drawImage(img, 0, 0, 50, 50);
      
      // 獲取像素數據
      const imageData = ctx.getImageData(0, 0, 50, 50).data;
      
      // 計算顏色頻率
      const colorCounts = {};
      let dominantColor = '#FFFFFF';
      let maxCount = 0;
      
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        
        // 忽略透明像素
        if (imageData[i + 3] < 128) continue;
        
        // 將顏色轉換為十六進制格式
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        
        if (colorCounts[hex] > maxCount) {
          maxCount = colorCounts[hex];
          dominantColor = hex;
        }
      }
      
      resolve(dominantColor);
    };
    
    img.onerror = (error) => reject(error);
    img.src = src;
  });
};
