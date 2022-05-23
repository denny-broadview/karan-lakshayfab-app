import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/FabricSelectionStyles';
import * as customerActions from '../../actions/customerActions';
import ToastMessage from '../../components/ToastMessage';
import {formatString} from '../../utils/TextUtils';
import {Constants} from '../../Resources';
import LoadingView from '../../components/LoadingView';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import EndlessFlatList from '../../components/EndlessFlatList';
import OffIcon from '@svg/switch';
import OnIcon from '@svg/switch_on';
import Colors from '../../Resources/Colors';
import FabricImage from '../../components/FastImage';
import * as loginActions from '../../actions/loginActions';


class FabricSelectionScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fabricList: '',
            isLoading: false,
        };
        this.pageNumber = 1;

    }

    componentDidMount(): void {
        this.setState({isLoading: true});
        this.onRefresh();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {fabricData, errorMessage} = this.props;

        if (fabricData !== prevProps.fabricData && prevState.isApiRunning) {

            if (fabricData && fabricData.status && fabricData.status && fabricData.status == '200' && fabricData.data) {
                const {pagination, Fabric_data} = fabricData.data;
                this.total = pagination.Totalrecords;
                this.setState({
                    isApiRunning: false,
                    fabricList: this.pageNumber > 1 ? prevState.fabricList.concat(Fabric_data) : Fabric_data,
                });
            } else if (errorMessage) {
                ToastMessage(errorMessage);
            }
            this.setState({isLoading: false});
        }
    }


    handleItem(item, index, fabric_status) {
        const {fabricList} = this.state;
        const {id} = item;
        // this.setState({isLoading:true})

        fetch(`${Constants.BASE_URL}/${Constants.ACTIVE_INACTIVE_URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fabric_id: id,
                status: fabric_status == Constants.FABRIC.ACTIVE ? Constants.FABRIC.INACTIVE : Constants.FABRIC.ACTIVE,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                //    this.setState({isLoading:false})

                const {status} = responseJson;
                if (status == '200') {
                    fabricList[index].fabric_status = fabric_status == Constants.FABRIC.ACTIVE ? Constants.FABRIC.INACTIVE : Constants.FABRIC.ACTIVE;
                    this.setState({fabricList});
                }

            })
            .catch((error) => {
                //   this.setState({isLoading:false})
                console.log('error', error);

            });


    }

    renderItem(item, index) {
        console.log('FABRICS ITEM ', item)
        const {fabric_image, fabric_name, fabric_status} = item;
        let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.fabrics, fabric_image);
        let fabricId = item.id;
        const {role,route} = this.props;
        let isActive = true;


        console.log(fabricId,fabric_name);

        return <TouchableOpacity style={styles.itemStyle}
                                 >

            <FabricImage image={fabric_image} type={Constants.IMAGES_TYPES.fabrics}
                onPressItem={() =>
                    this.props.navigation.navigate('CatalogSelectionScreen', {
                        fabricId, fabricName: fabric_name
                    })}
            />


            <Text style={styles.textStyle}>{fabric_name}</Text>

            {role === Constants.ROLE.DISPATCHER && fabric_status !== Constants.FABRIC.ACTIVE &&
            <TouchableOpacity onPress={() => this.handleItem(item, index, fabric_status)}
                              style={styles.toggleButtonStyle}>
                <OnIcon width={35} height={35} fill={Colors.rgb_000000} style={{marginRight: 10}}/>
            </TouchableOpacity>

            }

            {role === Constants.ROLE.DISPATCHER && fabric_status == Constants.FABRIC.ACTIVE &&
            <TouchableOpacity onPress={() => this.handleItem(item, index, fabric_status)}
                              style={styles.toggleButtonStyle}>
                <OffIcon width={35} height={35} fill={Colors.rgb_e15517} style={{marginRight: 10}}/>
            </TouchableOpacity>

            }
        </TouchableOpacity>;
    }


    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/outofstock.png')}
                title={Strings.cart.out_of_stock}

            />

        );
    };

    onRefresh() {
        this.pageNumber = 1;
        this.setState({isLoading: true, isApiRunning: true});
        const {role, requestFabric} = this.props;
        requestFabric(role == Constants.ROLE.DISPATCHER ? '' : Constants.FABRIC.ACTIVE, this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
    }


    render() {
        const {isLoading, fabricList} = this.state;
        const {requestFabric, role} = this.props;


        return <View style={[styles.container]}>

            {!isLoading &&
            <EndlessFlatList
                style={{marginTop: 5}}
                keyExtractor={(item, index) => item.id || index.toString()}
                data={fabricList}
                onSwipeRefresh={() => this.onRefresh()}
                renderItem={({item, index}) => this.renderItem(item, index)}
                ListEmptyComponent={this._listEmptyComponent}
                loadMore={() => {
                    this.pageNumber++;
                    this.setState({isApiRunning: true});
                    requestFabric(role == Constants.ROLE.DISPATCHER ? '' : Constants.FABRIC.ACTIVE, this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
                }}
                loadedAll={fabricList.length == 0 ? true : fabricList.length >= this.total}
            />
            }
            {isLoading && <LoadingView/>}

        </View>;
    }

}

const mapStateToProps = (state) => ({
    isFabricDataFound: state.customerReducer.isFabricDataFound,
    fabricData: state.customerReducer.fabricData,
    errorMessage: state.customerReducer.errorMessage,
    role: state.loginReducer.role,

});

const mapDispatchToProps = (dispatch) => ({
    requestFabric: (status, page_no, offset) => dispatch(customerActions.requestFabric(status, page_no, offset)),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),

});


export default connect(mapStateToProps, mapDispatchToProps)(FabricSelectionScreen);
