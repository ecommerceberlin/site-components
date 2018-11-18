import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames'
import {translate} from '../i18n'
import { withStyles } from '@material-ui/core/styles';

const styles = {

}

const SearchResults = () => (

<div>Results</div>

)



SearchResults.defaultProps = {
    label: 'common.search'
  };
  
  const enhance = compose(
    withStyles(styles),
    connect(
      (state) => ({oldLocale : state.app.locale}),
        null
    ),
    translate
  );
  
  export default enhance(SearchResults);
  