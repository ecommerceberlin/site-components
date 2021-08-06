import React, {useState} from 'react';
import MyButton from '../../components/MyButton'
import { useSettings, useBlocking } from '../../helpers'
import {cartItemAdd} from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../../redux/selectors'
import isEqual from 'lodash/isEqual'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useTranslate} from '../../i18n'

const defaultProps = {

  addToCartButtonProps: {
    variant : "contained",
    label : "ecommerce.cart.add",
    color : "default",
  },
  formdata : {},
  // nonBookable : <span>no valid tickets</span>,
}



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


const TicketBuyButtonNew = ({setting, ...props}) => {

  const classes = useStyles();
  const [translate] = useTranslate()
  const [checkingBlocking, setCheckingBlocking] = useState(false)
  const cart = useSelector(getCart)
  const dispatch = useDispatch();
  const settings = useSettings(setting, {});
  const  {id, bookable, formdata, addToCartButtonProps} = Object.assign(defaultProps, settings, props) 
  const setBlocking = useBlocking();

  const btnDisabled = () => checkingBlocking || !id || !bookable || Object.values(cart).some(item => "formdata" in item && item.formdata && isEqual(item.formdata, formdata)  )

  const handleBtnClick = async () => {
    setCheckingBlocking(true)
    if(btnDisabled()){
      return;
    }
    //check number of items in the cart!!!!
    if(Object.values(cart).length>2){
      alert(translate("ecommerce.cart.exceeded"))
      setCheckingBlocking(false)
      return
    }

    const blockingStatus = await setBlocking(id, 1, formdata)
    if(blockingStatus){
      dispatch(cartItemAdd(id, 1, formdata))
    }
    setCheckingBlocking(false)
  }

  return (
    <div className={classes.root}>
    <div className={classes.wrapper}>
  <MyButton disabled={btnDisabled()} onClick={handleBtnClick} {...addToCartButtonProps} />
  {checkingBlocking && <CircularProgress size={24} className={classes.buttonProgress} />}
  </div></div>)


}




export default TicketBuyButtonNew