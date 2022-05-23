import apisauce from 'apisauce';
import {
    Constants,
} from '@resources';

const create = (baseURL = Constants.BASE_URL) => {
    const api = apisauce.create({
        baseURL,
        /*headers:{
            'Content-Type': 'multipart/form-data',
        }*/

    });

    const setConfiguration = (appKey) => {
        //api.setHeader('X-DreamFactory-API-Key', appKey)
    };

    const checkUserActive = ({id}, headers) => {
        return api.get(`/users/authCheck/${id}`, null);
    };

    const fabric = (data, headers) => {
        return api.post(`/fabrics`, data, null);
    };



    const catalog = ({user_id,fabricId, status,page_no, offset,search}, headers) => {
        let data = {
            user_id,
            status,
            fabric_status:status,
            page_no, offset,search
        };

        console.log('------',data)
        return api.post(`/catalog/getcatalog/${fabricId}`, data, null);
    };


    const products = ({catalogId, status,page_no, offset,search}, headers) => {
        let data = {
            status,
            catalog_status:status,
            page_no,
            offset,
            search,


        };


        return api.post(`/products/getproduct/${catalogId}`, data, null);
    };

    const addAddress = (data, headers) => {
        return api.post(`/users/add-address`, data);
    };

    const updateAddress = (data, headers) => {
        return api.post(`/users/update-address`, data);
    };

    const requestAddress = (data, headers) => {
        return api.post(`/users/list-address`, data);
    };

    const orderPlaced = (data, headers) => {
        return api.post(`/orders/order-place`, data);
    };

    const getOrders = (data, headers) => {
        return api.post(`/orders/get-orders`, data);
    };

    const getOrderDetail = (data, headers) => {
        return api.post(`/orders/get-order-detail`, data);
    };

    const getUserDetails = (data, headers) => {
        return api.post(`/users/get-user-detail`, data);
    };

    const updateUserDetails = (data, headers) => {
        return api.post(`/users/updateProfile`, data);
    };

    const sendOTP = (data, headers) => {
        return api.post(`/users/register_otp_check`, data);
    }

    return {
        checkUserActive,
        fabric,
        catalog,
        products,
        addAddress,
        updateAddress,
        requestAddress,
        orderPlaced,
        getOrders,
        getOrderDetail,
        getUserDetails,
        updateUserDetails,
        sendOTP
    };
};

export default {
    create,
};
