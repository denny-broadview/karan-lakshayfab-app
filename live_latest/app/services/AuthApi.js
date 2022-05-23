import apisauce from 'apisauce'

import {Constants} from '../Resources';

const create = (baseURL = Constants.BASE_URL) => {
    const api = apisauce.create({
        baseURL,
        /*headers:{
            'Content-Type': 'multipart/form-data',
        }*/

    })

    const setConfiguration = (appKey) => {
        //api.setHeader('X-DreamFactory-API-Key', appKey)
    }

    const login = (data, headers) => {
        return api.post(`/users/login`, data )
    };

    const signup = (data, headers) => {
        return api.post(`/users/signup`, data )
    }


    const forgotPassword = (data, headers) => {
        return api.post(`/users/forgot-password`, data )
    }

    const verifyOtp = (data, headers) => {
        return api.post(`/users/check-otp`, data )
    }

    const updatePassword = (data, headers) => {
        return api.post(`/users/update-password`, data )
    }


    return {
        //setConfiguration,
        login,
        signup,
        forgotPassword,
        verifyOtp,
        updatePassword

    }
}

export default {
    create
}
