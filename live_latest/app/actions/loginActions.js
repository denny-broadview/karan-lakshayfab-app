/*
 * Reducer actions related with login
 */
import * as types from './types';
import {Strings} from '../utils/Strings';

export function requestLogin(input) {
    return {type: types.LOGIN_REQUEST, input};
}

export function loginFailed() {
    return {type: types.LOGIN_FAILED};
}

export function onLoginResponse(response) {
    return {type: types.LOGIN_RESPONSE, response};
}

export function requestForgotPassword(phone) {
  return {type: types.FORGOT_PASSWORD_REQUEST, phone};
}

export function forgotPasswordFailed() {
  return {type: types.FORGOT_PASSWORD_FAILED,};
}

export function forgotPasswordResponse(response) {

  return {type: types.FORGOT_PASSWORD_RESPONSE, response};
}


export function enableLoader() {
    return {type: types.LOGIN_ENABLE_LOADER};
}

export function requestSignup(userInfo) {
    return {
        type: types.SIGNUP_REQUEST,
        userInfo,
    };
}


export function signupFailed() {
    return {
        type: types.SIGNUP_FAILED,
    };
}

export function onSignupResponse(response) {

    return {
        type: types.SIGNUP_RESPONSE,
        response,
    };
}


export function requestVerifyOtp(phone,otp) {
    return {type: types.VERIFY_OTP_REQUEST, phone,otp};
}

export function verifyOtpFailed() {
    return {type: types.VERIFY_OTP_FAILED,};
}

export function verifyOtpSuccess(response) {

    return {type: types.VERIFY_OTP_RESPONSE, response};
}



export function requestUpdatePassword(phone,password) {

    return {type: types.UPDATE_PASSWORD_REQUEST, phone,password};
}

export function updatePasswordFailed() {
    return {type: types.UPDATE_PASSWORD_FAILED,};
}

export function updatePasswordResponse(response) {

    return {type: types.UPDATE_PASSWORD_RESPONSE, response};
}


export function disableLoader() {
    return {
        type: types.LOGIN_DISABLE_LOADER,
    };
}

export function logOut() {
    return {
        type: types.LOG_OUT,
    };
}
