import { translate } from '../i18n';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

//https://chatlio.com/docs/api-v1/

class Chatlio extends React.PureComponent {
  componentDidMount() {
    if (window.__CHATLIO_CUSTOM_EVENT_SET__) {
      return;
    }

    document.addEventListener('chatlio.firstMessageSent', this.chatlioIdentify);
    document.addEventListener('chatlio.ready', this.chatlioIdentify);
    this.chatlioConfigure();
    window.__CHATLIO_CUSTOM_EVENT_SET__ = true;
  }

  componentWillUnmount() {
    if (!window.__CHATLIO_CUSTOM_EVENT_SET__) {
      return;
    }

    document.removeEventListener(
      'chatlio.firstMessageSent',
      this.chatlioIdentify
    );
    document.removeEventListener('chatlio.ready', this.chatlioIdentify);
  }

  chatlioConfigure() {
    const { translate } = this.props;

    if (!window._chatlio) {
      return;
    }

    window._chatlio.configure({
      titleColor: red[500]
    });
  }

  chatlioShow = () => {
    const { hello, translate } = this.props;

    if (!window._chatlio) {
      return;
    }

    // window._chatlio.fullScreen();
    window._chatlio.show({ expanded: true });

    if (hello) {
      window._chatlio.send(translate(hello));
    }
  };

  chatlioIdentify = event => {
    // window._chatlio.identify(getUserData('id'), {
    //   name: getCompanyName(),
    //   email: getUserData('email'),
    //   representative: getUserFullName()
    //   // plan: 'king',
    //   // favoriteColor: 'black'
    // });
  };

  render() {
    const { button, translate } = this.props;

    if (!button) {
      return null;
    }

    return (
      <Button
        variant="outlined"
        onClick={() => this.chatlioShow()}
        color="primary"
      >
        {translate('common.chat')}
      </Button>
    );
  }
}

Chatlio.defaultProps = {
  hello: 'services.chatlio.hello',
  button: true
};

export default translate(Chatlio);

/*

_chatlio.configure({
    "off": false,
    "noAnswerWithEmail": "Oops! Sorry no one has responded yet. We have your email on file if you need to leave or you can continue to wait.",
    "noAnswerWithoutEmail": "Oops! Sorry no one has responded yet. We have your email on file if you need to leave or you can continue to wait.",
    "maxVisitorInactiveMins": 4,
    "status": "online",
    "hideWhenOffline": false,
    "showAvatarPreChat": false,
    "showTeamAvatarPreChat": false,
    "newMsgNotifications": true,
    "activeAgentAvatar": "",
    "forwardSlackUserName": false,
    "titleColor": "#3f51b5",
    "titleFontColor": "#fff",
    "onlineTitle": "Question?  Chat with us.",
    "offlineTitle": "Leave a message",
    "agentLabel": "Support",
    "browserSideAuthorLabel": "Me",
    "onlineMessagePlaceholder": "Type message here…",
    "whiteLabel": false,
    "trackPresence": true,
    "offlineGreeting": "Sorry we are away, but we would love to hear from you and chat soon!",
    "offlineEmailPlaceholder": "Email",
    "offlineMessagePlaceholder": "Your message here",
    "offlineNamePlaceholder": "Name (optional but helpful)",
    "offlineSendButton": "Send",
    "offlineThankYouMessage": "Thanks for your message. We will be in touch soon!",
    "requireInfo": false,
    "requireInfoGreeting": "Enter your name and email to start chatting!",
    "requireInfoSubmitBtn": "Start",
    "requestScreenshotText": "Operator would like to take a screenshot of your browser. Confirm below.",
    "requestScreenshotAllowLabel": "Take screenshot",
    "requestScreenshotDeclineLabel": "Decline",
    "teamAvatarOn": false,
    "collapsedMode": "chip",
    "defaultOkBtnLabel": "Ok",
    "defaultSendBtnLabel": "Send",
    "defaultCancelBtnLabel": "Cancel",
    "defaultYesBtnLabel": "Yes",
    "defaultNoBtnLabel": "No",
    "showConversationEnd": true,
    "showConversationRating": true,
    "conversationEndLabel": "Your chat session has ended. Thanks for chatting!",
    "conversationRatingLabel": "How would you rate this chat?",
    "conversationRatingThankYou": "Thanks for rating your chat session!",
    "conversationRatingPlaceholder": "How can we improve?",
    "conversationEndTranscriptPlaceholder": "Email to send transcript of chat",
    "conversationEndConfirmationQuestion": "Are you sure you want to end this chat?",
    "blacklistedUrls": "",
    "useSgmt": true,
    "autoResponseMessage": "Question? Just type it below and we are online and ready to answer."
  });

  */
