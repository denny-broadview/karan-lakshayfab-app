import React, {Component} from 'react';
import {ScrollView, View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ApproveOrdersStyles';
import AdminOrder from '../../components/AdminOrder';


class ShippedOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: '',
        };
    }

    render() {

        return <View style={styles.container}>

            <AdminOrder data={['1', '1', '11']}/>


        </View>;
    }

}

export default connect()(ShippedOrders);
