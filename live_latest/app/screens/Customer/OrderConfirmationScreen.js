import React from 'react';
import {View,BackHandler} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/OrderConfirmationStyles';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import * as customerActions from '../../actions/customerActions';
import NavigationService from '../../navigation/NavigationService';
import {StackActions} from '@react-navigation/routers/src/StackRouter';
import Colors from '../../Resources/Colors';


class OrderConfirmationScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    backAction = () => {
         this.props.clearCart()
        const {navigation}=this.props
        const popAction = StackActions.popToTop();
        navigation.dispatch(popAction);
        return true;
    };


    render() {
        return <View style={styles.container}>

            {/* <Text>{this.props.route.params.orderId}</Text>*/}

            <ErrorScreen title={Strings.cart.order_success_msg}
                         titleStyle={{color:Colors.rgb_377D22}}
                         messageStyles={{color:Colors.rgb_377D22}}
                         message={`Order Id : ${this.props.route.params.orderId}`}
                         image={require('../../Images/assets/success_order.png')}
                         imageStyle={{tintColor:Colors.rgb_377D22}}


            />
        </View>;
    }

}
const mapDispatchToProps = (dispatch) => ({
    clearCart:()=>dispatch(customerActions.clearCart())

});
export default connect(null, mapDispatchToProps)(OrderConfirmationScreen);
