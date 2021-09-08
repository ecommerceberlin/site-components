import React from 'react'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {useTranslate} from '../i18n'
import {useRouter} from 'next/router'

const useStyles = makeStyles(theme => ({

    icon: {
        cursor: "pointer",
        '&:hover': {
            color: "red",
        },
    },
    selected: {
        cursor: "pointer",
        color: "red"
    }

}))

const Categories = ({href, keywords, selected, icons, max=200}) => {
    
    const classes = useStyles()
    const [translate] = useTranslate()
    const router = useRouter()

    if(isEmpty(keywords) || !isObject(icons)) return null
    return (<Grid container spacing={3}>{
        keywords.map((keyword) => { 

            return (<Grid key={keyword} item md={2} onClick={() => isFunction(href)? router.push(href(keyword)): null}>
            <Grid container direction="column" alignItems="center">
            <Grid item>{keyword in icons && React.createElement(icons[keyword], {className: selected && keyword===selected? classes.selected: classes.icon, style: {width: '100%', maxWidth: max, height: 'auto'}})}</Grid>
            <Grid item><Typography>{translate(`common.tags.${keyword}`)}</Typography></Grid>
            </Grid>
            </Grid>)

        })
    }</Grid>)

}

export default Categories