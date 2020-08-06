import { slug } from './text';

export const getUrlParams = (search = '') => {
  if (typeof search !== 'string' || search.charAt(0) !== '/') {
    return {};
  }

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

export const fullUrl = subpage => {
  const prefix = `https://${process.env.NEXT_PUBLIC_PROJECT}`;
  if (subpage.substr(0, prefix.length) !== prefix) {
    return prefix + subpage;
  }

  return subpage;
};

export const canonical = url => url;
