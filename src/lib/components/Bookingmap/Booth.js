import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'
import BoothDialog from './BoothDialog';
import boothStyles, { getStylingName } from './boothStyles'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'
import {getCart, KeyedFormdataSelector, KeyedTicketGroupsSelector, getBoothsSelected} from '../../redux/selectors'



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

const Booth = ({setting, g = 0, id = "", dt = 0, dl = 0, dw = 0, dh = 0, ti = "", status=false, selected=false, name="", image="", legend=false, ...props}) => {

  const classes = useStyles()  
  const [translate] = useTranslate();
  const dispatch = useDispatch()
  const settings = useSettings(setting);

  const {
    zoom,
    boothStyleMapping,
    disabledTicketIds,
    disabledTicketGroupIds,
    disabled
   } = Object.assign({}, defaultProps, settings, props)

  const onBoothClick = () => {

    if(legend){
      return 
    }

    if(!status){
      dispatch(resourceFetchRequest(["formdata", "blockings"]));
    }

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
        [classes.boothSold]: status === 'sold',
        [classes.boothHold]: status === 'hold',
        [classes.boothUnavailable]: !ti,
        [classes.boothSelected]: selected,
        [classes.boothOnLegend] : legend
      })}
      style={{
        height: dh * _zoom,
        width: dw * _zoom,
        top: dt? dt * _zoom : "auto",
        left: dl? dl * _zoom : "auto",
      //  lineHeight: `${data.dh}px`,
      }}
    >
    {/* {  console.log(id, "rendered") } */}
     <BoothText zoom={_zoom} label={status === 'hold' ? "R" : ti} image={image} name={name} />
    </li>
  );

}


export default Booth