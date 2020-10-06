import _get from 'lodash/get';
import _filter from 'lodash/filter';
 
export const getCompanyProfileInfo = (company, key, replacement = "") => _get(company, `profile.${key}`, replacement);

export const getCompanyName = (company) => {
  const profileName = getCompanyProfileInfo(company, "name")
  if(profileName.length > 1)
  {
    return profileName
  }
  return _get(company, 'slug', '')
} 

export const getSpeakerName = (speaker) => {
  if(speaker && "presenter" in speaker && speaker.presenter.length > 2){
    return speaker.presenter;
  }

  return `${_get(speaker, 'fname')} ${_get(speaker, 'lname')}`;
} 

export const getSpeakerAvatar = (speaker, params = ['c_fit'], size = 250) => getParticipantCdn(_get(speaker, 'avatar_cdn'), size, params) || getParticipantCdn(_get(speaker, 'avatar'), size, params) || '/avatar-placeholder.png';

export const getSpeakerLogotype = (speaker, params = ['c_fit'], size = 300) =>  getParticipantCdn(_get(speaker, 'logotype_cdn'), size, params) || getParticipantCdn(_get(speaker, 'logotype'), size, params) || '/avatar-placeholder.png';

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

};

export const getParticipantCdn = (url, size = 100, params = ['c_fit']) => {

  if (!url || ! /cloudinary/.test(url)) {
    return false;
  }
  const paramsStr = params.length ? `${params.join(",")},` : 'c_fit,'
  return url.trim().replace(/\.svg/, '.png').replace("image/upload/", `image/upload/${paramsStr}e_grayscale,w_${size},h_${size}/`);
};

export const getInviteOgImage = (text = '') => {
  text = text.replace(',', ' ');
  text = text.replace('/', ' ');

  return `https://res.cloudinary.com/eventjuicer/image/upload/w_0.9,c_scale,fl_relative,l_text:Roboto_300_bold:${encodeURIComponent(
    text
  )},g_north,y_40,co_rgb:000000,f_auto/v1580869613/ebe5_visitor_template.jpg`;
};
 
export const filterCompanyInstances = (company, eventId) =>
  _filter(company, function(i) {
    if (i.event_id == eventId && i.formdata && 'id' in i.formdata && i.sold) {
      return true;
    }

    return false;
});
