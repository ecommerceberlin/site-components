import React from 'react';
import MyButton from '../../components/MyButton'
import Settings from '../../datasources/Settings'

const TicketBuyButton = ({id, bookable, formdata, nonBookable, ...buttonProps}) => (

  <Settings name="bookingmap">{
    ({api}) => {
      return id && bookable ?
      <form action={api} method="post" target="_blank">
      <input type="hidden" name={`tickets[${id}]`} value="1" />
      <input type="hidden" name={`ticketdata[${id}]`} value={JSON.stringify(formdata)} />
      
      <MyButton
        target="_blank" 
        {...buttonProps}
      />

      </form> : nonBookable
    }}
    </Settings>
)

TicketBuyButton.defaultProps = {
  variant : "contained",
  label : "common.confirm",
  color : "primary",
  type : "submit",
  formdata : {},
  nonBookable : <span></span>
}

TicketBuyButton.propTypes = {
  id: PropTypes.number.isRequired,
  bookable: PropTypes.bool.isRequired,
};

export default TicketBuyButton