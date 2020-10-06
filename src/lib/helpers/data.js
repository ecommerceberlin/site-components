import _get from 'lodash/get';
import _filter from 'lodash/filter';
import { getUrlParams } from './links';

export const defaultLocale = 'pl';
 
export const getCompanyProfileInfo = (company, key, replacement = "") => _get(company, `profile.${key}`, replacement);


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


export const getSpeakerAvatar = (speaker, params = ['c_fit'], size = 250) => getParticipantCdn(_get(speaker, 'avatar_cdn'), size, params) || getParticipantCdn(_get(speaker, 'avatar'), size, params) || '/avatar-placeholder.png';

export const getSpeakerLogotype = (speaker, params = ['c_fit'], size = 300) =>  getParticipantCdn(_get(speaker, 'logotype_cdn'), size, params) || getParticipantCdn(_get(speaker, 'logotype'), size, params) || '/avatar-placeholder.png';

/**
 * END
 */


export const resizeCloudinaryImage = (url, width = 600, height = 600, format = "jpg") => {

  //check if not already resized!
  if (url && /cloudinary/.test(url) && /image\/upload\/v[0-9]+/.test(url)) {
    return url.replace(/\.svg$/i, `.${format}`).replace("image/upload/", `image/upload/w_${width},h_${height},c_fit,f_auto/`);
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
  )},g_north,y_40,co_rgb:000000,f_auto/v1580869613/ebe5_visitor_template.jpg`;
};



/** 
 * Checked. 
 * getCompanyAltOgImage replacement 
 * */

export const getCompanyOpenGraphImage = (company, template = "", defaultLang = "en") => {
  
  const opengraph_image = getCompanyProfileInfo(company, "opengraph_image")
  const opengraph_image_cdn = getCompanyProfileInfo(company, "opengraph_image_cdn")

  //if we have opengraph_image_cdn - lets serve it!

  if (/cloudinary/.test(opengraph_image_cdn) ){
    return resizeCloudinaryImage(opengraph_image_cdn, 960, 504);
  }

  // if(/http/.test(opengraph_image)){
  //   return opengraph_image;
  // }
 
  return getCompanyOgImage(company, template, defaultLang);
};

export const wrapImage = (
  overlayImage,
  overlayImageVersion,
  baseImage,
  params = `c_fit,h_210,w_800`,
  baseImageParams = ''
) => {

  return `https://res.cloudinary.com/eventjuicer/image/upload/${params}/u_${baseImage},${baseImageParams}/${overlayImageVersion}/${overlayImage}.jpg`; 

};

export const getCompanyOgImage = (company, template="ebe5_template_", defaultLang = "en") => {

  const cdn = getCdnResource(company, 'logotype', false);
  const version = getCdnAssetVersion(cdn);
  const companyLang = getCompanyProfileInfo(company, 'lang') || defaultLang;
 
  return wrapImage(
    `c_${company.id}_logotype`, 
    version,
    `${template}${companyLang}`,
    undefined,
    'y_5'
    );
};


export const getCdnAssetVersion = (url) => {

  const version = /\/v(\d+|\w{1,2})\//.exec(url)

  return version ? `v${version[1]}` : "";

} 

/** end */

 


export const getCompanyLogotype = (company, scale = true, dumb = true) => {
  const cdn = getCdnResource(company, 'logotype', true);

  if (cdn) return cdn;

  const original = getCompanyProfileInfo(company, 'logotype');
  if (original && /^http/.test(original)) return original;

  return dumb ? '/logo-placeholder.jpg' : null;
};



export const filterCompanyInstances = (company, eventId) =>
  _filter(company, function(i) {
    if (i.event_id == eventId && i.formdata && 'id' in i.formdata && i.sold) {
      return true;
    }

    return false;
  });
