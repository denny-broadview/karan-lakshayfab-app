import React, {useRef, useState, useEffect} from 'react';
import {Button, Dimensions, TouchableOpacity, Animated, Modal, StyleSheet, Text, View} from 'react-native';
import {ApplicationStyles} from '../Resources';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const AddToCart = (props) => {
    const { cancelModal, modalVis} = props;
    const [modalVisible, SetModalVisible] = useState();
    const [animation, SetAnimation] = useState(new Animated.Value(1));
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            },
        ).start(_animationSTartCallback(), _animationFinishCallback());
    }, [fadeAnim]);

    const _animationSTartCallback = () => {
    };


    const _animationFinishCallback = () => {

        setTimeout(() => {
            SetModalVisible(false)
            cancelModal()
        }, 1500);
    };

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            timing: 1000,
        }).start(() => {
            Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
            }).start(() => {
                SetModalVisible(false);
                cancelModal();
            });

        });
    };



    useEffect(() => {
    }, [modalVisible]);

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType={'slide'}
                onRequestClose={() => SetModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalContainer} onPress={startAnimation}>
                    <Animated.View style={[styles.animatedBox, {opacity: fadeAnim}]}>
                        <Text style={styles.titleStyle}>{'Item is added to cart!!'}</Text>
                    </Animated.View>

                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default AddToCart;
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
        width: windowWidth * 0.6,
        //height: windowHeight * 0.4,
        top: windowHeight * 0.3,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop:10,
        paddingBottom:5,
        justifyContent:'center'
    },


    titleStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
    },


    animatedBox:
        {
            //  width : 200,
            //height: 200,
            // backgroundColor : '#FF1744'
        },
});
