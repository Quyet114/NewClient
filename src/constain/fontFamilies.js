import AsyncStorage from '@react-native-async-storage/async-storage';


export const COLOR = {
  D:'#000000',
  T:'#FFFFFF',
  G:'#EEEEEE'
}

export const FONT = {
  primary:'CaveatBrush-Regular'
}
export const loadFontFromAsyncStorage = async () => {
  try {
    const storedFont = await AsyncStorage.getItem('selectedFont');
    FONT.primary = storedFont ? `${storedFont}` : 'Default-Font';
  } catch (error) {
    console.error('Failed to load the font from AsyncStorage:', error);
    FONT.primary = 'Default-Font';
  }
};

export const getDateAndDay = (createdAt)=> {
  const date = new Date(createdAt);

  // Lấy ngày và thứ theo tiếng Anh
  const day = date.toLocaleDateString('en-US', { weekday: 'long' }); // Ví dụ: "Sunday"
  const dayOfMonth = date.getDate(); // Ví dụ: 1, 2, 3, ...
  const month = date.toLocaleDateString('en-US', { month: 'long' }); // Ví dụ: "September"
  const year = date.getFullYear(); // Ví dụ: 2024

  return `${month} ${dayOfMonth}, ${year}`;
}
export const DateOfTimePost = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
      return `${diffDays} days`;
  } else if (diffHours > 0) {
      return `${diffHours} hours`;
  } else if (diffMinutes > 0) {
      return `${diffMinutes} minutes`;
  } else {
      return `Recently`;
  }
};
export function formatNumber(number) {
  if (number < 1000) {
      return number.toString();
  } else if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
}
export const theme ={
  bgwhite : opacity => `rgba(255,255,255,${opacity})`,
  bgblack : opacity => `rgba(0,0,0,${opacity})`
}
export const convertNumToTime = (num) => {
  // Tính số giờ, phút và giây
  const hours = Math.floor(num / 3600);
  const minutes = Math.floor((num % 3600) / 60);
  const seconds = Math.floor(num % 60);

  // Định dạng số giờ, phút và giây với 2 chữ số
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Trả về chuỗi định dạng hh:mm:ss
  return `${formattedMinutes}:${formattedSeconds}`;
};
export const weatherKey = '71665a7e8bed45aeaae92847241608';