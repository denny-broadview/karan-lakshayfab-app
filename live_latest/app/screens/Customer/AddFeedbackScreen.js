import React, {Component} from 'react';
import {Alert, ScrollView, Keyboard, TextInput, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './Styles/AddFeedbackStyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import * as customerActions from '../../actions/customerActions';
import Button from '../../components/Button';
import OtherNotesIcon from '@svg/ic_othernotes';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';

class AddFeedbackScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedback:''

        };
    }

    uploadFeedback(){
        const{feedback}=this.state


         if(!feedback){
            alert("Please enter feedback")
            return
        }

        Keyboard.dismiss()

        let data= {
                feedback,
                "user_id" : this.props.id
            }

        this.setState({isLoading:true})
        fetch(Constants.BASE_URL+'/users/add_feedback',{
            method:"POST",
            body:JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({isLoading: false});
                    const {status,message}=result

                    if (status=='200' || status==200){
                        this.setState({feedback:''})

                        Alert.alert(
                            Constants.APP_NAME,
                            "Feedback has been submitted successfully.",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => this.props.navigation.goBack(),
                                    style: "cancel"
                                }

                            ],
                            { cancelable: false })

                    }else {
                        if (message) {
                            ToastMessage(message);
                        }
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({isLoading: false,});
                    alert(error)
                }
            )
    }


    render() {
        const {
            isLoading,
            feedback,
        } = this.state;

        return (
            <TouchableOpacity keyboardShouldPersistTaps="always" style={styles.scrollView} activeOpacity={1}>

                {isLoading && <LoadingSpinner/>}

                <TouchableOpacity style={styles.shadowView} activeOpacity={1} onPress={() => Keyboard.dismiss()}>

                    <View style={styles.textInputParentStyle}>

                        <OtherNotesIcon width={23} height={23} fill={colors.rgb_e15517} style={{marginHorizontal:10}}/>
                        <TextInput
                            allowFontScaling={false}
                            style={styles.textInputStyle}
                            placeholder={'Enter Your Feedback'}
                            onChangeText={(feedback) => this.setState({
                                feedback,
                            })}
                            value={feedback}
                            secureTextEntry={false}
                            multiline={true}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {

                            }}
                            blurOnSubmit={false}/>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        marginTop: 30,
                    }}>

                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.uploadFeedback()}>
                            <Text style={styles.textBtnStyle}>{Strings.home.send_feedback}</Text>
                        </TouchableOpacity>

                    </View>


                </TouchableOpacity>
                {isLoading && <LoadingSpinner/>}


            </TouchableOpacity>);
    }


}

const mapStateToProps = (state) => ({
    errorMessage: state.customerReducer.errorMessage,
    id: state.loginReducer.id,
    status: state.customerReducer.status,
    isNewAddressAdded: state.customerReducer.isNewAddressAdded,
});

const mapDispatchToProps = (dispatch) => ({
    addAddress: (userInfo) => dispatch(customerActions.requestAddAddress(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedbackScreen);
