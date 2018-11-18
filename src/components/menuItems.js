const menuItems = [
  
  {
    name: 'general',
    items: [
      {
        name: 'home',
        to: '/'
        //  icon : <IconSetting />
      },
    ]
  },

  {
    name: 'visitors',
    items: [
      {
        name: 'visit',
        to: '/visit'
        //  icon : <IconSetting />
      },
      {
        name: 'schedule',
        to: '/schedule'
        //    icon : <IconLogistics />
      },
      {
        name: 'presenters',
        to: '/presenters'
        //      icon : <IconPeople />
      },
      {
        name: 'exhibitors',
        to: '/exhibitors'
        //      icon : <IconPeople />
      },
      {
        name: 'offers',
        to: '/offers'
        //      icon : <IconPeople />
      }
    ]
  },
  {
    name: 'exhibitors',
    items: [
      {
        name: 'exhibitors',
        to: '/exhibitors'
        //  icon : <IconSetting />
      },
      {
        name: 'exhibit',
        to: '/exhibit'
        //      icon : <IconPeople />
      },
      {
        name: 'faq',
        to: '/faq'
        //    icon : <IconLogistics />
      }
    ]
  }
];

export default menuItems;
