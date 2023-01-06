import React from 'react';
import Grid from '@material-ui/core/Grid';
import _get from 'lodash/get';
import Person from './Person';
import {useSettings } from '../helpers'
import isFunction from 'lodash/isFunction'
import { 
  getSpeakerName,
  getSpeakerAvatar,
} from '../helpers';




const FullJobInfo = ({ company, job }) => {

  if(!company && !job){
    return null
  }


  return (
    <span>
      {job} @ <strong>{company}</strong>
    </span>
  );
}


const defaultProps = {

  gridData : { xs: 6, sm: 6, md: 4, lg: 3, xl: 3 },
  data: [],
  title : (item) => getSpeakerName(item),
  link: (item) => `/speakers/${item.id}`,
  subtitle : (item) => <FullJobInfo company={_get(item, 'cname2')} job={_get(item, 'position')} />,
  text : (item) => {

    const bio = `${_get(item, 'bio', "")}`

    if(!bio){
      return null
    }

    if(bio.length < 350){
      return bio
    }

    return `${ bio.substring(0, 350) }... `

  },
  voted : {},
  moreLabel : "common.more"
};


const People = ({setting, ...props}) => {

  const settings = useSettings(setting)
  const {data, gridData, link, title, subtitle, text, voted, moreLabel} = Object.assign({}, defaultProps, settings, props)

  return (<Grid container spacing={6}>{data.map(item => {

      return (
        <Grid key={_get(item, 'id')} item {...gridData}>
          <Person
            setting={setting}
            key={_get(item, 'id')}
            id={_get(item, 'id')}
            avatar={ getSpeakerAvatar(item) }
            title={ isFunction(title)? title(item): title }
            subtitle={ isFunction(subtitle)? subtitle(item): subtitle}
            text={ isFunction(text)? text(item): text }
            link={ isFunction(link)? link(item): null}
            mark={_get(item, "id", 0) in voted}
            moreLabel={moreLabel}
          />
        </Grid>
      )

    })}
  </Grid>)

}


export default People;