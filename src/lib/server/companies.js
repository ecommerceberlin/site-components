const fetch = require('isomorphic-unfetch');
const slugify = require('slugify');

function slug(str = '', replacement = '-'){
  return slugify(str, {
    replacement: replacement,
    remove: null,
    lower: true
  })
}

async function companies() {

    const data = await fetch("https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com/allexhibitors").then(response => response.json());
    
    if("data" in data && Array.isArray(data.data)){

      return data.data.filter(item => "name" in item.profile &&  item.profile.name.length > 2).map(item => {

        return `/${slug(item.profile.name)},c,${item.id}`

      })

    }

    return [];
}

module.exports = companies