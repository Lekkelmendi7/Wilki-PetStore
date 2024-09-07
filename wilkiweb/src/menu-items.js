const menuItems = {
  items: [
    {
      type: 'group',
      children: [
        {
          id: 'Home',
          title: 'Home',
          type: 'item',
          icon: 'feather icon-home',
          url: '/'
        },
        {
          id: 'Products',
          title: 'Produktet',
          type: 'item',
          icon: 'feather icon-package',
          url: '/produktet'
        },
        {
          id: 'AboutUs',
          title: 'Rreth Nesh',
          type: 'item',
          icon: 'feather icon-info',
          url: '/AboutUs'
        },
        {
          id: 'ContactUs',
          title: 'Na Kontaktoni',
          type: 'item',
          icon: 'feather icon-at-sign',
          url: '/ContactUs'
        }
      ]
    },
    {
      id: 'admindashboard',
      title: 'Admin Dashboard',
      type: 'group admin',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Produktet',
          title: 'Produktet',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'ListaEProdukteve',
              title: 'Lista e Produkteve',
              type: 'item',
              url: '/admin/produktet/ListaEProdukteve'
            },
            {
              id: 'Zbritjet',
              title: 'Zbritjet',
              type: 'item',
              url: '/admin/produktet/zbritjet'
            },
            {
              id: 'Kategorite',
              title: 'Kategorite',
              type: 'item',
              url: '/admin/produktet/kategorite'
            },
            {
              id: 'Kompanite',
              title: 'Kompanite',
              type: 'item',
              url: '/admin/produktet/kompanite'
            }
          ]
        },
        {
          id: 'TeNdryshme',
          title: 'Te Ndryshme',
          type: 'collapse',
          icon: 'feather icon-sliders',
          children: [
            {
              id: 'OfertatSliderHome',
              title: 'Ofertat Slider Home',
              type: 'item',
              url: '/admin/TeNdryshme/OfertatSlider'
            },
            {
              id: 'KodiZbritjes',
              title: 'Kodi Zbritjes',
              type: 'item',
              url: '/admin/TeNdryshme/KodiZbritjes'
            },
            {
              id: 'Statistika',
              title: 'Statistika',
              type: 'item',
              url: '/Admin/TeNdryshme/Statistika'
            },
            {
              id: 'Gjurmimet',
              title: 'Gjurmimet',
              type: 'item',
              url: '/Admin/TeNdryshme/Gjurmimet'
            }
          ]
        },
        {
          id: 'Biznesi',
          title: 'Biznesi',
          type: 'collapse',
          icon: 'feather icon-info',
          children: [
            {
              id: 'TeDhenatEBiznesit',
              title: 'Te Dhenat E Biznesit',
              type: 'item',
              url: '/Admin/Biznesi/TeDhenatEBiznesit'
            },
            {
              id: 'Bankat',
              title: 'Bankat',
              type: 'item',
              url: '/Admin/Biznesi/Bankat'
            }
          ]
        },
        {
          id: 'Klientet',
          title: 'Klientet',
          type: 'collapse',
          icon: 'feather icon-info',
          children: [
            {
              id: 'ListaEKlienteve',
              title: 'Lista e Klienteve',
              type: 'item',
              url: '/Admin/Klientet/ListaEKlienteve'
            },
            {
              id: 'ShportatEKlienteve',
              title: 'Shportat e Klienteve',
              type: 'item',
              url: '/Admin/Klientet/ShportaEKlienteve'
            }
          ]
        },
        {
          id: 'MbrojtjaEProjektit',
          title: 'Mbrojtja e Projektit',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'Building',
              title: 'Building',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/building'
            },
            {
              id: 'Renovation',
              title: 'Renovation',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/renovation'
            },
            {
              id: 'Employee',
              title: 'Employee',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/employee'
            },
            {
              id: 'Contract',
              title: 'Contract',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/contract'
            },{
              id: 'Group',
              title: 'Group',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/group'
            },
            {
              id: 'Member',
              title: 'Member',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/member'
            },
            {
              id: 'Planet',
              title: 'Planet',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/planet'
            },
            {
              id: 'Satellite',
              title: 'Satellite',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/satellite'
            },
            {
              id: 'Interview',
              title: 'Interview',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/interview'
            },
            {
              id: 'InterviewNotes',
              title: 'InterviewNotes',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/interviewNotes'
            },
            {
              id: 'Director',
              title: 'Director',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/director'
            },
            {
              id: 'Movie',
              title: 'Movie',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/movie'
            },
            {
              id: 'Banka55982',
              title: 'Banka55982',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/banka55982'
            },
            {
              id: 'Personi55982',
              title: 'Personi55982',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/personi55982'
            },
            {
              id: 'Hoteli',
              title: 'Hoteli',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/hoteli'
            },
            {
              id: 'Klienti',
              title: 'Klienti',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/klienti'
            },
            {
              id: 'Planet212255982',
              title: 'Planet212255982',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/planet212255982'
            },
            {
              id: 'Satellite212255982',
              title: 'Satellite212255982',
              type: 'item',
              url: '/admin/mbrojtjaeprojektit/satellite212255982'
            }
            
          ]
        },
        {
          id: 'Stafi',
          title: 'Stafi',
          type: 'item',
          icon: 'feather icon-users',
          url: '/Admin/Stafi'
        },
        {
          id: 'Porosit',
          title: 'Porosit',
          type: 'item',
          icon: 'feather icon-package',
          url: '/admin/porosite'
        },
        {
          id: 'Mesazhet',
          title: 'Mesazhet',
          type: 'item',
          icon: 'feather icon-at-sign',
          url: '/admin/mesazhet'
        }
      ]
    },
    {
      id: 'shitesdashboard',
      title: 'Shites Dashboard',
      type: 'group shites',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Produktet',
          title: 'Produktet',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'ListaEProdukteve',
              title: 'Lista e Produkteve',
              type: 'item',
              url: '/admin/produktet/ListaEProdukteve'
            }
          ]
        },
        {
          id: 'TeNdryshme',
          title: 'Te Ndryshme',
          type: 'collapse',
          icon: 'feather icon-sliders',
          children: [
            {
              id: 'KodiZbritjes',
              title: 'Kodi Zbritjes',
              type: 'item',
              url: '/admin/TeNdryshme/KodiZbritjes'
            }
          ]
        },
        {
          id: 'Klientet',
          title: 'Klientet',
          type: 'collapse',
          icon: 'feather icon-info',
          children: [
            {
              id: 'ListaEKlienteve',
              title: 'Lista e Klienteve',
              type: 'item',
              url: '/Admin/Klientet/ListaEKlienteve'
            },
            {
              id: 'ShportatEKlienteve',
              title: 'Shportat e Klienteve',
              type: 'item',
              url: '/Admin/Klientet/ShportaEKlienteve'
            }
          ]
        },
        {
          id: 'Porosit',
          title: 'Porosit',
          type: 'item',
          icon: 'feather icon-package',
          url: '/admin/porosite'
        },
        {
          id: 'Mesazhet',
          title: 'Mesazhet',
          type: 'item',
          icon: 'feather icon-at-sign',
          url: '/admin/mesazhet'
        }
      ]
    }
  ]
};

export default menuItems;
