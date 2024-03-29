

const settings =  {
    
  
    system : {
        ogTemplate: "",
        passwords : {
            'admin': '1751bfe48d5ad21fd9d'
        },
        lang_api_endpoint : 'https://api.eventjuicer.com/proxy?url=https%3A%2F%2Flocalise.biz%2Fapi%2Fexport%2Fall.json%3Fformat%3Dmulti%26pretty%26key%3DSHiwxgKaPMx_KThQH2zcdzwiKEMzuNBm',    
        api : "https://api.eventjuicer.com/proxy?url=https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl",
        post_api : "https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/register",
        service_api : "https://api.eventjuicer.com/v1/services",
        og_image : "https://res.cloudinary.com/ecommerceberlin/image/upload/c_limit,w_1024/v1546943854/ebe_og_home.jpg",
    
    },

    virtual_featured_presenters: {
        wrapperProps:{
            label: "virtual.presenters.title",
            secondaryLabel: "virtual.presenters.description"
        },
        filter: [["featured", 1]]
    },


    virtual_speakers: {
        wrapperProps:{
            label: "virtual.presenters.title",
            secondaryLabel: "virtual.presenters.description"
        },
        og_template: "tehonline_template_speaker2"
    },

    streaming : {
        regform: "streaming_registration",
        api: "https://proxy.eventjuicer.com/api/schedule",
        discordProps: {
            avatars: false,
            join: "https://discord.gg/u3Fv9VJGU5",
            title: "streaming.chat.title",
            showTime: false
        },
        playerProps: {
            controls: true, 
            playing: true,  
            loop: true,
            width: "100%",
            height: "100%"
        },
        stages: {
            A: {
                embed: "player",
                url: "https://youtu.be/fih7dfpLr2g",
                discord: null,
                restricted: true,
                sponsor: null,
                placeholder: "https://res.cloudinary.com/eventjuicer/image/upload/v1616511215/tehonline_fpeventcover_start.png"
            },
            B: {
                embed: "player",
                url: "https://youtu.be/PUEL2MCzxMI",
                discord: null,
                restricted: true,
                sponsor: null,
                placeholder: "https://res.cloudinary.com/eventjuicer/image/upload/v1616511215/tehonline_fpeventcover_start.png"
            },
            C: {
                embed: "player",
                url: "https://youtu.be/vr_9O5nqwgw",
                discord: null,
                restricted: true,
                sponsor: null,
                placeholder: "https://res.cloudinary.com/eventjuicer/image/upload/v1616511215/tehonline_fpeventcover_start.png"
            },
            D: {
                embed: "player",
                url: "https://youtu.be/EwQ02-nA7NQ",
                discord: null,
                restricted: true,
                sponsor: null,
                placeholder: "https://res.cloudinary.com/eventjuicer/image/upload/v1616511215/tehonline_fpeventcover_start.png"
            }
        }
    },


    exhibitor_registration: {

        wrapperProps: {
            label : null,
            secondaryLabel: null,
            dense: true,
            first: false
        },
        legend: "streaming.restricted",
        fields : [
          {name: "email", required: true},
          {name: "fname", required: true},
          {name: "lname", required: true},
          {name: "cname2", required: true},
          {name: "position", required: true},
        ],
        start : [],
        email_template : "pl-livestream-registration",
        right: null,
    },

    streaming_registration: {

        wrapperProps: {
            label : null,
            secondaryLabel: null,
            dense: true,
            first: false
        },
        legend: "streaming.restricted",
        fields : [
          {name: "email", required: true},
          {name: "fname", required: true},
          {name: "lname", required: true},
          {name: "cname2", required: true},
          {name: "position", required: true},
        ],
        start : ['email', 'fname'],
        ticket_id : 1888,
        email_template : "pl-livestream-registration",
        right: "https://res.cloudinary.com/eventjuicer/image/upload/f_auto/v1615497181/tehonline_reg.jpg",
        rightShadowed: true

    },

    schedule: {
        times : {
            '11:00': 'presentation',
            '11:25': 'presentation',
            '11:46': 'presentation',
            '12:04': 'presentation',
            '12:22': 'presentation',
            '13:00': 'presentation',
          },    
          venues : {
            A: { company_id: 0 },
            B: { company_id: 0 },
            C: { company_id: 0 },
            D: { company_id: 0 },
          },
        //   minimized : ["A", "C"],
          venueStyle : "red",
    },


   

    rolebuttonsVirtual : {
        accent : "gold",
        items : [
        {
          url: 'https://res.cloudinary.com/eventjuicer/image/upload/w_768,c_fit,f_auto/v1579000835/exhibit.jpg',
          label: 'common.whats_next',
        //   width: '50%',
          target : "/exhibit"
        },
        ]
    },

    hero : {

        videoSrc : "https://res.cloudinary.com/eventjuicer/video/upload/v1534454501/video_presenter_blak.mp4",
        background : "https://res.cloudinary.com/eventjuicer/image/upload/v1534542530/poster_presenter_blak.jpg",
        overlay : "black",
        template : "heroGold",
        heading : "event.claim",
        subheading : "event.description",
        showable: ["date", "location"],
        orientation : "v",
        primaryStyle: "heroPrimary",
        secondaryStyle: "heroSecondary",
        iconStyle: "heroIcon"

    },

    rolebuttonsExpo : {
        accent : "gold",
        items : [
        {
          url: 'https://res.cloudinary.com/eventjuicer/image/upload/w_768,c_fit,f_auto/v1579000835/visit.jpg',
          label: 'common.visitor',
          width: '50%',
          target : "/visit"
        },
        {
          url: 'https://res.cloudinary.com/eventjuicer/image/upload/w_768,c_fit,f_auto/v1579000835/exhibit.jpg',
          label: 'common.exhibitor',
          width: '50%',
          target : "/exhibit"
        },
        ]
    },

    bookingmap : {
        wrapperProps: {
            legend: "video.booking.title"
        },
        height : 400,
        steps : [
            "choose_booth",
            "confirm",
            "pay",
            "access"
        ],
        allowedGroupIds : [309, 310, 311, 312, 313, 314, 315],
        disabledTicketIds : [],
        boothStyleMapping: {
            309: "light",
            310: "standard",
            311: "hot",
            312: "superHot",
            313: "ultra",
            314: "grand",
            315: "stage",
            316: "networking",
            321: "boothSold"
        },
        benefits: {
        },
        api : "https://stoiska.targiehandlu.pl/preorder"
    },


    speakers : {

        callforpapers: {

            wrapperProps: {
                label: "presenters.form.title",
                // secondaryLabel: ""
            },
            
            baseLabel: "presenters",
            fields: [
                {name: "email", required: true},
                {name: "fname", required: true},
                {name: "lname", required: true},
                {name: "cname2", required: true},
                {name: "phone", required: true},
                {name: "presenter", required: true},  
                {
                  name: "presentation_category", 
                  required: true,
                  options : "categories"
                },
                {name: "presentation_title", required: true},
                {name: "presentation_description", required: true}
            ],
            
              start: [
                'presenter',
                'presentation_title', 
                'presentation_description',
                'presentation_category',
                'cname2'
            ],

            ticket_id : 1790,
            email_template : "pl-presenters-application",

        },


        benefits : {

            label: "presenters.steps.title",
            baseLabel: "presenters.steps",

            items: [

                {
                    icon : "FaSearch",
                    label :  'start',
                },
            
                {
                    icon : "FaPoll",
                    label : 'mentoring'
                },
            
                {
                    icon : "FaTrophy",
                    label : 'presentation'
                }
    
            ]
        }, 
    },

    vips : {

       benefits: {
            label : "vips.benefits.title",
            baseLabel : "vips.benefits",
            items : [

                {   
                    icon : "FaFastForward",
                    label : 'fastentry'
                },
            
                {   
                    icon : "FaChair",
                    label : 'seats'
                },
            
                {   
                    icon : "FaHandshake",
                    label : 'vipzone'
                }
            ]
            
       }
    },

    

    ui : {

        menuItems : [
            {
                name: 'general',
                items: [
                  {name: 'home', to: '/'},
                ]
            }
        ]
    },

    premium : {

        ticketgroups : []

    },


    exhibitors : {
        faq: {

            wrapperProps: {
                label: "exhibitors.faq.name"
            },
            baseLabel: "exhibitors.faq.become",
            showTitle: false,
            items: [
              {
                label: 'included_services',
                important: true,
                buttons: [],
              },
              {
                baseLabel: 'exhibitors.faq.before_event',
                label: 'additional_paid_services',
              },
              { label: 'payment' },
              { label: 'onboarding' },
              { label: 'resignation' },
              { label: 'promo_benefits' },
              {
                baseLabel: 'exhibitors.faq.before_event',
                label: 'public_profile',
              },
            ]
        },
        ogTemplate: "template_teh19_exhibitor_",
        benefits : {
            baseLabel: "exhibitors.benefits",
            items: [
                {
                    icon : "FaHandshake",
                    label :  'outreach',
                },
                {   
                    icon : "FaComments",
                    label : 'feedback'
                },
                {   
                    icon : "FaSmile",
                    label : 'organizer'
                },
                {   
                    icon : "FaPiggyBank",
                    label : 'all_inclusive'
                },
                {
                    icon : "FaLink",
                    label : 'meet_clients'
                },
                {
                    icon : "FaLightbulb",
                    label : 'inspiration'
                }
            ]
        }
    },

    visitor : {

        register: {

            wrapperProps: {
                label : "visitors.register",
            },
            fields : [
              {name: "email", required: true},
              {name: "fname", required: true},
              {name: "lname", required: true},
              {name: "cname2", required: true},
              {name: "position", required: true},
              {name: "nip", required: false},
              {name: "phone", required: true}
            ],
            start : ['email', 'fname'],
            ticket_id : 1949,
            email_template : "pl-visitors-registration",
            right : "/lanyard.jpg",

        },

        benefits : {

            baseLabel: "visitors.benefits",

            items: [

                {
                    icon : "FaLockOpen",
                    label :  'free_entry',
                },
            
                {
                    icon : "FaPiggyBank",
                    label : 'special_offers'
                },
            
                {
                    icon : "FaSearch",
                    label : 'insight'
                },
            
                {   
                    icon : "FaWrench",
                    label : 'case_studies'
                },
            
                {   
                    icon : "FaHandshake",
                    label : 'networking'
                },
            
                {   
                    icon : "FaChartLine",
                    label : 'future'
                }
        ]
        },
      
    },
    
    common : {
        organizer_name : 'Organizer name',
        organizer_address : 'Organizer address',
        organizer_regno : 'Organizer reg number',
        event_name : 'Event name',
        event_location : 'Event location',
        event_date : 'Event date',
        event_hours : 'Event hours',
    },
   
    footer : {



        title: 'event.support.hello',
        description: 'event.support.description',

        people : [
            {             
                name: 'Joan Smith',
                position : 'Relationship Manager',
                langs : ["pl","en"],
                avatar: 'https://res.cloudinary.com/eventjuicer/image/upload/v1598009850/targiehandlu_people_km.jpg',
                phone: '+48 721 945 134',
                email: 'joan.smith@domain.com',
                chatlio : true
            },
          
        ],


        iconStyle : "black",
        primaryStyle: null,
        secondaryStyle: null,
      //  iconStyle: "heroIcon",
        links : [
            {label: "exhibitors.agreement.title", href : "/legal-20200324"},
        ]
    },

    appbar : {
        profile: ["logout"],
        links: [
            // {label: "ehandel.com.pl", color: "secondary",  href: "https://ehandel.com.pl", as: "https://ehandel.com.pl", variant: "text"}
        ],
    },

    cfpphotostream : {

        wrapperProps: {
            label : "cfp.gallery.title"
        },

        overlay: "red",

        cols: 12,

        items : [
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999866/www/speaking/witold_wrodarczyk.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999863/www/speaking/robert_stolarczyk.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999861/www/speaking/sempai.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999860/www/speaking/jakub_gierszynski.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999860/www/speaking/dominik_cison.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999860/www/speaking/felix_hubner.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999857/www/speaking/ireneusz_klimczak.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999855/www/speaking/freshworks.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999855/www/speaking/openstage.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999854/www/speaking/lead360.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999852/www/speaking/damian_wiszowaty.jpg", cols: 3},
            {src: "https://res.cloudinary.com/eventjuicer/image/upload/v1598999851/www/speaking/artur_jablonski.jpg", cols: 3}
        ]
    },

    cfptimeline: {

        baseLabel: "cfp.timeline",

        items : [
            {date: "2020-09-01", name: "submissions", icon:  "NoteAdd", dotColor: 'primary', active: true },
            {date: "2020-09-16", name: "qualification", icon:  "Assessment" },
            {date: "2020-09-21", name: "public-voting", icon:  "Public" },
            // {date: "2020-10-26", name: "jury-voting", icon:  "HowToVote" },
            {date: "2020-10-05", name: "results", icon:  "Mic", active: false },
            {date: "2020-10-06", name: "formal", icon:  "Settings", active: false }

        ]

    },

   
 
};

        

 export default settings