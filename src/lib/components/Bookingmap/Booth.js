import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'

import BoothIsTaken from './BoothIsTaken';
import BoothIsAvailable from './BoothIsAvailable';
import boothStyles, { getStylingName } from './boothStyles'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'
import {KeyedFormdataSelector, KeyedTicketGroupsSelector, getBoothsSelected} from '../../redux/selectors'

import {
  getCompanyProfileInfo, 
  getCompanyName
} from '../../helpers/data'

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
  legend: false,
  disabled: false
}

const Booth = ({setting, g = 0, id = "", dt = 0, dl = 0, dw = 0, dh = 0, ti = "", ...props}) => {

  const classes = useStyles()  
  const [translate] = useTranslate();
  const dispatch = useDispatch()
  const settings = useSettings(setting);

  const {
    zoom,
    boothStyleMapping,
    disabledTicketIds,
    legend,
    disabled
   } = Object.assign({}, defaultProps, settings, props)

  const formdata  = useSelector(KeyedFormdataSelector)
  const ticketgroups = useSelector(KeyedTicketGroupsSelector)
  const boothsSelected = useSelector(getBoothsSelected)

  const getDefaultSize = () => {

    if(! (g in ticketgroups)){
      return 0;
    }
    const size = parseInt(ticketgroups[g].map.width);
    return !isNaN(size) ? size : 20; 
  }
  
  const getStatus = () => {
    return id in formdata ? formdata[id] : {};
  }

  const getStatusShort = () => {
    const { purchase } = getStatus();
    if (purchase) {
      return purchase.paid ? 'sold' : 'hold';
    }
    return false;
  }

  const getBuyerInfo = () => {
    const { company } = getStatus();
    return { cname2 : getCompanyName(company), logotype : getCompanyProfileInfo(company, "thumbnail") };
  }

  const isBoothSelected = () => {
    // const boothsSelected = Object.values(cart).filter(item => "formdata" in item && "id" in item.formdata).map(item => item.formdata.id)
    return (boothsSelected && boothsSelected.indexOf(id) > -1) //|| (selected && selected.indexOf(boothId) > -1);
  }

  const onBoothClick = () => {

    if(legend){
      return 
    }

    dispatch(resourceFetchRequest(["formdata", "ticketgroups"]));

    let modalTitle = '';
    let modalContent = '';
    let modalButtons = [];

    const boothProps = {boothId: id, groupId: g, label: ti, status: getStatusShort()}

    const styleName = getStylingName(boothStyleMapping, g);

    switch (getStatusShort()) {
      case 'hold':
        modalTitle = translate("event.sales.booths.hold");
        modalContent = <BoothIsTaken setting={setting} {...boothProps} style={styleName}  />;

        break;
      
      case 'sold':
        modalTitle = translate("event.sales.booths.sold");
        modalContent = <BoothIsTaken setting={setting} {...boothProps} style={styleName} formdata={getStatus()} />;

        break;
      default:
        /* THERE IS NOW FORMDATA FOR UNSOLD BOOTHS!!!! */
        modalTitle = translate("event.sales.booths.free");
        modalContent = <BoothIsAvailable setting={setting} disabled={disabled} style={styleName} disabledTicketIds={disabledTicketIds} {...boothProps} />
    }

    dispatch(dialogShow({
      title: modalTitle,
      content: modalContent,
      buttons: modalButtons
    }));

    dispatch(boothChecked(ti));

  };


  const status = getStatusShort();
  const buyer = getBuyerInfo()
  const width = dw > 0 ? dw : getDefaultSize();
  const height = dh > 0 ? dh : getDefaultSize();

  const _zoom = Math.max(1, zoom);

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
        [classes.boothSelected]: isBoothSelected(),
        [classes.boothOnLegend] : legend
      })}
      style={{
        height: height * _zoom,
        width: width * _zoom,
        top: dt? dt * _zoom : "auto",
        left: dl? dl * _zoom : "auto",
      //  lineHeight: `${data.dh}px`,
      }}
    >
      <span
        className={classNames(classes.boothText, {
          [classes.boothLogotype]: buyer && 'logotype' in buyer && buyer.logotype
        })}
      >
        {status === 'hold' ? "R" : ti}
  
        {buyer && 'cname2' in buyer && _zoom > 1 ? (
          <span className={classes.cname}>{buyer.cname2}</span>
        ) : null}
      </span>
    </li>
  );

}


export default Booth