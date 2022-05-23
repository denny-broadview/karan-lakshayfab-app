import LockIcon from "@svg/lock-check-outline.svg";
import CellIcon from "@svg/ic_telephone";

import OTPInputView from "@twotalltotems/react-native-otp-input";

import React, { Component } from "react";

import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Keyboard,
  Alert,
  Platform,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import RNOtpVerify from "react-native-otp-verify";

import { connect } from "react-redux";

import { Constants } from "../../Resources";
import colors from "../../Resources/Colors";
import CustomTextInput from "../../components/CustomTextInput";

import { styles } from "./styles";

class OTPScreen extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      hash: "",
      very: "",
      objRes:''
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.phone);
   // console.log("ot :", this.props.route.params.OTP);
if(Platform.OS=='android'){
  
  RNOtpVerify.getHash().then((val) => {
    console.log("val ::", val);
    this.sendOTP();
  });

  this.startListening();
}else{
  
  this.sendOTP();

}
  }

  startListening = () => {
    RNOtpVerify.getOtp()
      .then((p) => {
        console.log("DATA : ", p);
        this.setState({
          very: p,
        });
        RNOtpVerify.addListener(this.otpHandler);
      })
      .catch((p) => console.log("DATA 1 :: ", p));
    RNOtpVerify.removeListener();
  };

  otpHandler = (message: string) => {
    console.log("Message ", JSON.stringify(message));
    // const otp = /(\d{6})/g.exec(message)[1];
    //this.setState({ otp: otp });
    console.log("OTP ::" + this.state.otp);
    RNOtpVerify.removeListener();
  };

  componentWillUnmount() {
    if(Platform.OS=='android'){
      RNOtpVerify.removeListener();
    }
  }

  // componentDidMount() {
  //   console.log(this.props.route.params.phone);
  //   // this.sendOTP();
  //   this._onSmsListenerPressed();
  //   debugger;
  //   RNOtpVerify.getHash()
  //     .then((v) => {
  //       console.log("V ::", v);
  //       this.setState({ hash: v });
  //     })
  //     .catch((e) => console.log("e ::", e));

  //   debugger;
  //   RNOtpVerify.getOtp()
  //     .then((p) => RNOtpVerify.addListener(this.otpHandler()))
  //     .catch((p) => console.log("P ::", p));
  //   RNOtpVerify.removeListener();
  // }

  // otpHandler = (message: string) => {
  //   console.log("Message :: ", JSON.stringify(message));
  //   //const message = 'Hello lakshay Fabrics User, Your OTP for verify mobile number is: 123456';
  //   const otp = /(\d{6})/g.exec(message)[1];
  //   debugger;
  //   console.log("OTP ::" + otp);
  //   this.setState({ otp: otp });
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  //   debugger;
  // };

  // componentWillUnmount() {
  //   RNOtpVerify.removeListener();
  // }

  sendOTP = () => {
    let data = {
      phone:
        this.props.route.params != undefined
          ? this.props.route.params.phone
          : "",
    };

    fetch(Constants.BASE_URL + "/users/register_otp_check", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((JSONres) => {
        this.setState({ isLoading: false });
        const { status, message, otp } = JSONres;
        console.log(JSONres);
        if (status == "200" || status == 200) {
          // console.log("working");
          setTimeout(() => {
            this.setState({
              otp: JSON.stringify(JSONres.data.otp),
            });
            if(Platform.OS=='ios'){
              this.setState({
                objRes:JSON.stringify(JSONres.data.otp),
              })
              Keyboard.dismiss()
            }
          }, 3000);
        }
      });
  };

  render() {
    const { otp } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginTop: 36, width: "100%" }}>
          <LockIcon width={200} height={200} fill={colors.rgb_e15517} />
        </View>
        <Text style={styles.labelText}>{"Please Enter Your OTP."}</Text>
        {/* <CustomTextInput
          // inputRef={(component) => (this._phoneRef = component)}
          style={styles.textContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder={"Enter OTP Here"}
          icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517} />}
          //autoFocus={!isValidEmail}
          //textContentType='phone'
          onChangeText={(index, otp) =>
            this.setState({
              otp,
            })
          }
          value={otp}
          maxLength={10}
          returnKeyType={"done"}
          keyboardType={"number-pad"}
          // onSubmitEditing={() => {
          //   this._passwordRef.focus();
          // }}
          blurOnSubmit={false}
        /> */}

        <OTPInputView
          // style={styles.textContainerStyle}
          style={{
            width: "80%",
            height: 150,
            justifyContent: "center",
            alignSelf: "center",
          }}
          codeInputFieldStyle={{ color: "grey" }}
          pinCount={6}
          code={otp}
          onCodeChanged={(otp) => this.setState({ otp: otp })}
          autoFocusOnLoad
          onCodeFilled={(code) => {}}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>{
            if(Platform.OS=='android'){

              navigation.navigate("SignupScreen", { OPTVer: this.state.very })
            }else{
              let very =this.state.otp == this.state.objRes
              navigation.navigate("SignupScreen", { OPTVer: very })
            }
         } }
          // onPress={() =>this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>{"Done"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default OTPScreen;
