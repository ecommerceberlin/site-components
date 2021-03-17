import { slug } from './text';

export const getUrlParams = (search = '') => {
  if (typeof search !== 'string' || !search.includes("?")) {
    return {};
  }
  //search.charAt(0) !== '/' 
  const hashes = search.slice(search.indexOf(`?`) + 1).split(`&`);
  return hashes.reduce((acc, hash) => {
    const [key, val] = hash.split(`=`);
    return {
      ...acc,
      [key]: decodeURIComponent(val)
    };
  }, {});
};

export const generateLinkParams = (name, subpage, id) => ({
  as: `/${slug(name)},${subpage.charAt(0)},${id}`,
  href: `/${subpage}?id=${id}`
});

export const generateSlugLinkParams = (prefix, param) => ({
  as: `/${prefix}/${slug(param)}`,
  href: `/${prefix}?slug=${param}`
});

export const fullUrl = path => {
  const domain = `https://${process.env.NEXT_PUBLIC_PROJECT}`;
  return `${domain}/${ path.replace(/^\/|\/$/g, '') }`;
};

export const canonical = url => url;
