import React from 'react';
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Wrapper from '../components/Wrapper'
import { useTranslate } from '../i18n';
import StageOverview from '../components/StageOverview'
import StageContent from '../components/StageContent'
import StagesOther from '../components/StagesOther'
import StageSponsors from '../components/StageSponsors'

import DiscordChat from '../components/DiscordChat'
import {useSettings} from '../helpers'
import MyButton from '../components/MyButton'




const useStyles = makeStyles(theme => ({
    stageButton: {
        marginRight: 5
    },
}))

const fetcher = url => fetch(url).then(r => r.json())
const getStage = (stages, stage) => stages && Array.isArray(stages) && stages.length ? stages.find(item => item.presentation_venue === stage.toUpperCase()) : null

// const data = [{"fname":"Marek","lname":"Kich","cname2":"X-Coding IT Studio","avatar":"https:\/\/i.ibb.co\/VvzhDZp\/xcoding-prelegent.jpg","presentation_title":"Jak nie zbankrutowa\u0107 na e-Commerce","bio":"","position":"CEO","profile_twitter":"","video":"https:\/\/vimeo.com\/486409263","logotype":"https:\/\/i.ibb.co\/t4wr546\/logo-transparent.png","presentation_description":"Wej\u015bcie w handel elektroniczny nie jest wcale takie \u0142atwe, jak mo\u017ce si\u0119 wydawa\u0107. Sam wyb\u00f3r rozwi\u0105zania i dostawcy mo\u017ce przyprawi\u0107 o zawr\u00f3t g\u0142owy. A co dopiero gdy w gr\u0119 wejd\u0105 koszty... Na bazie naszego 10-letniego do\u015bwiadczenia na rynku e-Commerce wiemy, w kt\u00f3rych miejscach doszuka\u0107 si\u0119 optymalizacji- i ch\u0119tnie si\u0119 t\u0105 wiedz\u0105 podzielimy. Podczas prezentacji przejdziemy przez wszystkie aspekty, kt\u00f3re sk\u0142adaj\u0105 si\u0119 na ca\u0142kowity koszt wdro\u017cenia. Opowiemy, w kt\u00f3rych miejscach mo\u017cna ci\u0105\u0107 koszty, bez ryzyka wpadki. A co wa\u017cniejsze podpowiemy czego oczekiwa\u0107 i jak weryfikowa\u0107 prac\u0119 firmy wdra\u017caj\u0105cej.","presentation_time":"11:00","presenter":"Marek Kich","custom_admin_1":"1","presentation_venue":"A","profile_facebook":"https:\/\/www.facebook.com\/marek.kich\/","profile_linkedin":"https:\/\/www.linkedin.com\/in\/marek-kich\/","cfp_category":"start","featured":"","avatar_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580997343\/p_109158_avatar.jpg","logotype_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580997292\/p_109158_logotype.png","video_length_minutes":"23","id":109158},{"fname":"Karol","lname":"Wilczy\u0144ski","cname2":"Artefakt","avatar":"https:\/\/i.ibb.co\/nMgdrkG\/Karol.png","presentation_title":"Jak uzyska\u0107 700% wzrostu dzi\u0119ki prawid\u0142owym dzia\u0142aniom w e-commerce","bio":"","position":"Starszy Specjalista SEO","profile_twitter":"https:\/\/twitter.com\/rndmgoogleuser","video":"https:\/\/vimeo.com\/504753380","logotype":"https:\/\/files.tinypic.pl\/i\/00997\/5hnfpyvmbnve.jpg","presentation_description":"Systemy e-commerce zyskuj\u0105 na popularno\u015bci. S\u0105 elastyczne, pozwalaj\u0105 zbudowa\u0107 imponuj\u0105ce interfejsy i zapewni\u0107 szybkie dzia\u0142anie. Jednak jak ka\u017cda nowa technologia nios\u0105 ze sob\u0105 zagro\u017cenia, kt\u00f3rych zaniedbanie mo\u017ce zahamowa\u0107 rozw\u00f3j Twojego biznesu.\r\nZapraszamy Ci\u0119 na prelekcj\u0119, na kt\u00f3rej dowiesz si\u0119 jak rozpozna\u0107 i poradzi\u0107 sobie z najwi\u0119kszymi zagro\u017ceniami. Przedstawimy CASE STUDY, kt\u00f3re pomog\u0142o naszemu klientowi odnotowa\u0107 wzrost o 700%!","presentation_time":"12:04","presenter":"Karol Wilczy\u0144ski","custom_admin_1":"0","presentation_venue":"B","profile_facebook":"https:\/\/www.facebook.com\/artefaktpl","profile_linkedin":"https:\/\/pl.linkedin.com\/in\/karol-wilczy%C5%84ski-8251aba9","cfp_category":"itsolutions","featured":"1","avatar_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1581436654\/p_110010_avatar.png","logotype_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580903958\/p_110010_logotype.jpg","video_length_minutes":"15","id":110010},{"fname":"Konrad","lname":"Latkowski","cname2":"Beesfund.com","avatar":"https:\/\/i.ibb.co\/RBPkdDz\/A-Regiec-Beesfund-m.jpg","presentation_title":"Crowdfunding udzia\u0142owy jako \u017ar\u00f3d\u0142o finansowania rozwoju twojego sklepu","bio":"","position":"CEO","profile_twitter":"https:\/\/twitter.com\/beesfund","video":"https:\/\/vimeo.com\/489820516","logotype":"https:\/\/i.ibb.co\/nBYXRZt\/1920px-Beesfund-logo-2019-svg.png","presentation_description":"Ani milion\u00f3w na innowacje, ani do tanich kredyt\u00f3w, rynek e-commerce w Polsce nie ma dost\u0119pu. Jest ewidentna luka finansowania rozwoju sklep\u00f3w, dla kt\u00f3rych odpowiedzi\u0105 mo\u017ce by\u0107 spo\u0142eczno\u015bciowe finansowanie udzia\u0142owe czyli equity crowdfunding. Dwa pierwsze sklepy ju\u017c to przetestowa\u0142y. Ile zebra\u0142y? Od kogo? Ile je to kosztowa\u0142o?","presentation_time":"12:22","presenter":"Arkadiusz Regiec","custom_admin_1":"3","presentation_venue":"C","profile_facebook":"https:\/\/www.facebook.com\/Beesfund\/","profile_linkedin":"","cfp_category":"payments","featured":"","avatar_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1601553578\/p_110707_avatar.jpg","logotype_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580904816\/p_110707_logotype.png","video_length_minutes":"34","id":110707},{"fname":"Artur","lname":"Marsy","cname2":"feeCOMPASS","avatar":"https:\/\/i.ibb.co\/WncbTmR\/MG-4480-01.jpg","presentation_title":"Klient z trafn\u0105 spersonalizowan\u0105 rekomendacj\u0105 ma konwersj\u0119 wy\u017csz\u0105 o 35%. Jak wykorzysta\u0107 wiedz\u0119 sprzedawc\u00f3w i AI, aby to osi\u0105gn\u0105\u0107?","bio":"","position":"Co-founder & CEO","profile_twitter":"","video":"https:\/\/vimeo.com\/486409434","logotype":"https:\/\/i.ibb.co\/994FH9r\/feecompaslogo.png","presentation_description":"Bogaty asortyment przyci\u0105ga nowych klient\u00f3w i zwi\u0119ksza obroty. Z drugiej strony wyb\u00f3r najlepszej oferty z szerokiej lub skomplikowanej gamy produkt\u00f3w do \u0142atwych nie nale\u017cy. Wielu klient\u00f3w, przyt\u0142oczonych liczb\u0105 produkt\u00f3w, nie zamyka sprzeda\u017cy. Jak mo\u017cesz im pom\u00f3c ?\r\nBadania pokazuj\u0105, \u017ce prezentacja mniejszej, lecz lepiej dobranej liczby ofert sprawia, \u017ce 10-krotnie wi\u0119cej klient\u00f3w finalnie decyduje si\u0119 na zakup. Pozostaje pytanie, kt\u00f3re z nich pokaza\u0107 konkretnemu klientowi ?\r\nPodczas prezentacji opowiemy, w jaki spos\u00f3b rozwi\u0105za\u0107 sprzeczno\u015b\u0107: \u201cdu\u017co produkt\u00f3w by przyci\u0105gn\u0105\u0107 klienta - kilka produkt\u00f3w, aby zamkn\u0105\u0107 sprzeda\u017c\u201d. Om\u00f3wimy r\u00f3\u017cne podej\u015bcia: skutecznego sprzedawc\u0119, model samoobs\u0142ugowy, inteligentne rekomendacje oraz chatbota sprzeda\u017cowego, dzia\u0142aj\u0105cego w modelu: s\u0142ucham - polecam - t\u0142umacz\u0119.\r\nZaprezentujemy, jak po\u0142\u0105czy\u0107 wiedz\u0119 dobrego doradcy o produktach, si\u0142\u0119 uczenia maszynowego i wyra\u017canych opinii klient\u00f3w do skutecznej prezentacji ofert pod potrzeby konkretnego odbiorcy. Wyja\u015bnimy, jakie ograniczenia maj\u0105 stosowane metody i w jakich sytuacjach najzwyczajniej nie zadzia\u0142aj\u0105. A na koniec - jakiego rz\u0119du wynik\u00f3w mo\u017cna si\u0119 spodziewa\u0107.\r\nPo prezentacji b\u0119dziesz w stanie oceni\u0107 jakie podej\u015bcie b\u0119dzie najskuteczniejsze dla specyfiki Twojego sklepu i podj\u0105\u0107 decyzj\u0119, kiedy warto skorzysta\u0107 z tego rozwi\u0105zania we w\u0142asnym eCommerce.","presentation_time":"12:04","presenter":"Piotr Buszka","custom_admin_1":"1","presentation_venue":"D","profile_facebook":"","profile_linkedin":"https:\/\/www.linkedin.com\/in\/piotr-buszka-315776\/","cfp_category":"sales_generation","featured":"","avatar_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580920367\/p_111402_avatar.jpg","logotype_cdn":"https:\/\/res.cloudinary.com\/eventjuicer\/image\/upload\/v1580920369\/p_111402_logotype.png","video_length_minutes":"15","id":111402}]


const ListOfStages = ({stage="", stages = []}) => {
    const classes = useStyles()
    const [translate] = useTranslate()
    return (<Box mb={3} mt={3}><Grid container spacing={1} alignItems="center">
        <Grid item>{translate("common.stages")}</Grid>
        <Grid item>{
        stages.map(item => <MyButton className={classes.stageButton} color={stage==item? 'secondary': 'secondary'} variant={stage==item? 'contained': 'outlined'} key={item} href={`/stages/${item.toLowerCase()}`} label={item} />)
        }</Grid></Grid></Box>)
}

const WidgetStage = ({stage, setting}) => {

    // const [translate] = useTranslate()
    // const classes = useStyles()
    const {api, stages = {}} = useSettings(setting, {});
    stage = stage.toUpperCase()

    //AGENDA
    const { data, error } = useSWR(api, fetcher, { 
        refreshInterval: 30*1000, //pull every 10 seconds
        refreshWhenHidden: false 
    })

    const current = getStage(data, stage)

    return (<Wrapper label={["streaming.stage.title", {name: stage}]} dense={true}> 
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                       {current && <StageOverview setting={setting} data={current} stage={stage} />}
                        <StageContent setting={setting} stage={stage} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                        
                        <StageSponsors setting={setting} stage={stage} />

                        <DiscordChat setting={setting} stage={stage} />
                        <ListOfStages setting={setting} stage={stage} stages={Object.keys(stages)} />         
                       
                        {/* <Divider /> */}
                        <StagesOther setting={setting} data={data} stage={stage} />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={7} lg={12} xl={12} ></Grid> */}
                </Grid>
    </Wrapper>)
   
}

WidgetStage.defaultProps = {
   stage: "",
   setting: "streaming",
}

export default WidgetStage