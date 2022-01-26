export interface ICategories {
    id?: number,
    name?: string
}

export interface ILocation {
    name?: string,
    routeName?: string,
    id?: number
}

export interface IDrawerItem {
    id?: number,
    name?: string,
    location?: ILocation[],
    categories?: ICategories[] | [],
    routeName?: string 


}

export default [
    {
        name: 'მთავარი',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'სითმოლი საბურთალო',
                routeName: 'HomeScreen',
                id: 1
            },
            {
                name: 'სითმოლი გლდანი',
                routeName: 'HomeScreen',
                id: 2
            }
        ],
        categories: [],
        id: 1,
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
            {
                id: 2,
                name: 'ღონისძიებები'
            }
        ],
        routeName: 'OffersScreen',
        id: 2,
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
                name: 'პრემიუმ სივრცე'
            },
        ],
        routeName: 'Stores',
        id:3
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
        id:5
    },
    // {
    //     name: 'სერვისი',
    //      icon: require('../assets/images/arrow-sm.png'),
    //     location: [

    //         {
    //             name: 'სითმოლი საბურთალო'
    //         },
    //         {
    //             name: 'სითმოლი გლდანი'
    //         }
    //     ],
    //      id:6,
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
    // {
    //     name: 'მოლის გზამკვლევი',
    //      icon: require('../assets/images/arrow-sm.png'),
    //     location: [
    //         {
    //             name: 'სითმოლი საბურთალო'
    //         },
    //         {
    //             name: 'სითმოლი გლდანი'
    //         }
    //     ],
    //     id:8,
    // },
    {
        name: 'ჩვენს შესახებ',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'ჩვენს შესახებ'
            },
            {
                name: 'ლოიალობის შესახებ'
            }
        ],
        categories: [],
        id:9,
    },
    {
        name: '_blank',
    },
    {
        name: 'პირადი კაბინეტი',
        icon: require('../assets/images/arrow-sm.png'),
        location: [
            {
                name: 'პარამეტრები'
            },
            {
                name: 'პირადი კაბინეტი',
                routeName: 'ProfileScreen'
            }
        ],
        categories: [],
        id:10,
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
]