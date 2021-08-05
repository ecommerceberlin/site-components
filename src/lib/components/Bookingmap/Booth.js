import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import BoothDialog from './BoothDialog';
import boothStyles, { getStylingName } from './boothStyles'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'

import {
  getCart, 
  KeyedFormdataSelector, 
  KeyedTicketGroupsSelector, 
  getBoothsSelected
} from '../../redux/selectors'

import {
  BoothFormdataSelector, 
  BoothSelectedSelector,
  BoothBlockedSelector,
  BoothTicketGroupSelector
} from './selectors'

import {
  dialogShow,
  resourceFetchRequest,
  boothChecked
} from '../redux/actions';

const useStyles = makeStyles(boothStyles)


const defaultProps = {
  zoom: 1,
  boothStyleMapping: {},
  disabledTicketIds: [],
  disabledTicketGroupIds: [],
  disabled: false
}


const BoothText = ({zoom=1, label="", image="", name=""}) => {

  
  const classes = useStyles()  

 return (<span className={classNames(classes.boothText, {
    [classes.boothLogotype]: zoom > 1 && image
  })}>
  {label}
  {name && zoom > 1 ? (<span className={classes.cname}>{name}</span>) : null}
</span>)

}

const Booth = ({setting="", g = 0, id = "", dt = 0, dl = 0, dw = 0, dh = 0, ti = "", legend=false, ...props}) => {

  const classes = useStyles()  
  const dispatch = useDispatch()
  const settings = useSettings(setting);
  const {status, name, image} = useSelector((state) => BoothFormdataSelector(state, id), shallowEqual)
  const selected = useSelector(state => BoothSelectedSelector(state, id))
  const blocked = useSelector(state => BoothBlockedSelector(state, id))
  const defaultSize = useSelector(state => BoothTicketGroupSelector(state, g))



  // console.log(status, name, image, slug, selected)
  console.log(id, ti, blocked, defaultSize)


  const {
    zoom,
    boothStyleMapping,
    disabledTicketGroupIds,
    disabled
   } = Object.assign({}, defaultProps, settings, props)


   const hold = () => status === 'hold' || blocked === false
   const sold = () => status === "sold"
   const unavailable = () => !ti || disabledTicketGroupIds.includes(g)

  const checkSize = (value) => value > 0? value: defaultSize

  const onBoothClick = () => {

    if(legend){
      return 
    }

    dispatch(boothChecked(ti))

    dispatch(dialogShow({
      title: '', //will be overwritten....
      content:  <BoothDialog setting={setting} boothId={id} groupId={g} label={ti} status={status} styleName={getStylingName(boothStyleMapping, g)} />,
      buttons: []
    }));

  };

  const _zoom = parseInt(zoom)

  return (
    <li
      id={id}
      onClick={onBoothClick}
      className={classNames(
        classes.booth,
        classes[getStylingName(boothStyleMapping, g)],
      {
        [classes.boothSold]: sold(),
        [classes.boothHold]: hold(),
        [classes.boothUnavailable]: unavailable(),
        [classes.boothSelected]: selected,
        [classes.boothOnLegend] : legend
      })}
      style={{
        height: checkSize(dh) * _zoom,
        width: checkSize(dw) * _zoom,
        top: dt? dt * _zoom : "auto",
        left: dl? dl * _zoom : "auto",
      //  lineHeight: `${data.dh}px`,
      }}
    >
    {/* {  console.log(id, "rendered") } */}
     <BoothText zoom={_zoom} label={hold() ? "R" : ti} image={image} name={name} />
    </li>
  );

}


export default Booth