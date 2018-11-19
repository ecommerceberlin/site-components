import slugify from 'slugify';

export const slug = (str = '', replacement = '-') =>
  slugify(str, {
    replacement: replacement,
    remove: null,
    lower: true
  });

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const escapeHtml = text => {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) {
    return map[m];
  });
};

export const stripTags = html => {
  var html = '<p>Some HTML</p>';
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};
