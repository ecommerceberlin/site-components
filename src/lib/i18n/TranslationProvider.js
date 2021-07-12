import React, { Children } from 'react';
import Polyglot from 'node-polyglot';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

export const Context = React.createContext({ translate: key => key });

const TranslationProvider = ({ children }) => {

  const router = useRouter();
  const selectedLocale = useSelector(state=>state.app.locale)
  const messages = useSelector(state=>state.resources.texts)

  const locale = selectedLocale || router.locale || router.defaultLocale

  const polyglot = new Polyglot({
    locale,
    phrases: locale in messages ? messages[locale] : messages[router.defaultLocale || "en"],
    onMissingKey: (key, options, locale) => key
  });

  return (
    <Context.Provider
      value={{ locale: locale, translate: polyglot.t.bind(polyglot) }}
    >
      {children}
    </Context.Provider>
  );
};



export default TranslationProvider
