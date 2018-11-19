import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Context } from './TranslationProvider';

const Translate = props => (
  <Context.Consumer>
    {({ translate, locale }) => props.children({ translate, locale })}
  </Context.Consumer>
);

export default Translate;
