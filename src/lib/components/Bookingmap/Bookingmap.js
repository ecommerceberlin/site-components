import React from 'react';

import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import translate from '../../i18n/translate'


import BoothInfo from './BoothInfo';
import Booth from './Booth';
import SalesInfo from './SalesInfo';
import Loader from './Loader'

import {BookingMapSelector} from '../../redux/selectors'

import {
  dialogShow,
  resourceFetchRequest,
  boothChecked
} from '../redux/actions';

import {getCompanyLogotype, getCompanyName} from '../../helpers/data'


const styles = theme => ({
  scrollableContainer: {
    overflowX: 'auto',
    overflowY: 'visible',
    height: 800,
    whiteSpace: 'nowrap',
  },

  container: {
    position: 'relative',
    margin: '0px auto',
    padding: 0,
    width: 1170,
    height: '100%'
  },

  bg: {
    position: 'absolute',
    filter: 'grayscale(90%)',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    zIndex: 2
  },

  booths: {
    position: 'relative',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    zIndex: 3
  }
});

class Bookingmap extends React.PureComponent {


  componentDidMount(){

    const {resourceFetchRequest, autorefresh} = this.props

    resourceFetchRequest(["bookingmap", "ticketgroups", "formdata"])

    // if(parseInt(autorefresh, 10) > 5 ){
    //   this.interval = setInterval(() => resourceFetchRequest(["formdata"]), autorefresh * 1000);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatus(boothId) {
    const { formdata } = this.props;
    return boothId in formdata ? formdata[boothId] : {};
  }

  getStatusShort(boothId) {
    const { purchase } = this.getStatus(boothId);
    if (purchase) {
      return purchase.paid ? 'sold' : 'hold';
    }
    return false;
  }

  getBuyerInfo(boothId) {
    const { company } = this.getStatus(boothId);
    return { cname2 : getCompanyName(company), logotype : getCompanyLogotype(company) };
  }

  getDefaultSize(groupId) {
    const { ticketgroups, defaultSize } = this.props;
    if(! (groupId in ticketgroups)){
      return 0;
    }
    const size = parseInt(ticketgroups[groupId].map.width);
    return !isNaN(size) ? size : defaultSize; 
  }
 
  onBoothClick = (boothId, groupId, label) => {

    const { dialogShow, boothChecked, translate, disabled } = this.props;

    const status = this.getStatusShort(boothId);

    let modalTitle = '';
    let modalContent = '';
    let modalButtons = [];

    const boothProps = {boothId, groupId, label, status, disabled}

    switch (status) {
      case 'hold':
        modalTitle = translate("event.sales.booths.hold");
        modalContent = <BoothInfo {...boothProps} />;

        break;
      case 'sold':
        modalTitle = translate("event.sales.booths.sold");
        modalContent = <BoothInfo {...boothProps} formdata={this.getStatus(boothId)} />;

        break;
      default:
        /* THERE IS NOW FORMDATA FOR UNSOLD BOOTHS!!!! */
        modalTitle = translate("event.sales.booths.free");
        modalContent = <SalesInfo {...boothProps} />
    }

    dialogShow({
      title: modalTitle,
      content: modalContent,
      buttons: modalButtons
    });

    boothChecked(label);

  };

  isBoothSelected(boothId) {
    const { selected, boothsSelected } = this.props;

    // const boothsSelected = Object.values(cart).filter(item => "formdata" in item && "id" in item.formdata).map(item => item.formdata.id)

    return (
      (boothsSelected && boothsSelected.indexOf(boothId) > -1) ||
      (selected && selected.indexOf(boothId) > -1)
    );
  }

  render() {


    const { bookingmap, classes, zoom, height } = this.props;
    return (
      
      <div
        className={classes.scrollableContainer}
        style={{
          height: height * zoom
        }}
      >
       
          <div
            className={classes.container}
            style={{
              width: 1170 * zoom
            }}
          >

           {bookingmap && 'mapsource' in bookingmap ? (
             <React.Fragment>
            <img src={bookingmap.mapsource} className={classes.bg} />

            <ul className={classes.booths}>
              {bookingmap.booths &&
                bookingmap.booths.map(booth => (
                  <Booth
                    groupId={booth.g}
                    defaultSize={ this.getDefaultSize(booth.g) }
                    zoom={zoom}
                    selected={this.isBoothSelected(booth.id)}
                    onClick={this.onBoothClick}
                    status={this.getStatusShort(booth.id)}
                    key={booth.id}
                //    buyer={this.getBuyerInfo(booth.id)}
                    data={booth}
                  />
                ))}
            </ul>
            </React.Fragment>) : <Loader />
         } 
         </div>
      </div>
    );
  }
}

Bookingmap.defaultProps = {
  zoom: 1,
  height: 750,
  boothsSelected : [],
  formdata : {},
  ticketgroups : {},
  bookingmap : [],
  disabled : false,
  autorefresh : 15,
  defaultSize : 21
};

const enhance = compose(
  translate,
  withStyles(styles),
  connect(
    (state) => BookingMapSelector(state),
    {dialogShow, resourceFetchRequest, boothChecked}
  )
);

export default enhance(Bookingmap);
