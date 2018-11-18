import React from 'react'
import {FsButtons} from '../components'
import Router from 'next/router'

const _items = [
    {
      url: 'https://static.eventjuicer.com/photos/12961446_1288640741145929_7684227399478032531_o.jpg',
      label: 'common.visitor',
      width: '50%',
      onClick : () => Router.push("/visit").then(() => window.scrollTo(0, 0))
    },
    {
      url: 'https://static.eventjuicer.com/photos/12967348_1288628734480463_3860331543127036065_o.jpg',
      label: 'common.exhibitor',
      width: '50%',
      onClick : () => Router.push("/exhibit").then(() => window.scrollTo(0, 0))
    },
  
  ];


const RoleButtons = ({items}) => (

    <FsButtons items={items} />

)

RoleButtons.defaultProps = {
    items : _items
}


export default RoleButtons