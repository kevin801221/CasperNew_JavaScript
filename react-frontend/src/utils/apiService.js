/**
 * API 服務工具
 * 用於處理與 remove.bg API 的通信
 */

// remove.bg API 基礎 URL
const API_BASE_URL = 'https://api.remove.bg/v1.0';

// API Key - 直接使用硬編碼的方式，確保在開發環境中可以正常使用
const API_KEY = 'Khr1wiotNPuDyqQZxpzNKTsZ';

/**
 * 發送去背請求到 remove.bg API
 * @param {File|Blob|string} image - 圖片文件、Blob 或 URL
 * @returns {Promise<string>} 去背後的圖片 Base64 字符串
 */
export const removeBackgroundAPI = async (image) => {
  try {
    console.log('開始處理去背請求，圖片類型:', typeof image);
    
    // 創建 FormData 對象
    const formData = new FormData();
    
    // 設置圖片大小參數
    formData.append('size', 'auto');
    
    // 根據圖片類型選擇不同的處理方式
    if (typeof image === 'string') {
      // 如果是本地檔案路徑，先轉換為完整 URL
      if (image.startsWith('/') && !image.startsWith('//')) {
        const origin = window.location.origin;
        image = `${origin}${image}`;
      }
      
      if (image.startsWith('data:')) {
        // 如果是 base64 圖片
        console.log('處理 base64 圖片');
        formData.append('image_file_b64', image.split(',')[1]);
      } else if (image.startsWith('http') || image.startsWith('//')) {
        // 如果是 URL
        console.log('處理 URL 圖片:', image);
        formData.append('image_url', image);
      } else {
        console.error('不支持的圖片格式:', image);
        throw new Error('不支持的圖片格式');
      }
    } else if (image instanceof Blob || image instanceof File) {
      // 如果是 Blob 或 File 對象
      console.log('處理 Blob/File 圖片');
      formData.append('image_file', image);
    } else {
      console.error('不支持的圖片類型:', image);
      throw new Error('不支持的圖片類型');
    }
    
    console.log('發送請求到 remove.bg API');
    
    // 發送請求到 remove.bg API
    const response = await fetch(`${API_BASE_URL}/removebg`, {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API 請求失敗: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
    }
    
    console.log('API 請求成功，正在處理響應');
    
    // 獲取二進制數據
    const arrayBuffer = await response.arrayBuffer();
    
    // 轉換為 base64
    const base64 = arrayBufferToBase64(arrayBuffer);
    
    console.log('去背處理完成，返回 base64 圖片');
    
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('去背 API 調用失敗:', error);
    throw error;
  }
};

/**
 * 將 ArrayBuffer 轉換為 base64 字符串
 * @param {ArrayBuffer} buffer - 要轉換的 ArrayBuffer
 * @returns {string} base64 字符串（不包含 data URL 前綴）
 */
const arrayBufferToBase64 = (buffer) => {
  try {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    return window.btoa(binary);
  } catch (error) {
    console.error('轉換 ArrayBuffer 到 base64 失敗:', error);
    throw error;
  }
};



/**
 * 發送批量去背請求到 API
 * @param {Array<File|Blob|string>} images - 圖片文件、Blob 或 URL 的數組
 * @returns {Promise<Array<string>>} 去背後的圖片 Base64 數組
 */
export const batchRemoveBackgroundAPI = async (images) => {
  try {
    // remove.bg 不直接支持批量處理，所以我們並行處理多個請求
    // 為了避免同時發送太多請求，我們使用 Promise.all 但限制並行數
    const batchSize = 3; // 每批處理的圖片數量
    const results = [];
    
    // 分批處理
    for (let i = 0; i < images.length; i += batchSize) {
      const batch = images.slice(i, i + batchSize);
      const batchPromises = batch.map(image => removeBackgroundAPI(image));
      
      // 等待當前批次完成
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // 如果還有更多圖片要處理，添加延遲以避免 API 限制
      if (i + batchSize < images.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // 返回處理後的圖片 URL 數組
    return results;
  } catch (error) {
    console.error('批量去背 API 調用失敗:', error);
    throw error;
  }
};

/**
 * 發送背景替換請求到 API
 * @param {File|Blob|string} image - 圖片文件、Blob 或 URL
 * @param {File|Blob|string} background - 背景圖片文件、Blob 或 URL
 * @returns {Promise<string>} 處理後的圖片 URL
 */
export const replaceBackgroundAPI = async (image, background) => {
  try {
    // 首先去除背景
    const transparentImage = await removeBackgroundAPI(image);
    
    // 將透明背景的圖片轉換為 Blob
    const response = await fetch(transparentImage);
    const imageBlob = await response.blob();
    
    // 使用 Canvas 合成新圖片
    const compositeImage = await compositeImages(imageBlob, background);
    
    return compositeImage;
  } catch (error) {
    console.error('背景替換 API 調用失敗:', error);
    throw error;
  }
};

/**
 * 使用 Canvas 將兩張圖片合成
 * @param {Blob} foreground - 前景圖片（已去背）
 * @param {string} background - 背景圖片 URL
 * @returns {Promise<string>} 合成後的圖片 base64 字符串
 */
const compositeImages = async (foreground, background) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('開始合成圖片...');
      console.log('前景圖片類型:', typeof foreground);
      console.log('背景圖片類型:', typeof background);
      
      // 創建兩個 Image 對象
      const fgImage = new Image();
      const bgImage = new Image();
      
      // 設置跨域屬性
      fgImage.crossOrigin = 'anonymous';
      bgImage.crossOrigin = 'anonymous';
      
      // 加載前景圖片
      fgImage.onload = () => {
        console.log('前景圖片加載成功，尺寸:', fgImage.width, 'x', fgImage.height);
        
        // 前景加載完成後，加載背景
        try {
          if (typeof background === 'string') {
            if (background.startsWith('data:')) {
              console.log('加載 data URL 背景');
              bgImage.src = background;
            } else if (background.startsWith('http') || background.startsWith('//')) {
              console.log('加載網絡背景 URL:', background);
              // 使用代理服務來避免 CORS 問題
              const proxyUrl = `https://cors-anywhere.herokuapp.com/${background}`;
              bgImage.src = proxyUrl;
            } else {
              console.log('加載本地背景 URL');
              bgImage.src = background;
            }
          } else if (background instanceof Blob || background instanceof File) {
            console.log('加載 Blob/File 背景');
            bgImage.src = URL.createObjectURL(background);
          } else {
            throw new Error('不支持的背景圖片類型');
          }
        } catch (err) {
          console.error('加載背景圖片時出錯:', err);
          reject(err);
        }
      };
      
      // 背景加載完成後，進行合成
      bgImage.onload = () => {
        console.log('背景圖片加載成功，尺寸:', bgImage.width, 'x', bgImage.height);
        
        try {
          // 創建 Canvas 元素
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // 設置 Canvas 尺寸為前景圖片的尺寸
          canvas.width = fgImage.width;
          canvas.height = fgImage.height;
          console.log('Canvas 尺寸設置為:', canvas.width, 'x', canvas.height);
          
          // 繪製背景（調整大小以適應 Canvas）
          ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
          console.log('背景已繪製到 Canvas');
          
          // 繪製前景
          ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);
          console.log('前景已繪製到 Canvas');
          
          // 轉換為 base64
          const result = canvas.toDataURL('image/png');
          console.log('合成完成，結果長度:', result.length);
          
          // 如果背景是 Blob URL，釋放它
          if (background instanceof Blob || background instanceof File) {
            URL.revokeObjectURL(bgImage.src);
          }
          
          // 如果前景是 Blob URL，釋放它
          if (foreground instanceof Blob) {
            URL.revokeObjectURL(fgImage.src);
          }
          
          resolve(result);
        } catch (err) {
          console.error('合成圖片時出錯:', err);
          reject(err);
        }
      };
      
      // 設置錯誤處理
      fgImage.onerror = (err) => {
        console.error('加載前景圖片失敗:', err);
        reject(new Error('加載前景圖片失敗'));
      };
      
      bgImage.onerror = (err) => {
        console.error('加載背景圖片失敗:', err);
        reject(new Error('加載背景圖片失敗'));
      };
      
      // 開始加載前景
      try {
        console.log('開始加載前景圖片...');
        if (foreground instanceof Blob) {
          console.log('加載 Blob 前景');
          fgImage.src = URL.createObjectURL(foreground);
        } else if (typeof foreground === 'string') {
          console.log('加載字符串前景:', foreground.substring(0, 50) + '...');
          fgImage.src = foreground;
        } else {
          throw new Error('不支持的前景圖片類型');
        }
      } catch (err) {
        console.error('設置前景圖片時出錯:', err);
        reject(err);
      }
    } catch (error) {
      console.error('合成圖片過程中出錯:', error);
      reject(error);
    }
  });
};
