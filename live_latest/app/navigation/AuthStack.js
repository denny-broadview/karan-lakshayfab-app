import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import ThemeController from '../components/ThemeController';
import OtpVerificationScreen from '../screens/ForgotPassword/OtpVerificationScreen';
import HeaderTitle from '../components/HeaderTitle';
import Colors from '../Resources/Colors';
import {Text} from 'react-native';
import ResetPasswordScreen from '../screens/ForgotPassword/ResetPasswordScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen/OTPScreen'

import * as React from 'react';
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();


const AuthStackNavigator = (props) => (
    <AuthStack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
             //   animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                headerRight: () => <ThemeController/>,
            }}
        />
        <Stack.Screen
            name="OtpVerificationScreen"
            component={OtpVerificationScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'OTP Verification'}/>,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerBackTitle: ' ',
                headerTintColor: Colors.rgb_e15517,
                headerRight: () => <Text>{'  '}</Text>,

            }}
        />
        <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'Reset Password '}/>,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerBackTitle: ' ',
                headerTintColor: Colors.rgb_e15517,
                headerRight: () => <Text>{'  '}</Text>,
            }}
        />

        <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
               // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',

            }}
        />
        <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'Forgot Password '}/>,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerBackTitle: ' ',
                headerTintColor: Colors.rgb_e15517,
                headerRight: () => <Text>{'  '}</Text>,
            }}
        />
        <Stack.Screen 
            name='OTPScreen'
            component={OTPScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'Verify Mobile Number '}/>,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerBackTitle: ' ',
                headerTintColor: Colors.rgb_e15517,
                headerRight: () => <Text>{'  '}</Text>,
            }}
        />



    </AuthStack.Navigator>
);

export default AuthStackNavigator
