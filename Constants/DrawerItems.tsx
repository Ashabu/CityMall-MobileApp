export interface ICategories {
    id?: number,
    name?: string,
    isPremium?:boolean
}

export interface ILocation {
    name?: string,
    id?: number,
    isPremium?: boolean
}

export interface IDrawerItem {
    id?: number,
    name?: string,
    location?: ILocation[],
    categories?: ICategories[] | [],
    routeName?: string,
    objectTypeId: number | undefined 


}

export default [
    {
        name: 'მთავარი',
        icon: require('../assets/images/arrow-sm.png'),
        location: [],
        categories: [],
        id: 1,
        routeName: 'HomeScreen',
        objectTypeId: undefined,
    },
    {
        name: 'შეთავაზებები',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                id:1

            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            },

        ],
        categories: [
            {
                id: 0,
                name: 'ფასდაკლებები'
            },
            {
                id: 1,
                name: 'სიახლეები'
            },
            
        ],
        routeName: 'OffersScreen',
        id: 2,
        objectTypeId: undefined,
    },
    {
        name: 'მაღაზიები',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            }
        ],
        categories: [
            {
                id: 1,
                name: 'მაღაზიები'
            },
            {
                id: 2,
                name: 'პრემიუმ სივრცე',
                isPremium: true
            },
        ],
        routeName: 'Stores',
        id:3,
        objectTypeId: 100013,
    },
    {
        name: 'გართობა',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            }
        ],
        categories: [],
        routeName: 'Fun',
        objectTypeId: 100020,
        id:4
    },
    {
        name: 'კვება',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            } 
        ],
        categories: [],
        routeName: 'Feed',
        objectTypeId: 100018,
        id:5
    },
    {
        name: 'სერვისები',
         icon: require('../assets/images/arrow-sm.png'),
         location: [
            {
                name: 'სითმოლი საბურთალო',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            } 
        ],
        categories: [],
        routeName: 'TServices',
        objectTypeId: 100015,
         id:6,
    },
    {
        name: 'მოლის გზამკვლევი',
         icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                id: 2
            }
        ],
        categories: [
            {
                id: 1,
                name: 'დაგეგმე ვიზიტი'
            },
            {
                id: 2,
                name: 'მოგვწერე'
            },
        ],
        routeName: 'ShopGuid',
        id:8,
    },
    {
        name: 'ჩვენს შესახებ',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'ჩვენს შესახებ',
                id: 1
                
            },
            {
                name: 'ლოიალობის შესახებ',
                id: 2
            },
            
        ],
        categories: [],
        id:9,
        routeName: 'AboutUs',
    },
    {
        name: '_blank',
    },
    {
        name: 'პირადი კაბინეტი',
        icon: require('../assets/images/arrow-sm.png'),
        location: [],
        categories: [],
        id:10,
        routeName: 'ProfileScreen'
    },
    {
        name: 'პარამეტრები',
        icon: require('../assets/images/arrow-sm.png'),
        location: [],
        categories: [],
        id:11,
        routeName: 'Parameters'
    },
    // {
    //     name: 'ფიზიკური ბარათის შეკვეთა',
    //      icon: require('../assets/images/arrow-sm.png'),
    //     location: [
    //         {
    //             location: 'სითმოლი საბურთალო'
    //         },
    //         {
    //             location: 'სითმოლი გლდანი'
    //         }
    //     ],
    //     id:11,
    // },

      // {
    //     name: 'სასაჩუქრე ბარათები',
    //      icon: require('../assets/images/arrow-sm.png'),
    //     location: [
    //         {
    //             name: 'სასაჩუქრე ბარათის შეკვეთა',
    //             routeName: 'OrderGiftCardScreen'
    //         },
    //         {
    //             name: 'ნაშთის შემოწმება'
    //         }
    //     ],
    //     id:7,
    // },
]