import {connect} from 'react-redux'
import { dialogShow } from './redux/actions';
import Button from '@material-ui/core/Button';
import {translate} from '../i18n'
import compose from 'recompose/compose'
import Link from 'next/link';
import { generateLinkParams } from '../helpers';

/*
onClick={() => dialogShow({
        title : "asd",
        content : "dsa",
        buttons : []
    })}
*/

const OfferLocationButton = ({dialogShow, translate, name, text, className, subpage, id}) => (
    <React.Fragment>

     <Button onClick={() => dialogShow({
         title : name,
         content :  <div className={className} dangerouslySetInnerHTML={{__html : text}} />
     })} variant="outlined" size="small" color="primary">{translate("common.details")}</Button>

    <Link { ...generateLinkParams(name, subpage, id) }>
        <Button size="small" color="primary">{translate("common.booth_location")}</Button>
    </Link>

    </React.Fragment>
   
   
)

OfferLocationButton.defaultProps = {
    subpage : "company",
    name : "",
    text : "",
    className : ""
}

const enhance = compose(
    connect(null, {dialogShow}),
    translate
)

export default enhance(OfferLocationButton)