import React,{ useState }from 'react';

import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as loginActions from 'app/actions/loginActions';

import Colors from '../../Resources/Colors';
import CustomTextInput from '../../components/CustomTextInput';
import LogoImage from '../../components/LogoImage';
import {Strings} from '../../utils/Strings';

import styles from './styles';

export default function Login() {
  const id = useSelector(state => state.loginReducer.id);
  const dispatch = useDispatch();
 // const onLogin = () => dispatch(loginActions.requestLogin('9876598765', 'admin'));
  const [email, setEmail] = React.useState('9876598765');
  const [password, setPassword] = React.useState('admin');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);

  return (
      <ScrollView style={styles.scrollView}>

        <ImageBackground source={require('../../Images/assets/bg.png')} resizeMode="cover"
                         style={styles.scrollView}/>

        <View style={styles.container}>

          <Text style={styles.signin}>{Strings.login.signin}</Text>
          <View style={styles.parentView}>
            <LogoImage/>

            <CustomTextInput
                inputRef={component => this._phoneRef = component}
                style={styles.email}
                inputStyle={styles.textInputStyle}
                placeholder={Strings.login.phone_no_password}
                icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                //autoFocus={!isValidEmail}
                //textContentType='phone'
                onChangeText={(index, phone) => this.setState({
                  phone,
                })}
                value={phone}
                maxLength={10}
                keyboardType={'number-pad'}
                onSubmitEditing={() => {
                  this._passwordRef.focus();
                }}
                blurOnSubmit={false}
                errorMessage={phoneErrorMessage}
                error={phoneError}
                //editable={!isLoading}
            />

            <CustomTextInput
                inputRef={component => this._passwordRef = component}
                style={[styles.email, {marginTop: 30}]}
                inputStyle={styles.textInputStyle}
                placeholder={Strings.login.password_placeholder}
                icon={<PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                maxLength={20}
                value={password}
                //autoFocus={isValidEmail && isEmpty(password)}
                textContentType='password'
                onChangeText={(index, password) => this.setState({
                  password,
                })}
                // error={passwordError}
                onSubmitEditing={() => {
                  this._doLogin(phone, password);

                }}
                errorMessage={passwordErrorMessage}
                error={passwordError}
                //  blurOnSubmit={!isEmpty(password)}
                //  editable={!isLoading}
            />

            <Button title={Strings.login.login} onPress={() => {
              this._doLogin(phone, password);
            }} style={{marginTop: 30}}/>
            <Text style={styles.forgotPasswordTextStyle}
                  onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>{Strings.login.forgot_password}</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}
                              onPress={() => this.props.navigation.navigate('SignupScreen')}>
              <Text
                  style={[styles.forgotPasswordTextStyle, {color: Colors.rgb_383431}]}>{Strings.login.dont_have_Account}</Text>
              <Text style={styles.forgotPasswordTextStyle}>{' ' + Strings.signup.signup}</Text>
            </TouchableOpacity>

          </View>
      {/*    {isLoading && <LoadingSpinner />}*/}

        </View>
      </ScrollView>
  );
}
