import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MobileAwarePublisherSelector } from './redux'
import { resourceFetchRequest } from '../components/redux'

class Publishers extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, all} = this.props

      resourceFetchRequest(["publishers"])

      /**
       * {
        resource: "posts",
        params: {
          company_id: 1216
        }
      }
       */
  }

  render(){
    const {children, ...rest} = this.props
    return children(rest)
  }

}

Publishers.propTypes = {

};

Publishers.defaultProps = {
    all : [],
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        all : MobileAwarePublisherSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Publishers)
