import React from 'react'
import isFunction from 'lodash/isFunction'
import useSWR from 'swr'
import { useSelector } from 'react-redux'

const fetcher = url => fetch(url).then(r => r.json())

const HasTicketWithRole = ({email="", project=null, role="visitor", children = null}) => {

    const profile = useSelector(state => state.resources.currentLinkedinUser)

    console.log(email)

    // const { data, error } = useSWR(`https://api.eventjuicer.com/v1/public/${project || process.env.NEXT_PUBLIC_PROJECT}`, fetcher, { 
    //     refreshInterval: 60*1000, //pull every minute
    //     refreshWhenHidden: true 
    // })

    return isFunction(children) ? children(): children
}

export default HasTicketWithRole