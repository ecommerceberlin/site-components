import React from 'react';
 

import { Context } from './TranslationProvider';

const Translate = props => (
  <Context.Consumer>
    {({ translate, locale }) => props.children({ translate, locale })}
  </Context.Consumer>
);

export default Translate;
