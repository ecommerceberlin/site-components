import { Context } from './TranslationProvider';

function enhanceWithTranslate(Component) {
  return function TranslatedComponent(props) {
    return (
      <Context.Consumer>
        {({ translate, locale }) => (
          <Component {...props} translate={translate} locale={locale} />
        )}
      </Context.Consumer>
    );
  };
}

export default enhanceWithTranslate;
