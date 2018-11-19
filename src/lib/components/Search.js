import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {translate} from '../i18n'
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

import SearchResults from './SearchResults'

import {
  dialogShow,
  searchStarted
} from './redux/actions';


const styles = theme => ({
  selectors : {
    margin : 40,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


const Search = ({ label, classes, locale, oldLocale, dialogShow, searchStarted, translate }) => (
  <Button
  //  variant="outlined"
    onClick={() => dialogShow({
        title: translate(label),
        content: <div style={{marginTop: 40}}>
           
            <TextField
            onChange={ (event) => searchStarted(event.target.value) }
            id="search"
            label={translate("common.search_input")}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Type here..."
            helperText="Exhibitor name or product name"
            fullWidth
            margin="normal"
            autoFocus
          />

          <SearchResults />

        </div>,
        buttons: []
    })}
    color="inherit"
  >
  <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
  { translate(`common.search`) }
  </Button>
)



Search.defaultProps = {
  label: 'common.search'
};

const enhance = compose(
  withStyles(styles),
  connect(
    (state) => ({oldLocale : state.app.locale}),
    {dialogShow, searchStarted}
  ),
  translate
);

export default enhance(Search);
