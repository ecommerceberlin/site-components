import _chunk from 'lodash/chunk';
import _shuffle from 'lodash/shuffle';
import _filter from 'lodash/filter';
import _uniqBy from 'lodash/uniqBy';
import _get from 'lodash/get';
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { identity } from 'lodash';

export const collator = new Intl.Collator('pl-PL', {numeric: true, sensitivity: 'base'});

// export const parseUrlVals = url => _uniqBy(url.split(',')).filter(x => x);

export const changeLimitForScreen = (maxLimit, width = null, gridData = {}) => {
  if (!width) {
    return maxLimit;
  }
  const defaultGgridData = { xs: 6, sm: 6, md: 4, lg: 3, xl: 3 };
  const grid = { ...defaultGgridData, ...gridData };
  if (!width in grid) {
    return maxLimit;
  }
  const current = 12 / grid[width];
  return maxLimit % current === 0
    ? maxLimit
    : Math.floor(maxLimit / current) * current;
};

export const validateToken = token => {
  return /^[a-z0-9]{32,40}$/.test(token);
};

export const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const lsGet = key => JSON.parse(localStorage.getItem(key));

export const lsSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const ssGet = key => JSON.parse(sessionStorage.getItem(key));

export const ssSet = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));


export const addToken = token => {
  const tokens = lsGet('tokens') || [];

  if (tokens.indexOf(token) === -1) {
    tokens.push(token);
    lsSet('tokens', tokens);
  }
};

export const isBigScreen = width => {
  return width === 'xl' || width === 'lg';
};

export const filterFuncFromArr = (arr) => {

  if(isFunction(arr)){
    return arr;
  }

  if(!Array.isArray(arr)){
    return null;
  }

  return function(item){

    let isOk = true;
    
    arr.forEach(func => {

      if(!isOk){
        //do not run more tests if previous fails...
        return;
      }

      if(isFunction(func)){
        isOk = func(item)
      }else{
        const [path, expectedValue, comparator = "="] = func
        const value = _get(item, path)

        switch(comparator){
        case "=":
        case "==":
        case "===":
        case "equals":
          if(value != expectedValue){
            isOk = false
          }
        break
        case ">":
        case "gt":
          if(value <= expectedValue){
            isOk = false
          }
        break
        case "<":
        case "lt":
          if(value >= expectedValue){
            isOk = false
          }
        break
        case "contains":
        case "has":
        case "includes":
        if(!isString(value) || !value.includes(expectedValue)){
          isOk = false
        }
        break
        case "length":
        case "minLength":
        if(!isString(value) || value.length <= expectedValue){
          isOk = false
        }
        break

        }
      }

      
    })
    return isOk;
  }
}


export const processArrayData = (data = [], { sort = null, dir="ASC", filter = null, limit = null, random = null, skip = 0 }) => {
  
  if (!Array.isArray(data)) {
    return [];
  }

  if(filter){
    filter = filterFuncFromArr(filter)
    data = data.filter(row => filter(row));
  }

  if(sort){

    if(dir && dir.toUpperCase() === "DESC"){
      data.sort((a, b) => collator.compare(_get(b, sort), _get(a, sort)))
    }else{
      data.sort((a, b) => collator.compare(_get(a, sort), _get(b, sort)))
    }
  }


  //it cannot be used server side and client side!!!

  if (typeof window !== 'undefined' && random) {
    data = _shuffle(data);
  }

  if(skip){
    data = data.slice(skip);
  }

  if (limit && data.length > limit) {
    data = data.slice(0, limit);
  }

  return data;
};

export const chunkArrayData = (data = [], width = 'md') => {

  let chunks;

  switch (width) {
    case 'xs':
      chunks = 1;
      break;

    case 'sm':
      chunks = 2;
      break;

    case 'md':
      chunks = 3;
      break;

    case 'lg':
      chunks = 4;
      break;

    case 'xl':
      chunks = 4;
      break;

    default:
      chunks = 2;
  }

  const chunkSize = Math.round(data.length / chunks);

  data = chunkSize ? _chunk(data, chunkSize) : data;

  return data;
};


export const getGalleryImageSize = (width) => {

  let c;
  let h;

  switch (width) {
    case 'xs':
      c = 1.5;
      h = 300;
      break;
    case 'sm':
      c = 1.5;
      h = 450;
      break;
    case 'md':
      c = 2.5;
      h = 550;
      break;
    case 'lg':
      c = 2.5;
      h = 700;
      break;
    case 'xl':
      c = 3.5;
      h = 800;
      break;
    default:
      c = 3.5;
      h = 800;
  }

  return { c, h, width };
}
