import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../../i18n';
import { usePresentation } from './context';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
 
}));


const DialogTitle = () => {

  const {time, venue, category, categories} = usePresentation()
  const [translate] = useTranslate();
  const classes = useStyles();

  return (
    <Box>
      <Grid container direction='row' spacing={2}>
        <Grid item>
        <Typography variant="h4">{translate("common.stage")}{` `}{venue}</Typography>
        </Grid>
        <Grid item>
        <Typography variant="h4">{time}</Typography>
        </Grid>
      </Grid>
    
    </Box>
  );
}

export default DialogTitle



/**
 * 
 *   const styling = isObject(category) && category in categories? categories[category]: {}
  {!isEmpty(categories) && isString(category) && category.length > 1 && <Chip 
        label={translate(`tags.${category}`)} 
        className={classes.chip}
        style={styling} 
      />}

 */
