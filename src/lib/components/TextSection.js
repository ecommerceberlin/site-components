import React from 'react';
import _get from 'lodash/get';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { translate } from '../i18n';
import MyTypography from './MyTypography'

  
const TextSection = ({record, name, translate}) => {

    const value = _get(record, name, "");

    if(value && value.length > 10){
        return (<MyTypography template="benefitsText">
        <strong>{translate(`awards.fields.${name}`)}</strong> {value.indexOf("http")>-1 ? <a href={value} target="_blank">{value}</a> : value}
        </MyTypography>)
    }

    return null

}

export default translate(TextSection);