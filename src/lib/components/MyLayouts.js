import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
  middle: {
    display: 'flex',
    alignItems: 'center',
    flexWrap : 'nowrap',
    flexDirection : 'column'
  }
}));

const Centered = ({children, style}) => {

  const classes = useStyles();

  return (
  <div style={style} className={classes.middle}>{children}</div>
  )

} 

Centered.defaultProps = {
  style : {}
}

const TwoColsLayout = ({left,right,leftCentered,rightCentered,leftSize,reverse=false}) => {
  const ls = parseInt(leftSize) ? leftSize : 6;
  const rs = 12 - ls;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <Grid container spacing={5} direction={isMobile && reverse? "column-reverse": "row"}>
      <Grid item xs={12} sm={12} md={ls} lg={ls} xl={ls}>
        {leftCentered ? <Centered>{left}</Centered> : left}
      </Grid>

      <Grid item xs={12} sm={12} md={rs} lg={rs} xl={rs}>
        {rightCentered ? <Centered>{right}</Centered> : right}
      </Grid>
    </Grid>
  );
};

TwoColsLayout.defaultProps = {
  spacing: false,
  leftCentered: false,
  rightCentered: false,
  // invertColsOnMobile : false
};

export { TwoColsLayout, Centered };
