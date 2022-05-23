/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';
import {Constants} from '../Resources';
import {Strings} from '../utils/Strings';

const initialState = {
    isLoggedIn: false,
    id: 0,
    username: '',
    password: '',
    forgotOTP: ''
};
export const loginReducer = createReducer(initialState, {
    [types.LOGIN_REQUEST](state, action) {
        return {
            ...state,

            isLoggedIn: false,
            errorMessage: null,
            loginData: null,
        };
    },


    [types.LOGIN_RESPONSE](state, action) {
        const {status, message, data} = action.response;

        console.log('reducer--',status,message,data)
        if (status == 200) {
            const {role, id} = data;
            return {
                ...state, loginData: data, role, id, isLoggedIn: true, errorMessage: null,
            };
        } else {
            return {
                ...state, loginData: null,status, errorMessage: message, isLoggedIn: false,
            };
        }


    },
    [types.LOGIN_FAILED](state) {
        console.log('LOGIN_FAILED reducer--','failed')

        return {...state, isLoggedIn: false, loginData: null, errorMessage: Strings.generic_error.message};
    },

    [types.SIGNUP_REQUEST](state, action) {
        return {...state, isSignedIn: false, isLoggedIn: false, errorMessage: null, signupData: null};
    },

    [types.SIGNUP_RESPONSE](state, action) {
        const {status, message, data} = action.response;
        console.log('signupSuccess--',status+'-->>'+data)
        return { signupData: data, status,  isSignedIn: true, isLoggedIn: false, errorMessage: message};

    },
    [types.SIGNUP_FAILED](state) {
        return {
            ...state, isLoggedIn: false, status: 401, isSignedIn: true, errorMessage: Strings.generic_error.message,
        };
    },

    [types.FORGOT_PASSWORD_REQUEST](state, action) {
        return {...state, isForgotPasswordSuccess: false, errorMessage: '', phone: action.phone};
    },

    [types.FORGOT_PASSWORD_RESPONSE](state, action) {
        const {status, message, data} = action.response;
        return {...state, status: status.toString(), errorMessage: message, forgotOTP: data.otp,isForgotPasswordSuccess: true};
    },

    [types.FORGOT_PASSWORD_FAILED](state) {
        return {...state, errorMessage: Strings.generic_error.message, isForgotPasswordSuccess: true};
    },


    [types.VERIFY_OTP_REQUEST](state, action) {
        return {...state, isVerifyOtp: false, errorMessage: '', phone: action.phone};
    },

    [types.VERIFY_OTP_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {...state, status: status.toString(), errorMessage: message, isVerifyOtp: true};
    },

    [types.VERIFY_OTP_FAILED](state) {
        return {...state, errorMessage: Strings.generic_error.message, isVerifyOtp: true};
    },


    [types.UPDATE_PASSWORD_REQUEST](state, action) {

        return {...state, isUpdatePassword: false, errorMessage: '', phone: action.phone};
    },

    [types.UPDATE_PASSWORD_RESPONSE](state, action) {
        const {status, message} = action.response;

        return {...state, status: status.toString(), errorMessage: message, isUpdatePassword: true};
    },

    [types.UPDATE_PASSWORD_FAILED](state) {

        return {...state, errorMessage: Strings.generic_error.message, isUpdatePassword: true};
    },

    [types.LOG_OUT](state) {

        return {...state, isLoggedIn: false};
    },

});
