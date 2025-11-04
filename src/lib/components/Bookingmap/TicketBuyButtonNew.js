import React, {useState} from 'react';
import MyButton from '../../components/MyButton'
import { useSettings, useBlocking } from '../../helpers'
import {cartItemAdd, snackbarShow} from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../../redux/selectors'
import { BoothBlockedSelector } from './selectors'
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

  // CRITICAL FIX: Check if booth is blocked by someone else
  const boothBlocked = useSelector(state => formdata && formdata.id ? BoothBlockedSelector(state, formdata.id) : null)

  const btnDisabled = () => checkingBlocking || boothBlocked === false || Object.values(cart).some(item => "formdata" in item && item.formdata && isEqual(item.formdata, formdata)  )

  const handleBtnClick = async () => {
    setCheckingBlocking(true)
    if(btnDisabled()){
      setCheckingBlocking(false)
      return;
    }

    // CRITICAL FIX: Double-check blocking status before API call to minimize race condition
    if(boothBlocked === false){
      dispatch(snackbarShow({title: translate("event.sales.booths.blocked")}))
      setCheckingBlocking(false)
      return
    }

    //check number of items in the cart!!!!
    if(Object.values(cart).length>2){
      dispatch(snackbarShow({title: translate("ecommerce.cart.exceeded")}))
      setCheckingBlocking(false)
      return
    }

    const blockingStatus = await setBlocking(id, 1, formdata)
    if(blockingStatus){
      dispatch(cartItemAdd(id, 1, formdata))
      // CRITICAL FIX: Confirm successful lock to user
      dispatch(snackbarShow({title: translate("ecommerce.cart.added")}))
    }else{
      // CRITICAL FIX: Show user why lock failed with better UX
      dispatch(snackbarShow({title: translate("event.sales.booths.blocked")}))
    }
    setCheckingBlocking(false)
  }

  if(!id || !bookable){
    return null
  }

  return (
    <div className={classes.root}>
    <div className={classes.wrapper}>
  <MyButton disabled={btnDisabled()} onClick={handleBtnClick} {...addToCartButtonProps} />
  {checkingBlocking && <CircularProgress size={24} className={classes.buttonProgress} />}
  </div></div>)


}




export default TicketBuyButtonNew