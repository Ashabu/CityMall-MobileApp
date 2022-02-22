import translateService from '../Services/translateService';

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
        name: translateService.t('screens.home'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [],
        categories: [],
        id: 1,
        routeName: 'HomeScreen',
        objectTypeId: undefined,
    },
    {
        name: translateService.t('common.offers'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id:1

            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            },

        ],
        categories: [
            {
                id: 0,
                name: translateService.t('common.sales')
            },
            {
                id: 1,
                name: translateService.t('common.news')
            },
            
        ],
        routeName: 'OffersScreen',
        id: 2,
        objectTypeId: undefined,
    },
    {
        name: translateService.t('common.shops'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id: 1
            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            }
        ],
        categories: [
            {
                id: 1,
                name: translateService.t('common.shops')
            },
            {
                id: 2,
                name: translateService.t('screens.premumSpace'),
                isPremium: true
            },
        ],
        routeName: 'Stores',
        id:3,
        objectTypeId: 100013,
    },
    {
        name: translateService.t('common.fun'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id: 1
            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            }
        ],
        categories: [],
        routeName: 'Fun',
        objectTypeId: 100020,
        id:4
    },
    {
        name: translateService.t('common.feed'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id: 1
            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            } 
        ],
        categories: [],
        routeName: 'Feed',
        objectTypeId: 100018,
        id:5
    },
    {
        name: translateService.t('common.services'),
         icon: require('../assets/images/arrow-sm.png'),
         location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id: 1
            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            } 
        ],
        categories: [],
        routeName: 'TServices',
        objectTypeId: 100015,
         id:6,
    },
    {
        name: translateService.t('screens.roadMap'),
         icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.cityMallSaburtalo'),
                id: 1
            },
            {
                name: translateService.t('screens.cityMallGldani'),
                id: 2
            }
        ],
        categories: [
            {
                id: 1,
                name: translateService.t('screens.planVisit')
            },
            {
                id: 2,
                name: translateService.t('screens.contactUs')
            },
        ],
        routeName: 'ShopGuid',
        id:8,
    },
    {
        name: translateService.t('screens.aboutUs'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: translateService.t('screens.aboutUs'),
                id: 1
                
            },
            {
                name: translateService.t('screens.aboutLoialty'),
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
        name: translateService.t('screens.myProfile'),
        icon: require('../assets/images/arrow-sm.png'),
        location: [],
        categories: [],
        id:10,
        routeName: 'ProfileScreen'
    },
    {
        name: translateService.t('screens.parameters'),
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