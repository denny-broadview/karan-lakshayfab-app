import React, {Component} from 'react';
import {Image,Linking, TouchableOpacity,Text, View} from 'react-native';
import {connect} from 'react-redux';

import styles from './Styles/ErrorScreenStyles';

class ErrorScreen extends Component {


    renderTitle() {
        const {title,titleStyle} = this.props;
        if (title) {
            return (
                <Text style={[styles.errorTitle,titleStyle]}>{title}</Text>
            );
        }
    }

    renderMessage() {
        const {message,messageStyles } = this.props;
        if (message) {
            return (
                <Text style={[styles.errorMessage, messageStyles]}>{message}</Text>
            );
        }
    }
    renderLink() {
        const {link,linkStyles ,} = this.props;
        if (link) {
            return (<TouchableOpacity  onPress={()=>{
                    Linking.openURL(link).then((res)=>{
                    }).catch((e)=>{
                        console.log('error',e)
                    })
                }}>
                <Text style={[styles.errorMessage, linkStyles]} >{link}</Text>
                </TouchableOpacity>
            );
        }
    }

    renderImage(){
        const {imageStyle}=this.props
        return <Image
            source={this.props.image}
            style={imageStyle}
        />
    }


    getContentStyle() {
        return styles.contentContainer;
    }

    render() {
        return (
                <View style={[styles.contentContainer]}>
                    {this.renderImage()}
                    {this.renderTitle()}
                    {this.renderMessage()}
                    {this.renderLink()}
                </View>
        );
    }
}


export default connect(null)(ErrorScreen);
