import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import { translate } from '../i18n';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { slug } from '../helpers';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25
  },
  chip: {
    margin: theme.spacing.unit
  },
  chipAlt: {}
});

const Tags = ({ tags, altTags, raw, classes, translate, style, baseLabel }) => {
  if (!tags.length) return null;

  return (
    <div className={classes.container}>
      {tags.map((chip, idx) => (
        <Chip
          key={idx}
          label={translate(`${baseLabel}.${slug(chip, '_')}`)}
          classes={{ root: classes.chip }}
        />
      ))}
      {raw.map((chip, idx) => (
        <Chip key={idx} label={chip} classes={{ root: classes.chip }} />
      ))}
      {altTags.map((chip, idx) => (
        <Chip
          key={idx}
          label={translate(`${baseLabel}.${slug(chip, '_')}`)}
          classes={{ root: classNames(classes.chip, classes.chipAlt) }}
        />
      ))}
    </div>
  );
};

Tags.defaultProps = {
  tags: [],
  altTags: [],
  raw: [],
  baseLabel: 'common.tags',
  style: {}
};

export default compose(
  withStyles(styles),
  translate
)(Tags);
