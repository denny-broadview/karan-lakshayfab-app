import React from 'react';
import {Image} from 'react-native';

function LogoImage(props) {
  const {
    style,
  } = props

  return (<Image source={require('../Images/assets/logo.png')} style={[{width:250,height:150},style]} />)
}

export default LogoImage
