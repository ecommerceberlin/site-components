
import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { translate } from '../../i18n'
import MyButton from '../MyButton'
import { requestMeetup } from './redux';
import WidgetMeetup from '../../compositions/WidgetMeetup'
import {dialogShow, pageActionShow, pageActionHide} from '../redux'


const styles = {

}

class Button extends React.Component {


    componentDidMount(){

        const {pageActionShow} = this.props;

        pageActionShow( this.renderButton() )
    }

    componentWillUnmount(){
        pageActionHide();
    }

    renderButton(){

        const {label, company_id, requestMeetup, dialogShow} = this.props;

        return (<div style={{marginRight: 10}}>
    
            <MyButton label={label} onClick={() => dialogShow({
                    title: translate(label),
                    content: <div style={{marginTop: 40}}>
                      <WidgetMeetup  />
                    </div>,
                    buttons: []
            })} />

        </div>)
    }
    
    render(){


        return null;
    }

}

Button.defaultProps = {
    label : "meetup.schedule",
    company_id : 0,
    register : <div>registration form</div>
}

const enhance = compose(
    withStyles(styles),
  //  translate,
    connect(null, {requestMeetup, dialogShow, pageActionShow, pageActionHide})
)

export default enhance(Button)