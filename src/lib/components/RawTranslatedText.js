import {translate} from '../i18n'

const RawTranslatedText = ({label, translate, locale, ...rest}) => {

    if(label) {
       return translate(label)
    }

    if(locale in rest){
        return rest[locale]
    }

    return "en" in rest ? rest["en"] : "_untranslated_"
}


export default translate(RawTranslatedText)