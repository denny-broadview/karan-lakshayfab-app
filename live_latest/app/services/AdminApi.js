import apisauce from 'apisauce'
import {
    Constants,
} from '@resources'
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


    const getOrders = (data, headers) => {
        return api.post(`/orders/get-orders`, data )
    };

    const getOrderDetail = (data, headers) => {
        return api.post(`/orders/get-order-detail`, data )
    };

    const getCustomers = (data, headers) => {
        return api.post(`/users/customers-list`, data )
    };

    const getDeviceLogs = (data, headers) => {
        return api.post(`/users/customer-logs`, data )
    };

    const getFeedbackListing = (data, headers) => {
        return api.post(`/users/customer-logs`, data )
    };

    const getCustomerReports = (data, headers) => {
        console.log('DATA API ', data)
        return api.post(`/reports/customer-reports`, data )
    };

    const getDispatchOrdersReports = (data, headers) => {
        return api.post(`/reports/dispatch-orders-report`, data )
    };

    const getProductsReports = (data, headers) => {
        return api.post(`/reports/products-report`, data )
    };

    const getOddReports = (data, headers) => {
        return api.post(`/reports/Odd_Report`, data )
    };

    const getStateList = (headers) => {
        return api.get(`/Users/state_list_api`)
    }

    const getCityList = (headers) => {
        return api.get(`/Users/city_list_api`)
    }
    const getStateWiseCitiesList = (data, headers) => {
        return api.post(`/users/getStateWiseCities`,data)
    }
    const rejectOrderWithReason = (data, headers) => {
        return api.post(`/Reports/Reject_Odd_Report`,data)
    }
    return {
        getOrders,
        getOrderDetail,
        getCustomers,
        getDeviceLogs,
        getCustomerReports,
        getProductsReports,
        getDispatchOrdersReports,
        getOddReports,
        getFeedbackListing,
        getStateList,
        getCityList,
        getStateWiseCitiesList,
        rejectOrderWithReason
    }
};

export default {
    create
}
