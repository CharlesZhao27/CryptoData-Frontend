//format bigDecimal to 2 decimal number
export function formatNumberToTwoDecimalPlace(num) {
  if (num) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  } else {
    return "N/A";
  }
}

// Format BigDecimal to integer with 0 decimal places
export function formatBigDecimalAsInteger(num) {
  if (num === null || num === undefined) {
    return "N/A";
  }

  const options = { maximumFractionDigits: 0, minimumFractionDigits: 0 };
  return new Intl.NumberFormat("en-US", options).format(num);
}

//format with Units
export function formatNumberWithUnits(num) {
  const units = ["", "Thousand", "Million", "Billion", "Trillion"];
  let unitIndex = 0;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return `${num.toFixed(2)} ${units[unitIndex]}`;
}

//format bigDecimal to 2 decimal number or 6 decimal number
export function formatNumber(num) {
  if (num === null || num === undefined) {
    return "N/A";
  }
  let options;
  if (num > 0 && num <= 1) {
    options = { maximumFractionDigits: 6, minimumFractionDigits: 6 };
  } else {
    options = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  }
  return new Intl.NumberFormat("en-US", options).format(num);
}

//format TimeStamp to YYYY-MM-dd HH:MM:SS form
export function formatTimestamp(originalTimestamp) {
    const originalDate = new Date(originalTimestamp);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = originalDate.getDate().toString().padStart(2, '0');
    const hours = originalDate.getHours().toString().padStart(2, '0');
    const minutes = originalDate.getMinutes().toString().padStart(2, '0');
    const seconds = originalDate.getSeconds().toString().padStart(2, '0');
  
    // Construct the formatted timestamp
    const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedTimestamp;
  }