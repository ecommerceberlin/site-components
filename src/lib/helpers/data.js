import _get from 'lodash/get';
import _filter from 'lodash/filter';
import { getUrlParams } from './links';

export const defaultLocale = 'pl';
 
export const getCompanyProfileInfo = (company, key) =>
  _get(company, `profile.${key}`, '');


export const getCompanyName = (company) => {
  const profileName = getCompanyProfileInfo(company, "name")
  if(profileName.length > 1)
  {
    return profileName
  }
  return _get(company, 'slug', '')
} 

/**
 * https://raw.githubusercontent.com/eventjuicer/site/5452259d2cac068638919b2a27e2ee594aee0b6e/helpers/data.js
 */

export const getSpeakerName = (speaker) => {
  if(speaker && "presenter" in speaker && speaker.presenter.length > 2){
    return speaker.presenter;
  }

  return `${_get(speaker, 'fname')} ${_get(speaker, 'lname')}`;
} 


export const getSpeakerAvatar = (speaker, params = ['c_fit'], size = 250) => getParticipantCdn(_get(speaker, 'avatar_cdn'), size, params) || getParticipantCdn(_get(speaker, 'avatar'), size, params) || '/static/avatar-placeholder.png';

export const getSpeakerLogotype = (speaker, params = ['c_fit'], size = 300) =>  getParticipantCdn(_get(speaker, 'logotype_cdn'), size, params) || getParticipantCdn(_get(speaker, 'logotype'), size, params) || '/static/avatar-placeholder.png';

/**
 * END
 */


export const resizeCloudinaryImage = (url, width = 600, height = 600, format = "jpg") => {

  //check if not already resized!
  if (url && /cloudinary/.test(url) && /image\/upload\/v[0-9]+/.test(url)) {
    return url.replace(/\.svg$/i, `.${format}`).replace("image/upload/", `image/upload/w_${width},h_${height},c_fit/`);
  }

  return url; //do nothing!
}

export const getCdnResource = (company, key, scale = true) => {
  const cdn = getCompanyProfileInfo(company, `${key}_cdn`);

  return scale ? resizeCloudinaryImage(cdn, 600, 600, "png") : cdn.replace(/\.svg$/i, '.png');

  // if (cdn && /cloudinary/.test(cdn)) {
  //   const noSvg = cdn.replace(/\.svg/i, '.png');
  //   return !scale ? noSvg : noSvg.replace("image/upload/", 'image/upload/w_600,h_600,c_fit/');
  // }
  // return false;
};

export const getParticipantCdn = (url, size = 100, params = ['c_fit']) => {

  if (!url || ! /cloudinary/.test(url)) {
    return false;
  }

  const paramsStr = params.length ? `${params.join(",")},` : 'c_fit,'

  return url.trim().replace(/\.svg/, '.png').replace("image/upload/", `image/upload/${paramsStr}e_grayscale,w_${size},h_${size}/`);
  //  `https://res.cloudinary.com/ecommerceberlin/image/upload/c_fit,e_grayscale,w_${size},h_${size}/p_${participant_id}_${what}.png`;
};

export const getInviteOgImage = (text = '') => {
  text = text.replace(',', ' ');
  text = text.replace('/', ' ');

  return `https://res.cloudinary.com/eventjuicer/image/upload/w_0.9,c_scale,fl_relative,l_text:Roboto_300_bold:${encodeURIComponent(
    text
  )},g_north,y_40,co_rgb:000000,f_auto/v1550158922/ebe_template_visitor.jpg`;
};




export const getCompanyAltOgImage = (company, url) => {
  const params = getUrlParams(url);

  //logotype is default....is we have something different we try to use it
  if (
    'utm_content' in params &&
    params.utm_content.indexOf('logotype') === -1
  ) {
    //clear parameters utm_content params?
    const cdn = getCdnResource(company, params.utm_content, false);
    const version = getCdnAssetVersion(cdn);

    if (cdn) {
      return wrapImage(
        `c_${company.id}_${params.utm_content}`,
        version,
        'template_raw',
        'c_fit,h_504,w_960'
      );
    }
  }

  return getCompanyOgImage(company, url);
};

export const getCdnAssetVersion = (url) => {

  const version = /\/v(\d+|\w{1,2})\//.exec(url)

  return version ? `v${version[1]}` : "";

} 

export const getCompanyLogotype = (company, scale = true) => {
  const cdn = getCdnResource(company, 'logotype', true);

  if (cdn) return cdn;

  const original = getCompanyProfileInfo(company, 'logotype');
  if (original && /^http/.test(original)) return original;

  return '/static/logo-placeholder.jpg';
};

export const wrapImage = (
  overlayImage,
  overlayImageVersion,
  baseImage,
  params = `c_fit,h_270,w_800`,
  baseImageParams = ''
) => {

  /* 
  http://res.cloudinary.com/demo/image/upload/w_90,g_center/u_coffee_cup,w_400,h_250,c_fill,g_south/fl_layer_apply/nice_couple.jpg
  */

  return `https://res.cloudinary.com/eventjuicer/image/upload/${params}/u_${baseImage},${baseImageParams}/${overlayImageVersion}/${overlayImage}.jpg`; 

  //return `https://res.cloudinary.com/ecommerceberlin/image/upload/c_fit,l_${overlayImage},${params}/${overlayImageVersion}/${baseImage}.png`;
};

export const getCompanyOgImage = (company, url) => {

  const params = getUrlParams(url);
  const cdn = getCdnResource(company, 'logotype', false);
  const version = getCdnAssetVersion(cdn);

  if (!cdn) {
    return getCompanyLogotype(company, true);
  }

  let companyLang = getCompanyProfileInfo(company, 'lang') || defaultLocale;

  //use the lang forced by utm_content!

  if('utm_content' in params){
    //temp solution!
    if(params.utm_content.indexOf(",en") > -1){
      companyLang = "en";
    }

    if(params.utm_content.indexOf(",de") > -1){
      companyLang = "de";
    }

    if(params.utm_content.indexOf(",pl") > -1){
      companyLang = "pl"; 
    }
  }
  
  return wrapImage(
    `c_${company.id}_logotype`, 
    version,
    `ebe_template_${companyLang}`,
    undefined,
    'y_-30'
    );
};

export const filterCompanyInstances = (company, eventId) =>
  _filter(company, function(i) {
    if (i.event_id == eventId && i.formdata && 'id' in i.formdata && i.sold) {
      return true;
    }

    return false;
  });
