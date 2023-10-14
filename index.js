import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAS = async (keyPrefix, key, value) => {
  const prefixedKey = keyPrefix + '_' + key;
  try {
    await AsyncStorage.setItem(prefixedKey, JSON.stringify(value));
  } catch (error) {
    console.error('Error adding item '+key+' to prefix '+keyPrefix+' AsyncStorage: '+key, error);
  }
};

export const getAS = async (keyPrefix, key) => {
  const prefixedKey = keyPrefix + '_' + key;
  try {
    const item = await AsyncStorage.getItem(prefixedKey);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting item '+key+' from prefix '+keyPrefix+' AsyncStorage:', error);
    return null;
  }
};

export const removeAS = async (keyPrefix, key) => {
  const prefixedKey = keyPrefix + '_' + key;
  try {
    await AsyncStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error('Error removing item '+key+' from prefix '+keyPrefix+' AsyncStorage:', error);
  }
};

export const removeAllAS = async (keyPrefix) => {
  try {
    const keysToRemove = await AsyncStorage.getAllKeys();
    const keysWithPrefix = keysToRemove.filter(key => key.startsWith(keyPrefix));
    await AsyncStorage.multiRemove(keysWithPrefix);
  } catch (error) {
    console.error('Error removing all items from prefix '+keyPrefix+' AsyncStorage:', error);
  }
};