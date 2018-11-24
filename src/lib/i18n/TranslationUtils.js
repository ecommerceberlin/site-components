import { DEFAULT_LOCALE } from './constants';

const resolveBrowserLocale = (defaultLocale = DEFAULT_LOCALE) => {

  if(typeof window !== "undefined"){
      // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
      // Rely on the window.navigator object to determine user locale
      const { language, browserLanguage, userLanguage } = window.navigator;
      return (language || browserLanguage || userLanguage || defaultLocale).split(
      '-'
      )[0];
  }
 
};

export default resolveBrowserLocale;
