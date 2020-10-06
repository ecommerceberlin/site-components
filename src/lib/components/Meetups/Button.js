
import React from 'react';

import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { translate } from '../../i18n'
import MyButton from '../MyButton'

import { requestMeetup } from './redux';
import CheckEmailForm from './CheckEmailForm'
import {VisitorStepForm } from '../../compositions/Visitor'

import {dialogShow} from '../redux'
const styles = {

}

class Button extends React.Component {

    render(){

        const {label, company_id, requestMeetup, dialogShow} = this.props;

        return ( 
        
        <div style={{margin: 100}}>
        
          
            
            <MyButton 
                label="asd" onClick={() => dialogShow({
                    title: translate(label),
                    content: <div style={{marginTop: 40}}>
                      <CheckEmailForm />
                      <VisitorStepForm/>
                    </div>,
                    buttons: []
            })} />

        </div>)
    }

}

Button.defaultProps = {
    label : "costam",
    company_id : 0,
    register : <div>registration form</div>
}

const enhance = compose(
    withStyles(styles),
  //  translate,
    connect(null, {requestMeetup, dialogShow})
)

export default enhance(Button)