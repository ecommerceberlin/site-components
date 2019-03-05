import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { translate } from '../i18n';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { facebookChangeStatus } from './redux'

class Facebook extends React.Component {

  componentDidMount() {

    const {appId, sdkLang} = this.props;

    if (window.__FACEBOOK_SDK_LOADED__) {
      return;
    }

    window.fbAsyncInit = function() {

      console.log("__FACEBOOK_SDK_LOADED__")

      window.__FACEBOOK_SDK_LOADED__ = true;

      window.FB.init({
        appId      : appId,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
        
      window.FB.AppEvents.logPageView();   
  
      this.checkLoginState();

    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${sdkLang}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');


  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response);
    });
  }

 
  checkLoginState() {
    const {facebookChangeStatus} = this.props;
    window.FB.getLoginStatus( ({status}) => facebookChangeStatus(status) );
  }

  handleClick = () => {

    window.FB.login(() => this.checkLoginState());

    this.testAPI();
  }

  render() {
    const {translate} = this.props;
    return (
      <Button
      variant="outlined"
      onClick={() => this.handleClick()}
      color="primary"
    >
      {translate('common.login.facebook')}
    </Button>
    )
  }
}


Facebook.propTypes = {
  appId: PropTypes.array.isRequired,
  // keywords: PropTypes.array.isRequired,
  // keyword : PropTypes.string
};

Facebook.defaultProps = {
  appId : '222959121587772',
  sdkLang : 'en_US'
}

const enhance = compose(
  connect(
    (state, props) => ({facebook : state.services.facebook}),
    {facebookChangeStatus}
  ),
  translate
)
export default enhance(Facebook)