import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import classNames from 'classnames';
import { slug } from '../helpers';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25
  },
  centered: {
 
    justifyContent: 'center',
  },
  chip: {
    margin: theme.spacing(1)
  },
  chipAlt: {}
}));

const Tags = ({ centered=true, tags=[], altTags=[], raw=[], style={}, baseLabel="common.tags" }) => {

  const classes = useStyles()
  const [translate] = useTranslate()

  if (!tags.length) return null;

  return (
    <div className={classNames(classes.container, {
      [classes.centered]: centered
    })}>
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

export default Tags