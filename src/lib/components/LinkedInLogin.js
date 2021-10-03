import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import LinkedIn from '@material-ui/icons/LinkedIn';
import { useRouter } from 'next/router'
import { useTranslate } from '../i18n'
import { lsSet, lsGet, uuidv4 } from '../helpers'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import { getLinkedInToken } from '../redux/selectors'


import { 
    linkedUidReceived, 
    linkedUidReset, 
    linkedVoteRequest, 
//    linkedVoteRequestAfterOauth,
    dialogShow 
} from './redux/actions'

// import { KeyedVotesSelector } from '../datasources/redux/votes'


const useStyles = makeStyles(theme => ({
    buttonContainer : {
        marginBottom: 50,
        marginTop: 20
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}))


const extractUrlValue = (key, url) =>
{
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}



const defaultProps = {
    appId: "planner",
    service : "linkedin",
    transaction : {},
    labelLoggedIn : "social.linkedin.connected",
    labelGuest : "common.vote_with_linkedin",
    labelDisabled : "common.vote_disabled",
    labelAlreadyVoted : "common.vote_voted",
    labelVotesUsed : "common.votes_used",
 //   url : `https://${process.env.NEXT_PUBLIC_PROJECT}`,
    url: 'http://localhost:3000',
    redirect: "planner",
    apiUrl : `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}`
}


const getSession = (appId) => typeof window !== 'undefined' ? lsGet(`oauth_session${appId}`) : false;
const createSession = (appId) => {
    const uuid = uuidv4();
    lsSet(`oauth_session${appId}`, uuid);
    return uuid;
}

const LinkedInLogin = (props) => {

    const {appId, apiUrl, labelGuest, labelLoggedIn, url, redirect} = Object.assign(defaultProps, props)
    const [translate] = useTranslate()
    const dispatch = useDispatch()
    const linkedin = useSelector(state => getLinkedInToken(state, appId))
    const {asPath} = useRouter();
    const classes = useStyles();


    useEffect(() => {

        const uid = extractUrlValue("uid", asPath);
        const session = extractUrlValue("session", asPath);

        if(uid && uid.length > 3  && session === getSession(appId)){
                    //    console.log("fire up auto voting...");
                 ///       linkedUidReceived(uid, appId);
                 alert("mamy dane!")
        }

    }, [asPath])

    useEffect(() => {

        const response = fetch(`${apiUrl}/${appId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {uid: linkedin})}).then(response => response.json()); 

    }, [linkedin])


    const handleSession = (e) => {
        e.preventDefault();
        window.location.href = `${apiUrl}/ssr?service=linkedin&appid=${appId}&from=${ encodeURIComponent(`${url}/${redirect}`) }&session=${ createSession(appId) }`
    }

    if(linkedin){
        return (<div className={classes.buttonContainer}>
            <LinkedIn className={classes.leftIcon} />{translate(labelLoggedIn)}
        </div>)
    }

    return  (<Button 
        startIcon={ <LinkedIn className={classes.leftIcon} />} 
        onClick={handleSession} 
        variant="contained" 
        size="large" 
        fullWidth
        color="primary">{translate(labelGuest)}</Button>
    )

    // return "asd"

}

export default LinkedInLogin;



//     showDialog(titleLabel, content){
        
//         const {dialogShow, translate} = this.props

//         dialogShow({
//             title: translate(titleLabel),
//             content: <div style={{marginTop: 40}}>
//              {content}
//             </div>,
//             buttons: []
//         })
//     }


//     componentDidUpdate(){

//       console.log(this.props)

//        const {transaction, onVoted} = this.props;   
//        const {code, message} = transaction;

//         switch (code) {
           
//             case 400:
//                 this.showDialog('common.votes_used');
//             break;

//             case 404:
//                 this.showDialog('common.vote_error', 
//                     this.renderStandardButton()
//                 );
//             break;

//             case 406:
//             //already voted!
              
//             break;
//             default:
//             break;
//         }

     

//     }



//     renderStandardButton(){


//         const {
//             translate, 
//             classes,
//             labelGuest
//         } = this.props;

//        
//     }



//     render(){

//         const {
//             labelLoggedIn,
//             id, 
//             linkedin, 
//             linkedVoteRequest, 
//             translate, 
//             classes,
//             service,
//             labelGuest
//         } = this.props;

//         const savedSession = typeof window !== 'undefined' ? lsGet("oauth_session") : false;
      
//         if(linkedin && savedSession){

//             return (
//           
//                 {/* <Button 
//                     startIcon={ } 
//                     variant="contained" 
//                     size="large" 
//                     color="primary" 
//                     fullWidth
//                     onClick={() => linkedVoteRequest(service, id) }>
                   
//                 </Button> */}
//             </div>)
//         }

        
//         return this.renderStandardButton()
       
//     }

// }



// const enhance = compose(
   
//     connect((state, props) => {

//         const mapStateToProps = (state, props) => {
//             return {
//               linkedin : getLinkedInToken(state),
//               transaction : state.transactions.fav
//             }
//           }
//         return mapStateToProps
//     }, {
//         linkedUidReceived, 
//      //   linkedVoteRequestAfterOauth, 
//         linkedUidReset,
//         dialogShow
//     }),
// )
