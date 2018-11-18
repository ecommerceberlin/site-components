import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import {ListItem} from '@material-ui/core/List';

import compose from 'recompose/compose';
import { translate } from '../i18n';
import Icon from './Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const CompanyContactItem = ({ name, link, baseLabel, classes, translate }) => {
  return (
    <Button
      disabled={!link || !link.length}
      className={classes.button}
      variant="flat"
      href={link}
      target="_blank"
    >
      <Icon name={name} />
      {baseLabel ? translate(`${baseLabel}.${name}`) : translate(name)}
    </Button>
  );
};

CompanyContactItem.defaultProps = {
  baseLabel: ''
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(CompanyContactItem);
