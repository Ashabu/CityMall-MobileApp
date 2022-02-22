import envs from '../config/env';
import axios from 'axios'
import {IServiceCategories, IServiceSubCategories} from '../Screens/Stores/Stores';



export interface ICategoryPointInfo {
    point?: number,
    pointsLeft?: number,
    category?: number

}
export interface IClientInfo {
    name?:string,
    surname?: string,
    ballance?: number,
    points?: number,
    category?: number,
    categoryStatus?: number,
    categoryPointInfo?: ICategoryPointInfo[],
}

export interface IMerchants {
    merchId?: string,
    name?: string,
    imageUrl?: string,
    categoryNames?: string,
    floor?: number,
    orgId?: number
}

interface IMerchantsResponse {
    data:IMerchants[] 
}







export interface IResonseError {
    errorDesc: string,
    errorCode: string
};



interface IBarcodeResponseData {
    base64Data: string
}
interface IBarcodeResponse {
    data?: IBarcodeResponseData,
    error?: IResonseError
}

interface IMailOtpRequest {
    mail: string
}

interface ICheckMailOtpRequest {
    email: string,
    otp: string
}

interface IAddVirtualCardRequest {
    personCode: string,
    birthDate: string | Date,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    address: string | undefined,
    sex: number,
    mailOtp: string
}

export interface IGiftCardOrderRequest {
    name: string,
    phone: string,
    orderDetails: string,
    deliveryType: number,
    deliveryServiceCenter?: number,
    courierDetails?: string
}

export interface IServiceCenter {
    id: number,
    name: string,
    checked: boolean
}

export interface IServiceCenterResponse {
    data: IServiceCenter
}

export interface IDisctrictsRespone {
    id: number,
    name: string
}
export interface IClientTransaction {
    stan?: string,
    card?: string,
    accountNumber?: string,
    authDate?: Date,
    amount?: number,
    tranType?: string,
    merchantName?: string,
    merchantAddress?: string,
    reversaled?: number,
    terminalId?: string,
    centre?: number,
    merchantId?: string,
    transactionType?: number,
    imageURL?: string
}


interface IClientTransactionResponse {
  data?:IClientTransaction[]
}


class ApiServices {
    GetClientCards = async () => {
        return await axios.get(`${envs.API_URL}/api/Mobile/GetCientCards`);
    };

    GenerateBarcode = async (card: string) => {
        return await axios.get<IBarcodeResponseData>(`${envs.API_URL}/api/Mobile/GenerateBarcode?input=${card}`);
    };

    SendMailOtp = async (data: IMailOtpRequest) => {
        return await axios.post(`${envs.API_URL}/api/Otp/SendMailOtp`, data);
    };

    CheckMailOtp = async (data: ICheckMailOtpRequest) => {
        return await axios.post(`${envs.API_URL}/api/Otp/CheckMailOtp`, data);
    };

    AddVirtualCard = async (data: IAddVirtualCardRequest) => {
        return await axios.post(`${envs.API_URL}/api/Clients/AddVirtCard`, data);
    };

    GetDistricts = async () => {
        return await axios.get<IDisctrictsRespone>(`${envs.API_URL}/api/Organisation/GetDistricts`)
    };

    GetServiceCenters = async () => {
        return await axios.get(`${envs.API_URL}/api/Organisation/GetServiceCenters`);
    };

    OrderGiftCard = async (data: IGiftCardOrderRequest) => {
        return await axios.post(`${envs.API_URL}/api/Cards/order`, data)
    };


    GetClientInfo = async () => {
        return await axios.get<IClientInfo>(`${envs.API_URL}/api/Mobile/ClientInfo`);
    }

    GetClientTransactions = async (index: number = 1, PageSize: number = 10) => {
        return await axios.get<IClientTransactionResponse>(`${envs.API_URL}/api/Mobile/GetClientTransactions?Page=${index}&PageSize=${PageSize}`);
    }

    GetWidgets = async () => {
        return await axios.get(`${envs.API_URL}/api/Connect/GetWidgents`);
    }

    // https://citymallapi.payunicard.ge:8061/api/Connect/GetWidgents?fbclid=IwAR0IvaReXjG0klvbmpDFAXMdUHtAEG75JzsitAv7s0mxWEAp7qUt5DLHB6U



};

export default new ApiServices();