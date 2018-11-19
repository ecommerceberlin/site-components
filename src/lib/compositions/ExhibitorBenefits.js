
import {GridBenefits, Wrapper} from '../components'
import {
    FaHandshake as Handshake,
    FaComments as Talks,
    FaSmile as Prooved,
    FaPiggyBank as Savings,
    FaLink as Bounds,
    FaLightbulb as Inspiration
} from 'react-icons/fa';



const _items = [

    {
        icon : Handshake,
        label :  'outreach',
    },
    {   
        icon : Talks,
        label : 'feedback'
    },
    {   
        icon : Prooved,
        label : 'organizer'
    },
    {   
        icon : Savings,
        label : 'all_inclusive'
    },
    {
        icon : Bounds,
        label : 'meet_clients'
    },
    {
        icon : Inspiration,
        label : 'inspiration'
    }
]


const ExhibitorBenefits = ({items, ...rest}) => (
    <Wrapper {...rest}>
        <GridBenefits baseLabel="exhibitors.benefits" items={items} />
    </Wrapper>
)

ExhibitorBenefits.defaultProps = {
    items : _items
}

export default ExhibitorBenefits
