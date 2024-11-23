// src/utils/preferencesUtil.ts
import { Preferences } from '@capacitor/preferences';

export const setName = async (key_name:string,name: string) => {
  try {
    await Preferences.set({
      key: key_name,
      value: name,
    });
    //console.log('Name saved successfully');
  } catch (error) {
    console.error('Error setting name:', error);
  }
};

export const checkName = async (key_name:string): Promise<string | null> => {
  try {
    const { value } = await Preferences.get({ key: key_name });
    if (value) {
      //console.log(`Hello ${value}!`);
    }
    return value;
  } catch (error) {
    console.error('Error getting name:', error);
    return null;
  }
};

export const removeName = async (key_name:string) => {
  try {
    await Preferences.remove({ key: key_name });
    //console.log('Name removed successfully');
  } catch (error) {
    console.error('Error removing name:', error);
  }
};
