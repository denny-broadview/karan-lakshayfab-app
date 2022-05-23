import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'

import { Colors } from '@resources'

import styles from './Styles/ButtonStyles'

function Button(props) {
  const {
    disabled,
    title,
    style,
    onPress,
      textStyles
  } = props

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? Colors.rgb_e15517 : Colors.rgb_e15517
        },
        style
      ]}
      onPress={onPress}>
      <Text style={[styles.text,textStyles]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
