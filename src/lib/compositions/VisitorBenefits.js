
import {GridBenefits, Wrapper} from '../components'
import {
    FaWrench as Edu,
    FaHandshake as Handshake,
    FaLockOpen as Free,
    FaSearch as Landscape,
    FaChartLine as Trends,
    FaPiggyBank as Savings,
    FaDotCircle as Target
} from 'react-icons/fa';



//target - for whom




const _items = [

    {
        icon : Free,
        label :  'free_entry',
    },

    {
        icon : Savings,
        label : 'special_offers'
    },

    {
        icon : Landscape,
        label : 'insight'
    },

    {   
        icon : Edu,
        label : 'case_studies'
    },

    {   
        icon : Handshake,
        label : 'networking'
    },

    {   
        icon : Trends,
        label : 'future'
    }
]


const VisitorBenefits = ({items, ...rest}) => (
    <Wrapper {...rest}>
        <GridBenefits baseLabel="visitors.benefits" items={items} />
    </Wrapper>
)

VisitorBenefits.defaultProps = {
    items : _items
}

export default VisitorBenefits
