/**
 * 檔案處理工具函數庫
 */

/**
 * 格式化檔案大小
 * @param {number} bytes - 檔案大小（位元組）
 * @param {number} [decimals=2] - 小數點位數
 * @returns {string} 格式化後的檔案大小
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * 獲取檔案擴展名
 * @param {string} filename - 檔案名稱
 * @returns {string} 檔案擴展名
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * 檢查檔案類型是否為允許的類型
 * @param {File} file - 檔案對象
 * @param {string[]} allowedTypes - 允許的 MIME 類型數組
 * @returns {boolean} 是否為允許的類型
 */
export const isAllowedFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * 檢查檔案大小是否在限制範圍內
 * @param {File} file - 檔案對象
 * @param {number} maxSizeInBytes - 最大檔案大小（位元組）
 * @returns {boolean} 是否在限制範圍內
 */
export const isFileSizeValid = (file, maxSizeInBytes) => {
  return file.size <= maxSizeInBytes;
};

/**
 * 生成唯一的檔案名
 * @param {string} originalFilename - 原始檔案名
 * @returns {string} 唯一的檔案名
 */
export const generateUniqueFilename = (originalFilename) => {
  const extension = getFileExtension(originalFilename);
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  
  return `${timestamp}-${randomString}.${extension}`;
};

/**
 * 從 URL 或路徑中提取檔案名
 * @param {string} urlOrPath - URL 或檔案路徑
 * @returns {string} 檔案名
 */
export const extractFilenameFromPath = (urlOrPath) => {
  return urlOrPath.substring(urlOrPath.lastIndexOf('/') + 1);
};
