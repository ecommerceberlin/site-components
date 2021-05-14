
import React from 'react'
import {resizeCloudinaryImage} from '../helpers'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
    root: {},
    thumbnail: {
        width: "auto",
        height: 300
    },
    image: {
        width: "auto",
        minHeight: 500,
        maxHeight: 1000
    }
}));


const TicketImage = ({icons = null, path="thumbnail", data = {}, maxWidth=70}) => {

    const classes = useStyles()

    const val = get(data, path, "").trim()

    if(isEmpty(icons) && !val){
        return null
    }
  
    if(!val.startsWith("http") && isObject(icons) && val in icons){
      return React.createElement(icons[val], {style: {width: '100%', maxWidth, height: 'auto'}})
    }
  
    return <Avatar variant="square"  className={path=="thumbnail"? classes.thumbnail: classes.image} src={resizeCloudinaryImage(val, 700, 700)}  />

}





export default TicketImage

/**
 *
 {
  id: 1848,
  group_id: 331,
  names: { pl: 'SPONSORED BEER', en: 'SPONSORED BEER', de: 'SPONSORED BEER' },
  price: { pl: 7000, en: 7000, de: 7000 },
  role: '',
  limit: 1,
  max_quantity: 1,
  start: '2020-03-04 10:00:00',
  end: '2021-09-01 20:00:00',
  thumbnail: 'https://res.cloudinary.com/ecommerceberlin/image/upload/v1584026548/Website/ecommerce_berlin_beer.jpg',
  image: 'https://res.cloudinary.com/ecommerceberlin/image/upload/v1584026548/Website/ecommerce_berlin_beer.jpg',
  translation_asset_id: 'resources.upgrades.misc.beer',
  details_url: '/premium/beer',
  agg: { customers: 0, sold: 0 },
  remaining: 1,
  in_dates: 1,
  bookable: 1,
  errors: []
}

 */