

import _get from 'lodash/get'

export const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

export const getCloudinaryAsset = (url = "", skipVersion = false) => {

    const segments = CLOUDINARY_REGEX.exec(url.trim())

    if(!segments){
        return null;
    }

    return skipVersion ? segments[4] : `v${segments[3]}/${segments[4]}`;
  
} 

export const getContestantOgImage = (participant, template) => {

  const avatar = getCloudinaryAsset(_get(participant, "logotype_cdn"), false) || getCloudinaryAsset(_get(participant, "logotype"), false)

  const avatarTrans = `c_fit,h_220,q_95,w_800`;

  //mark's template fix
  const templateTrans = `g_center,u_${template},x_0,y_11`;

  return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans}/${avatar}.png`;


}


export const getPresenterOgImage = (
    participant,
    template = 'ebe5_template_en'
  ) => {
    
    const avatar = getCloudinaryAsset(_get(participant, "avatar_cdn")) || getCloudinaryAsset(_get(participant, "avatar"));
    const logotype = getCloudinaryAsset(_get(participant, "logotype_cdn"), true) || getCloudinaryAsset(_get(participant, "logotype"), true)

    const avatarTrans = `c_fit,h_200,q_90,r_max,w_200`;
    // const templateTrans = `g_center,u_${template},x_200,y_-25`;
    // const logotypeTrans = `c_fit,g_center,l_${logotype},w_300,h_200,x_175,y_25`;

    //mark's template fix
    const templateTrans = `g_center,u_${template},x_200,y_0`;
    const logotypeTrans = `c_fit,g_center,l_${logotype},w_300,h_200,x_175,y_0`;

    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans}/${logotypeTrans}/${avatar}.png`;
    
};

export const getCallForPapersOgImage = (
    participant,
    template = 'ebe_callforpapers_opengraph_template'
  ) => getPresenterOgImage(participant, template);
    
export const getPresenterFbAd = (
    participant,
    template = 'template_teh19_presenter_pl_square'
  ) => {
    
    const avatar = getCloudinaryAsset(_get(participant, "avatar_cdn")) || getCloudinaryAsset(_get(participant, "avatar"));
    const logotype = getCloudinaryAsset(_get(participant, "logotype_cdn"), true) || getCloudinaryAsset(_get(participant, "logotype"), true)

    const avatarTrans = `c_fit,h_500,q_90,r_max,w_500`;
    const templateTrans = `g_center,u_${template},x_0,y_200`;
    const logotypeTrans = `c_fit,g_center,l_${logotype},w_600,h_250,x_0,y_220`;

    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans}/${logotypeTrans}/${avatar}.png`;
    
};

/*


export const getPresenterOgImage = (
  participant,
  template = 'xxxx'
) => {
  const avatarTrans = `g_west,x_150,y_25,w_220,h_220,l_p_${
    participant.id
  }_avatar,c_fit,r_max`;
  const logotypeTrans = `g_east,x_150,y_25,w_220,h_220,l_p_${
    participant.id
  }_logotype,c_fit`;

  return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${logotypeTrans}/${template}.png`;
};


export const getPresenterFbAd = (
  participant,
  template = 'template_speaker_teh15_square'
) => {
  const avatarTrans = `g_north,x_-100,y_150,w_450,h_450,l_p_${
    participant.id
  }_avatar,c_fit,r_max`;
  const logotypeTrans = `g_south,x_-100,y_250,w_350,h_250,l_p_${
    participant.id
  }_logotype,c_fit`;

  return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${logotypeTrans}/${template}.png`;
};


*/