import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../i18n';

const TicketRemainingInfo = ({remaining, isBookable, translate}) => {

  if(!isBookable){
    return null
  }

  return   <span>{`${translate("common.remaining")} ${remaining} ${translate("common.pcs")}`}</span>

}

TicketRemainingInfo.defaultProps = {
  isBookable : false,
  remaining : 0
}

TicketRemainingInfo.propTypes = {
  isBookable : PropTypes.number.isRequired,
  remaining : PropTypes.number.isRequired
}

export default translate(TicketRemainingInfo)
