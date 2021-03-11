import isEmpty from 'lodash/isEmpty'


export const prepareForTranslate = src => {
  let str = src;
  let params = {};

  if (Array.isArray(src) && !isEmpty(src) ) {
    
    str = src[0];

    if (typeof src[1] !== 'undefined') {
      params = src[1];
    }
  }

  return { str, params };
};
