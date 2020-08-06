import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';

export const Context = React.createContext({ translate: key => key });

const TranslationProvider = ({ locale, defaultLocale, messages, children }) => {
  const polyglot = new Polyglot({
    locale,
    phrases: locale in messages ? messages[locale] : messages[defaultLocale]
    //onMissingKey : () => ()
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
  locale : "en",
  messages : {},
  defaultLocale : "en",
}

const mapStateToProps = state => ({
  locale: state.app.locale,
  messages: state.resources.texts
});

export default connect(mapStateToProps)(TranslationProvider);
