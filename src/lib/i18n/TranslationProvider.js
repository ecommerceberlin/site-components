import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'

export const Context = React.createContext({ translate: key => key });

const TranslationProvider = ({ locale, messages, children }) => {

  const router = useRouter();

  const {defaultLocale, locales} = router;

  const polyglot = new Polyglot({
    locale,
    phrases: locale in messages ? messages[locale] : messages[defaultLocale || "en"],
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

TranslationProvider.defaultProps = {
  messages : {},
}

const mapStateToProps = state => ({
  locale: state.app.locale,
  messages: state.resources.texts
});

export default connect(mapStateToProps)(TranslationProvider);
