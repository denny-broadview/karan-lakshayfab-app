import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './Styles/ReportScreenstyles';
import colors from '../../Resources/Colors';
import HomeItem from '../../components/HomeItem';
import {Strings} from '../../utils/Strings';
import CustomersIcon from '@svg/ic_customer';
import ProductsIcon from '@svg/ic_product';
import OddReportsIcon from '@svg/ic_alert';

import DispatchOrderIcon from '@svg/ic_dispatchedorder';
import DispatchOrdersReportsScreen from './DispatchOrdersReportsScreen';
import ProductReportsScreen from './ProductReportsScreen';

import * as AdminAction from '../../actions/adminActions';
import { connect } from 'react-redux';

class ReportsScreen extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getState()
        this.props.getCity()
    }

    componentDidUpdate(prevProps) {
        // const {stateList} = this.props
        // if (prevProps.stateList != stateList) {
        //     console.log('STATE LIST ', stateList)
        // }
    }

    itemPress(screenName){
        const {navigation}=this.props
        navigation.navigate(screenName)
    }

    render() {


        return <View style={styles.container}>

            <ScrollView>

                <View style={[styles.parentView, {marginTop: 20}]}>
                    <HomeItem
                        onPress={() => {
                            this.itemPress('CustomerReportsScreen') //FabricSelectionScreen
                        }}
                        title={ Strings.home.customers}
                        icon={<CustomersIcon width={80} height={80} fill={colors.rgb_e15517}/>}
                    />
                    <HomeItem
                        onPress={() => {
                            this.itemPress('DispatchOrdersReportsScreen') //FabricSelectionScreen

                        }}
                        title={ Strings.home.dispatch_orders}
                        icon={<DispatchOrderIcon width={80} height={80} fill={colors.rgb_e15517}/>}
                    />

                </View>

                <View style={styles.parentView}>
                    <HomeItem
                        onPress={() => {
                            this.itemPress('ProductReportsScreen') //FabricSelectionScreen

                        }}
                        title={ Strings.home.products}
                        icon={<ProductsIcon width={120} height={120} fill={colors.rgb_e15517}/>}
                    />
                    <HomeItem
                        onPress={() => {
                            this.itemPress('OddReportsScreen') //FabricSelectionScreen
                        }}
                        title={ Strings.home.odd_reports}
                        icon={<OddReportsIcon width={90} height={90} fill={colors.rgb_e15517}/>}
                    />
                </View>


            </ScrollView>

        </View>;
    }


}

const mapStateToProps = state => ({
    stateList: state.adminReducer.stateList,
    errorMessage: state.adminReducer.errorMessage,
    status: state.adminReducer.status
})

const mapDispatchToProps = (dispatch) => ({
    getState: () => dispatch(AdminAction.getStateList()),
    getCity: () => dispatch(AdminAction.getCityList()),
})


export default connect(mapStateToProps,mapDispatchToProps)(ReportsScreen);
