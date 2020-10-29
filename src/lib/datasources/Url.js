

import React, {useEffect, useState} from 'react';

import PropTypes from 'prop-types';
// import {connect} from 'react-redux'
import {useRouter} from 'next/router'
 

const Url = ({children, router}) => {

    const router = useRouter();
   
    if(router && "query" in router){
        return children(router.query)
    }

    return children();
}

export default Url