import Wrapper from '../components/Wrapper'
import Faq from '../components/Faq'
import Settings from '../datasources/Settings'


const WidgetFaq = ({setting, label, baseLabel, ...defaultFaqProps}) => (

    <Settings>{(get) => {

        const {wrapperProps, ...faqProps} = get(setting)

        return (
            <Wrapper {...{label, baseLabel, ...wrapperProps}}>
            <Faq {...{...defaultFaqProps, ...faqProps}} />
            </Wrapper>
        )
    }}
    </Settings>

      
)

WidgetFaq.defaultProps = {
    label: "cfp.faq.name",
    secondaryLabel: "cfp.faq.description",
    baseLabel: "cfp.faq",
    items: [],
    url: "/",
    showTitle: false,

    setting: ""

}

export default WidgetFaq
