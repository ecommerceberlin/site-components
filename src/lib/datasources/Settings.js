import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {SettingsSelector} from '../redux/selectors'

const Settings = ({children, settings}) => {

    return children(settings)

}

Settings.propTypes = {
    name: PropTypes.string.isRequired,
    settings : PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
};
  

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

