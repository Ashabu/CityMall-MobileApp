import axios from  'axios';
import env from '../../config/env';

interface IOfferType {
    color: string,
    id: number,
    name: string
}

export interface IOffer {
    id: number,
    fromDate: Date,
    toDate: Date,
    clientCategory: number,
    name: string,
    txt: string,
    imgUrl: string | undefined,
    contactiInfoMerchant: string,
    contactInfoCityMall: string,
    merchantUrl: string | null,
    offerType: IOfferType,
    subtitle: string,
    address: number[],
    floor?: string[]
};

interface IOffersResponse {
    data: IOffer[]
    currentPage: number,
    pageCount: number,
    pageSize: number,
    rowCount: number,
};

export const GetOffers = async (address?: number | undefined) => {
    let queryParams = '';
    if(address) {
        queryParams =  `?Addres=${address}`
    };
    console.log(`${env.API_URL}/api/Offers/GetOffers${queryParams}`)
    return await axios.get<IOffersResponse>(`${env.API_URL}/api/Offers/GetOffers${queryParams}`);
};


export const GetNews = async (address?: number | undefined) => {
    let queryParams = '';
    if(address) {
        queryParams = `?Addres=${address}`
    };
    return await axios.get<IOffersResponse>(`${env.API_URL}/api/Offers/GetNews${queryParams}`);
};
