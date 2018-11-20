 

import Datasource from '../datasources/Offers'
import Offer from '../components/Offer'
import get from 'lodash/get'
import {getCompanyLogotype} from '../helpers/data'
import {Centered} from '../components/MyLayouts'
import MyTypography from '../components/MyTypography'
import Wrapper from '../components/Wrapper'

const WidgetOffers = ({divider, ...rest}) => (

    <Wrapper {...rest} label="exhibitors.offers.title" first={true}>

    <Datasource>{

    (promoted, rest) =>

    <React.Fragment>

    <Centered style={{marginTop: 80}}>

    <MyTypography label="exhibitors.offers.list.promoted" template="SUBH2CH" />

    </Centered>

    {promoted.map( ex => <Offer 
    key={ex.id} 
        id={ex.id}
        imageSrc={getCompanyLogotype(ex)}
        text={get(ex, "profile.expo")}
        name={get(ex, "profile.name")}
        primary={true}
    />)}

    {divider}

    <Centered style={{marginTop: 80}}>

    <MyTypography label="exhibitors.offers.list.other" template="SUBH2CH" />

    </Centered>

    {rest.map( ex => <Offer 
        key={ex.id} 
        id={ex.id}
        imageSrc={getCompanyLogotype(ex)}
        text={get(ex, "profile.expo")}
        name={get(ex, "profile.name")}
        primary={false}
    />)}


    </React.Fragment>

    }</Datasource>

    </Wrapper>

)

WidgetOffers.defaultProps = {
    divider : null
}

export default WidgetOffers
