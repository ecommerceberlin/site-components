import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useDispatch } from 'react-redux'
import BoothDialog from './BoothDialog';
import boothStyles from './boothStyles'
// import { useSettings } from '../../helpers'
// import { useTranslate } from '../../i18n'
import { useBoothContext } from './Context';

import {
  dialogShow,
  boothChecked
} from '../redux/actions';

const useStyles = makeStyles(boothStyles)

const BoothText = () => {

  const classes = useStyles()  
  const {
    name, 
    image,
    hold,
    zoom,
    ti
  } = useBoothContext()

 return (<span className={classNames(classes.boothText, {[classes.boothLogotype]: zoom > 1 && image})}>
  {hold ? "R" : ti}
  {name && zoom > 1 ? (<span className={classes.cname}>{name}</span>) : null}
</span>)

}

const BoothVisitor = ({marked=false, legend=false}) => {

  const classes = useStyles()  
  const dispatch = useDispatch()
  const {
    setting, 
    selected, 
    sold,
    hold,
    unavailable,
    blocked,
    styleName,
    sizes,
    xy,
    id,
    g,
    ti
  } = useBoothContext()

  const onBoothClick = () => {

    if(legend){
      return 
    }

    dispatch(boothChecked(ti))

    dispatch(dialogShow({
      title: '', //will be overwritten....
      content:  <BoothDialog setting={setting} boothId={id} groupId={g} label={ti} styleName={styleName} />,
      buttons: []
    }));

  };

  return (
    <li
      id={id}
      onClick={onBoothClick}
      className={classNames(
        classes.booth,
        classes[styleName],
      {
        // [classes.boothSold]: sold,
        [classes.boothHold]: hold,
        [classes.boothUnavailable]: unavailable,
        [classes.boothBlocked]: blocked,
        [classes.boothSelected]: selected || marked,
        [classes.boothOnLegend]: legend
      })}
      style={{...sizes, ...xy}}
    >
     <BoothText  />
    </li>
  );

}


export default BoothVisitor