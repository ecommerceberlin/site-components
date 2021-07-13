import React from 'react';
import MyButton from '../../components/MyButton'
import { useSettings } from '../../helpers'
import {cartItemAdd} from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../../redux/selectors'
import isEqual from 'lodash/isEqual'

const defaultProps = {

  addToCartButtonProps: {
    variant : "contained",
    label : "common.add2cart",
    color : "default",
  },
 
  formdata : {},
  nonBookable : <span>no valid tickets</span>,
  //temporary fix
  right : null 
}


const TicketBuyButtonNew = ({setting, ...props}) => {

  const cart = useSelector(getCart)
  const dispatch = useDispatch();
  const settings = useSettings(setting, {});
  const  {id, bookable, formdata, nonBookable, right, addToCartButtonProps} = Object.assign(defaultProps, settings, props)
 
  const handleBtnClick = () => {

    //check if available!


    dispatch(cartItemAdd(id, 1, formdata))
  }

  const btnDisabled = () =>  Object.values(cart).some(item => "formdata" in item && item.formdata && isEqual(item.formdata, formdata)  )
  


//  useEffect(() => {

//   fetch(service_api, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ti: label, id: boothId})
//   }).then(response => response.json()).then((json) => console.log({ti: label, id: boothId}, json))

//  }, [])


if(!id || !bookable){
  return nonBookable
}

return (<><MyButton disabled={btnDisabled()} onClick={handleBtnClick} target="_blank" {...addToCartButtonProps} />
      {right}</>)


//       <form action={ get("bookingmap.api") } method="post" target="_blank">
//       <input type="hidden" name={`tickets[${id}]`} value="1" />
//       <input type="hidden" name={`ticketdata[${id}]`} value={JSON.stringify(formdata)} />


}




export default TicketBuyButtonNew