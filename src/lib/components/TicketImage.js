
import React from 'react'
import {resizeCloudinaryImage} from '../helpers'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get'
import isObject from 'lodash/isObject'

const useStyles = makeStyles(theme => ({
    root: {}
}));


const TicketImage = ({icons = null, path="thumbnail", data = {}, maxWidth=70}) => {

    // const classes = useStyles();

    const val = get(data, path, "").trim()


    if(!val){
        return null
    }
  
    if(!val.startsWith("http") && isObject(icons) && val in icons){
      return React.createElement(icons[val], {style: {width: '100%', maxWidth, height: 'auto'}})
    }
  
    return <Avatar variant="square" src={resizeCloudinaryImage(val, 300, 400)} />

}





export default TicketImage