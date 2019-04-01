const sm = require('sitemap')
const path = require('path')
const companies = require('./companies')

const sitemap = sm.createSitemap({
  hostname: 'https://ecommerceberlin.com',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = ({ server }) => {

  companies().then(data => 
    
    data.forEach(url => sitemap.add({
              url,
              changefreq: 'weekly',
              priority: 0.9
    }))
  )
  
  sitemap.add({
    url: '/visit',
    changefreq: 'daily',
    priority: 1
  })

  sitemap.add({
    url: '/exhibitors',
    changefreq: 'daily',
    priority: 1
  })

//   sitemap.add({
//     url: '/presenters',
//     changefreq: 'daily',
//     priority: 1
//   })

//   sitemap.add({
//     url: '/speaking',
//     changefreq: 'daily',
//     priority: 1
//   })

//   sitemap.add({
//     url: '/faq',
//     changefreq: 'daily',
//     priority: 1
//   })

  sitemap.add({
    url: '/exhibit',
    changefreq: 'daily',
    priority: 1
  })

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end()
        return
      }

      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'robots.txt'))
  })
}

module.exports = setup