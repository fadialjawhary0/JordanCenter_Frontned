/**
 * Formats a number with thousand separators
 * @param {number|string} num - The number to format
 * @returns {string} Formatted number string (e.g., "1,000" instead of "1000")
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || num === '') {
    return '';
  }

  // Convert to string and extract number part (handles strings like "1,000+" or "1,000 products")
  const numStr = String(num);
  
  // Extract numeric part (handles cases like "1,000+", "1,000 products", etc.)
  const match = numStr.match(/([\d,]+)/);
  if (!match) {
    return numStr; // Return original if no number found
  }

  const numericPart = match[1].replace(/,/g, ''); // Remove existing commas
  const number = parseFloat(numericPart);
  
  if (isNaN(number)) {
    return numStr; // Return original if not a valid number
  }

  // Format the number with commas
  const formatted = number.toLocaleString('en-US');
  
  // Preserve any suffix (like "+", " products", etc.)
  const suffix = numStr.substring(match[0].length);
  
  return formatted + suffix;
};

/**
 * Extracts numeric value from a string (removes formatting and suffixes)
 * @param {number|string} num - The number to extract
 * @returns {number} Extracted numeric value
 */
export const extractNumber = (num) => {
  if (typeof num === 'number') {
    return num;
  }
  
  if (!num) {
    return 0;
  }

  const numStr = String(num);
  const match = numStr.match(/([\d,]+)/);
  if (!match) {
    return 0;
  }

  const numericPart = match[1].replace(/,/g, '');
  return parseFloat(numericPart) || 0;
};

