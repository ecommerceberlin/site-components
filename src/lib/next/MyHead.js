import React from 'react';
import NextHead from 'next/head';
import { withRouter } from 'next/router';
import { string } from 'prop-types';
import { translate } from '../i18n';
import { fullUrl, prepareForTranslate, canonical } from '../helpers';
import compose from 'recompose/compose';
import {Settings} from '../datasources/Settings'
import  {theme}  from '../material-ui';

const MyHead = ({
  title,
  titleLabel,
  description,
  descriptionLabel,
  url,
  image,
  width,
  height,
  fb_appid,
  translate,
  children,
  router
}) => {


  const titleLabelParams = prepareForTranslate(titleLabel);
  const descriptionLabelParams = prepareForTranslate(descriptionLabel);

  const tTitle =
    titleLabel && titleLabelParams.str
      ? translate(titleLabelParams.str, titleLabelParams.params)
      : title;
  const tDescription =
    descriptionLabel && descriptionLabelParams
      ? translate(descriptionLabelParams.str, descriptionLabelParams.params)
      : description;

  const prefixedUrl = fullUrl(url);

  //console.log(router.asPath);

  return (
    <meta key="google-translate" name="google" content="notranslate" />

  )

  return (


    // <Settings>{(get) => ( 

          <NextHead>
   
          <title>{tTitle}</title>
      
          <meta key="charset" charSet="UTF-8" />
          <meta key="google-translate" name="google" content="notranslate" />
    
          <link key="ati_57" rel="apple-touch-icon" sizes="57x57" href="/public/apple-icon-57x57.png"/>
          <link key="ati_60" rel="apple-touch-icon" sizes="60x60" href="/public/apple-icon-60x60.png"/>
          <link key="ati_72" rel="apple-touch-icon" sizes="72x72" href="/public/apple-icon-72x72.png"/>
          <link key="ati_76" rel="apple-touch-icon" sizes="76x76" href="/public/apple-icon-76x76.png"/>
          <link key="ati_114" rel="apple-touch-icon" sizes="114x114" href="/public/apple-icon-114x114.png"/>
          <link key="ati_120" rel="apple-touch-icon" sizes="120x120" href="/public/apple-icon-120x120.png"/>
          <link key="ati_144" rel="apple-touch-icon" sizes="144x144" href="/public/apple-icon-144x144.png"/>
          <link key="ati_152" rel="apple-touch-icon" sizes="152x152" href="/public/apple-icon-152x152.png"/>
          <link key="ati_180" rel="apple-touch-icon" sizes="180x180" href="/public/apple-icon-180x180.png"/>
          <link key="icon_192" rel="icon" type="image/png" sizes="192x192"  href="/public/android-icon-192x192.png"/>
          <link key="icon_32" rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png"/>
          <link key="icon_96" rel="icon" type="image/png" sizes="96x96" href="/public/favicon-96x96.png"/>
          <link key="icon_16" rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png"/>
          <link key="manifest" rel="manifest" href="/public/manifest.json"/>
          <meta key="msa_tc" name="msapplication-TileColor" content="#ffffff"/>
          <meta key="msa_ti" name="msapplication-TileImage" content="/public/ms-icon-144x144.png"/>
          <meta key="theme-color" name="theme-color" content="gold"/>
    
          


{/* PWA primary color */}
<meta name="theme-color" content={theme.palette.primary.main} />

<script

async
src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM}`}
/>

<script
dangerouslySetInnerHTML={{
__html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GTM}');
`
}}
/>

<link
rel="stylesheet"
href="https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500&subset=latin,latin-ext"
/>

<link
rel="stylesheet"
href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700,800,900&subset=latin,latin-ext"
/>




          <meta
          key="viewport"
          name="viewport"
          content={
          'user-scalable=0, initial-scale=1, ' +
          'minimum-scale=1, width=device-width, height=device-height'
          }
          />
    
    
          <meta key="description" name="description" content={tDescription} />
    
    
          {/* <link rel="icon" sizes="192x192" href="/public/touch-icon.png" />
          <link rel="apple-touch-icon" href="/public/touch-icon.png" />
          <link rel="mask-icon" href="/public/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/public/favicon.ico" /> */}
          
          <meta key="og_url" name="og:url" content={prefixedUrl} />
          <meta key="og_title" name="og:title" content={tTitle || ''} />
          <meta key="og_description" name="og:description" content={tDescription} />
          <meta key="twitter_site" name="twitter:site" content={prefixedUrl} />
          <meta key="twitter_card" name="twitter:card" content="summary_large_image" />
    
          <meta key="twitter_image" name="twitter:image" content={image} />
          <meta key="og_image" property="og:image" content={image} />
    
          <meta key="og_image_width" name="og:image:width" content={width} />
          <meta key="og_image_height" name="og:image:height" content={height} />
    
          <meta key="og_type" name="og:type" content="website" />
          <meta key="og_fbappid" name="fb:app_id" content={fb_appid} />
    
          <link key="canonical" rel="canonical" href={canonical(prefixedUrl)} />
    
          {children}

    </NextHead>

  // )}</Settings> 
  
)}

MyHead.defaultProps = {
  title: '',
  titleLabel: 'event.opengraph.name',
translate: function(){},
  width: 960,
  height: 504,
  fb_appid: '222959121587772',

  description: '',
  descriptionLabel: 'event.opengraph.description',

  image: "https://res.cloudinary.com/ecommerceberlin/image/upload/c_limit,w_1024/v1546943854/ebe_og_home.jpg",
  url: fullUrl('/')
};

MyHead.propTypes = {
  //  title: string,
  description: string,
  url: string,
  image: string
};

const enhance = compose(
  withRouter,
  translate
);

export default MyHead;// enhance(MyHead);
