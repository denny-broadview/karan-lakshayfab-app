/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from 'app/actions/loginActions';

// Our worker Saga that logins the user
export  function* loginAsync(api,action) {
  //yield put(loginActions.enableLoader());

  //how to call api
   //const response = yield call(loginUser, action.username, action.password);
  const { input } = action;
  console.log('input--',input)

  const response = yield call( api.login,JSON.stringify( input ))
    console.log('response--',JSON.stringify(response))

  //mock response
  //const response = { success: true, data: { id: 1 } };


  if (response.ok) {
    yield put(loginActions.onLoginResponse(response.data));
    yield put(loginActions.disableLoader({}));

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));

  }
}

export  function* signupAsync(api,action) {
  const response = yield call( api.signup,JSON.stringify( action.userInfo))

    console.log('signupAsync--',JSON.stringify(response))

  if (response.ok) {
    yield put(loginActions.onSignupResponse(response.data));
  } else {
    yield put(loginActions.signupFailed());

  }
}

export  function* forgotPasswordAsync(api,action) {
    const {phone}=action
    const response = yield call( api.forgotPassword,JSON.stringify( {phone}))
    console.log('forgotPasswordAsync--',JSON.stringify(response))

    if (response.ok) {
        yield put(loginActions.forgotPasswordResponse(response.data));
    } else {
        yield put(loginActions.forgotPasswordFailed());

    }
}


export  function* verifyOtp(api,action) {
    const {phone,otp}=action
    const response = yield call( api.verifyOtp,JSON.stringify( {phone,otp}))

    if (response.ok) {
        yield put(loginActions.verifyOtpSuccess(response.data));
    } else {
        yield put(loginActions.verifyOtpFailed());

    }
}


export  function* updatePassword(api,action) {
    const {phone,password}=action
    const response = yield call( api.updatePassword,JSON.stringify( {phone,password}))

    if (response.ok) {
        yield put(loginActions.updatePasswordResponse(response.data));
    } else {
        yield put(loginActions.updatePasswordFailed());

    }
}


