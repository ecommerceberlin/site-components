import Wrapper from '../components/Wrapper'
import Faq from '../components/Faq'

const WidgetFaq = ({label, secondaryLabel, ...faqProps}) => (

        <Wrapper 
            label={label}
            secondaryLabel={secondaryLabel}
        >
        <Faq {...faqProps}/>
        </Wrapper>
)

WidgetFaq.defaultProps = {
    label: "cfp.faq.name",
    secondaryLabel: "cfp.faq.description",
    baseLabel: "cfp.faq",
    items: [],
    url: "/",
    showTitle: false

}

export default WidgetFaq
