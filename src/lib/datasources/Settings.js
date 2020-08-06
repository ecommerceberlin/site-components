
import React from 'react';
import get from 'lodash/get'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

const Settings = ({settings, children}) =>  {

    if(typeof(children) !== 'function'){
        return <div>bad calling Settings</div>
    }

    return  children(
    
        (path, fallback = undefined) => {

        const out = get(settings, path, undefined)

        if(out !== undefined){
            return out
        }

        if(fallback !== undefined){
            return fallback
        }

        return path
    }) 

    
} 

Settings.defaultProps = {
    settings : {}
}

Settings.propTypes = {
    
    settings : PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
};
  


export default connect((state, props) => ({settings : state.settings}))(Settings);


/**

import {SettingsSelector} from '../redux/selectors'


export default connect(
    (state, props) => {

        const mapStateToProps = (state, props) => {
          return {
            settings : SettingsSelector(state, props)
          }
        }
        return mapStateToProps
    
    }
)(Settings);



 */