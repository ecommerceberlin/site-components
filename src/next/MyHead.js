import NextHead from 'next/head';
import { withRouter } from 'next/router';

import { string } from 'prop-types';
import { translate } from '../i18n';
import { fullUrl, prepareForTranslate, canonical } from '../helpers';
import compose from 'recompose/compose';

 
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
    <NextHead>

      <title>{tTitle}</title>
      <meta name="description" content={tDescription} />


      {/* <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" /> */}
      <meta property="og:url" content={prefixedUrl} />
      <meta property="og:title" content={tTitle || ''} />
      <meta property="og:description" content={tDescription} />
      <meta name="twitter:site" content={prefixedUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta property="og:image" content={image} />

      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />

      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content={fb_appid} />

  

      <link rel="canonical" href={canonical(prefixedUrl)} />

  


      {children}
    </NextHead>
  );
};

MyHead.defaultProps = {
  title: '',
  titleLabel: 'event.opengraph.name',

  width: 960,
  height: 504,
  fb_appid: '222959121587772',

  description: '',
  descriptionLabel: 'event.opengraph.description',

  image: fullUrl('/static/og_teh_default.png'),
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

export default enhance(MyHead);
