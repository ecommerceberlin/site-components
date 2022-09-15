
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { resizeCloudinaryImage } from '../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
}));


function GridWithImages(props) {

  const classes = useStyles();
  const {items} = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {items.map(item => (<Grid item xl={6} lg={6} md={12} sm={12} xs={12}  key={item.image}> <Paper className={classes.paper}>
            <img src={resizeCloudinaryImage(item.image, 1500, 1000)} style={{
              ...{
                width: '100%',
                margin: '0 auto',
              },
              ...(item.style? item.style: {})
            }}/></Paper></Grid>
        ))}     
      
      </Grid>
    </div>
  );
}

GridWithImages.defaultProps = {
    items : []
}


export default GridWithImages