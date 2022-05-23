import React, {Component,useState,useEffect} from 'react';
import {Button, Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import {ApplicationStyles} from '../Resources';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const  ImageSelectionModal=(props)=>{
    const{takePhoto,chooseGallery,cancelModal,modalVis}=props
    const [modalVisible,SetModalVisible]=useState()


    useEffect(()=>{
        console.log('modalVisible--',modalVisible);

      // SetModalVisible(modalVis)

    },[modalVisible]);

        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => SetModalVisible(false)}
                >
                    <View style={styles.modalContainer}>


                        <Text style={styles.titleStyle}>{'Select Image'}</Text>

                        <Text style={styles.subtitleStyle} onPress={()=>{
                            takePhoto()
                        }}>{'Take Photo...'}</Text>

                        <Text style={styles.subtitleStyle} onPress={()=>chooseGallery()}>{'Choose From Library...'}</Text>
                        <Text style={[styles.subtitleStyle, {alignSelf: 'flex-end'}]}
                              onPress={() => {
                                  SetModalVisible(false);
                                  cancelModal()
                              }} >{'Cancel'}</Text>


                    </View>
                </Modal>

            </View>
        );
}

export default ImageSelectionModal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        alignItems: 'center',

    },
    modalContainer: {
        ...ApplicationStyles.shadowBoxCard.container,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: windowWidth * 0.8,
        //height: windowHeight * 0.4,
        top: windowHeight * 0.3,
        borderRadius: 5,
        padding: 20,
      //  borderWidth:1
        // alignItems: 'center'

    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',

        marginVertical: 10,
        //backgroundColor:'red'
    },

    titleStyle: {
        // marginLeft: 20,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitleStyle: {
        // marginLeft: 20,
        color: 'black',
        fontSize: 18,
        marginVertical: 10,


    },
    innerContainer: {
        alignItems: 'center',
    },
});
