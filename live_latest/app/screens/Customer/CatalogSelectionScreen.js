import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/CatalogSelectionStyles';
import Colors from '../../Resources/Colors';
import * as customerActions from '../../actions/customerActions';
import ToastMessage from '../../components/ToastMessage';
import LoadingView from '../../components/LoadingView';
import {formatString} from '../../utils/TextUtils';
import {Constants} from '../../Resources';
import ErrorScreen from '../../components/ErrorScreen';
import HeaderTitle from '../../components/HeaderTitle';
import {Strings} from '../../utils/Strings';
import BreadScrum from '../../components/BreadScrum';
import {StackActions} from '@react-navigation/routers/src/StackRouter';
import EndlessFlatList from '../../components/EndlessFlatList';
import NoProductImage from '../../Images/assets/no_product.jpg';
import OffIcon from '@svg/switch';
import OnIcon from '@svg/switch_on';
import FabricImage from '../../components/FastImage';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../components/CustomTextInput';
import * as loginActions from '../../actions/loginActions';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../Resources/Colors';


let videoRef = null

class CatalogSelectionScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            catalogList: [],
            searchCatalogList: [],
            isLoading: false,
            isSearchEnable:false,
            searchText:'',
            currentIndex: -1,
            videoPause: true,
            isVideoLoading: false,
            isPlayButton: true
        };

        this.pageNumber = 1;
        this.isApiRunning=false;
    }


    async componentDidMount(): void {
        this.setState({isLoading:true})
        let data = await this.isUserActive();
        if (data && data.status && data.status == 200) {
            this.onRefresh();
        } else {
            this.setState({isLoading: false});
            this.props.logout();
        }
    }


    async isUserActive() {
        const {userId} = this.props;
        return fetch(Constants.BASE_URL + `/users/authCheck/${userId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return error;
            });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isCatalogDataFound, catalogData, errorMessage} = this.props;
        const {isSearchEnable,searchCatalogList}=this.state

        if (catalogData !== prevProps.catalogData && (this.isApiRunning || isSearchEnable)) {
            const {status} = catalogData;
            const {pagination, catalog_data} = catalogData.data;

            console.log('Response--',catalog_data)
            this.isApiRunning=false
            if (status == '200') {

                if(isSearchEnable){
                    this.totalSearchRecords = pagination.Totalrecords;
                    this.setState({
                        isApiRunning:false,
                        searchCatalogList: this.pageNumber > 1 ? prevState.searchCatalogList.concat(catalog_data) : catalog_data,
                    });
                }else {
                    this.total = pagination.Totalrecords;
                    this.setState({
                        isApiRunning:false,
                        catalogList: this.pageNumber > 1 ? prevState.catalogList.concat(catalog_data) : catalog_data,
                    });
                }


            } else {
                ToastMessage(errorMessage);
            }
            this.setState({isLoading: false});
        }
    }

    handleItem(item, index, status) {
        const {catalogList} = this.state;
        const {id} = item;


        fetch(`${Constants.BASE_URL}/${Constants.ACTIVE_INACTIVE_URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catalog_id: id,
                status: status == Constants.FABRIC.ACTIVE ? Constants.FABRIC.INACTIVE : Constants.FABRIC.ACTIVE,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                let st = responseJson.status;
                if (st == '200') {
                    catalogList[index].catalog_status = status == Constants.FABRIC.ACTIVE ? Constants.FABRIC.INACTIVE : Constants.FABRIC.ACTIVE;
                    this.setState({catalogList});
                }


            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderItem(item, index) {
        console.log('CATALOG ITEM ', item)
        const {catalog_image, fabric_name,catalog_name, catalog_status, catalog_description,catalog_stock,catalog_video} = item;
        let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.catalog, catalog_image);
        let catalogId = item.id;
        const {role,route} = this.props;

        const {isArhamGSilk}=route.params

        let arr = []
        if (catalog_video != null && catalog_video != '') arr.push({item})

        return (
          <View
            disabled={catalog_stock == 0}
            style={styles.itemStyle}
            onPress={() =>
              this.props.navigation.navigate("ProductSelectionScreen", {
                catalogId,
                catalogName: catalog_name,
                fabricName: fabric_name,
                isArhamGSilk,
              })
            }
          >
            <ScrollView horizontal pagingEnabled onScroll={e => console.log('Scroll ', e.nativeEvent.contentOffset.x)}>
              <FabricImage
                image={catalog_image}
                type={Constants.IMAGES_TYPES.catalog}
                onPressItem={() =>
                  this.props.navigation.navigate("ProductSelectionScreen", {
                    catalogId,
                    catalogName: catalog_name,
                    fabricName: fabric_name,
                    isArhamGSilk,
                  })
                }
              />

              {catalog_video != null && catalog_video != '' ? (
                <View style={{ height: "101%", width: "100%", marginLeft: 4 }}>
                  <Video
                    ref={(ref) => (videoRef = ref)}
                    source={{
                      uri:
                        "https://lakshayfabrics.in/assets/uploads/catalog/videos/" +
                        catalog_video,
                      type: "video/mp4",
                    }}
                    // paused={false}
                    selectedVideoTrack={{
                      type: "resolution",
                      value: 480,
                    }}
                    style={{
                      width: Dimensions.get("window").width - 30,
                      height:
                        Dimensions.get("window").width +
                        (Dimensions.get("window").width * 33) / 100,
                    }}
                    resizeMode="cover"
                    onLoadStart={() => console.log("Start")}
                    onLoad={() => console.log("Loading")}
                    onError={(error) => console.log("Error ", error)}
                    onVideoLoadStart={() => console.log("VIDEO LOAD")}
                    onVideoError={(ve) => console.log("Video Err ", ve)}
                    paused={
                      this.state.currentIndex == index
                        ? this.state.videoPause
                        : true
                    }
                    onTouchStart={() => {
                      this.setState({ isPlayButton: true });
                    }}
                    onTouchEnd={() => {
                      setTimeout(() => {
                        this.setState({ isPlayButton: false });
                      }, 10000);
                    }}
                  />
                  {this.state.isPlayButton && (
                    <Icon
                      name={
                        this.state.videoPause ? "play-circle" : "pause-circle"
                      }
                      size={60}
                      color={colors.rgb_e15517}
                      style={{
                        position: "absolute",
                        left: Dimensions.get("window").width / 2 - 40,
                        top: Dimensions.get("window").width / 2,
                      }}
                      onPress={() =>
                        this.setState({
                          videoPause: !this.state.videoPause,
                          isPlayButton: !this.state.videoPause,
                          currentIndex: index,
                        })
                      }
                    />
                  )}
                </View>
              ) : null}
              {catalog_video != null && catalog_video !='' ? 
                <View style={{flexDirection: 'row', flex: 1,alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: 10, left:Dimensions.get("window").width / 2 - 28,  alignSelf: 'center'}}>
                    <View style={{height: 10, width: 10, backgroundColor: colors.rgb_e15517,borderRadius: 20,}}/>
                    <View style={{height: 10, width: 10, backgroundColor: 'rgba(225,85,23,0.8)',borderRadius: 20,marginLeft: 6}}/>
                </View>
              : null }
            </ScrollView>

            <View style={styles.itemContentView}>
              <Text style={styles.textTitleStyle}>{catalog_name}</Text>
              <Text style={styles.textDescriptionStyle}>
                {catalog_description}
              </Text>
            </View>

            {role === Constants.ROLE.DISPATCHER &&
              catalog_status !== Constants.FABRIC.ACTIVE && (
                <TouchableOpacity
                  onPress={() => this.handleItem(item, index, catalog_status)}
                  style={styles.toggleButtonStyle}
                >
                  <OnIcon
                    width={35}
                    height={35}
                    fill={Colors.rgb_000000}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              )}

            {role === Constants.ROLE.DISPATCHER &&
              catalog_status == Constants.FABRIC.ACTIVE && (
                <TouchableOpacity
                  onPress={() => this.handleItem(item, index, catalog_status)}
                  style={styles.toggleButtonStyle}
                >
                  <OffIcon
                    width={35}
                    height={35}
                    fill={Colors.rgb_e15517}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              )}

            {catalog_stock == 0 ? (
              <View style={styles.banner}>
                <Text style={styles.bannerText}>{"out of stock"}</Text>
              </View>
            ) : null}
          </View>
        );


        /* return <TouchableOpacity style={styles.itemStyle}
                                  onPress={() => this.props.navigation.navigate('ProductSelectionScreen', {
                                      catalogId, catalogName: item.catalog_name,fabricName:this.props.route.params.fabricName
                                  })}>

             <Image resizeMode='contain' source={{uri: imageUrl}}
                    style={styles.imageStyle}/>

             <View style={styles.itemContentView}>
                 <Text style={styles.textTitleStyle}>{catalog_name}</Text>
                 <Text style={styles.textDescriptionStyle}>{catalog_description}</Text>
             </View>


         </TouchableOpacity>;*/
    }

    _listEmptyComponent = () => {
        const {isSearchEnable}=this.state
        return (<ErrorScreen
                image={require('../../Images/assets/outofstock.png')}
                title={isSearchEnable?Strings.cart.search_empty_msg:Strings.cart.out_of_stock}

            />

        );
    };

    onRefresh() {
        this.pageNumber=1
        this.setState({isLoading:true,isApiRunning:true})
        const {fabricId} = this.props.route.params;
        const {role, requestCatalog} = this.props;
        this.isApiRunning=true;
        requestCatalog(fabricId, role == Constants.ROLE.DISPATCHER ? '' : Constants.FABRIC.ACTIVE, this.pageNumber, Constants.ADMIN.OFFSET_VALUE,this.state.searchText);
    }
    getItemLayout = (data, index) => ({ length: 50, offset: 50 * index, index })


    render() {
        const {isLoading, catalogList,searchText,searchCatalogList,isSearchEnable} = this.state;
        const {fabricName,fabricId,isArhamGSilk} = this.props.route.params;
        const {requestCatalog,role}=this.props
        if (isLoading) {
            return <LoadingView/>;
        } else {

            return <View style={styles.container}>

                {!isArhamGSilk &&
                <BreadScrum t1={fabricName} isCatalogScreen={true}
                            searchPlaceholder={'Search Items'}
                            search={(searchText,searchEnable)=>{
                    console.log(searchText,searchEnable)
                    if(searchEnable && searchText.length>=1){
                        this.pageNumber=1;
                        this.isApiRunning=true;
                        this.setState({isSearchEnable:true,searchText})
                        requestCatalog(fabricId, role == Constants.ROLE.DISPATCHER ? '' : Constants.FABRIC.ACTIVE,
                            this.pageNumber, Constants.ADMIN.OFFSET_VALUE,searchText);
                    } else  if (!searchEnable){
                        this.pageNumber=catalogList.length/10
                        this.setState({isSearchEnable:false,searchText:''},()=>{
                            this.flatListRef.scrollToIndex({animated: true, index: 0});
                        })
                    }
                }} /> }

                <EndlessFlatList
                    forwardRef={(ref) => { this.flatListRef = ref; }}
                    style={{marginTop: 5, marginBottom: 10}}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={isSearchEnable?searchCatalogList:catalogList}
                    onSwipeRefresh={() => this.onRefresh()}
                  /*  getItemLayout={this.getItemLayout}*/
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    ListEmptyComponent={isSearchEnable?!this.isApiRunning && this._listEmptyComponent:this._listEmptyComponent}
                    loadMore={() => {
                        //this.setState({isApiRunning: true});
                        if(!this.isApiRunning){
                            this.isApiRunning=true;
                            this.pageNumber++;
                            console.log(searchText)

                            requestCatalog(fabricId, role == Constants.ROLE.DISPATCHER ? '' : Constants.FABRIC.ACTIVE, this.pageNumber, Constants.ADMIN.OFFSET_VALUE,searchText);
                        }
                        console.log('--',this.total,'--'+this.pageNumber)

                    }}
                    loadedAll={isSearchEnable?searchCatalogList.length == 0 ? true : searchCatalogList.length >= this.totalSearchRecords:catalogList.length == 0 ? true : catalogList.length >= this.total}
                />

            </View>;
        }
    }

}


const mapStateToProps = (state) => ({
    isCatalogDataFound: state.customerReducer.isCatalogDataFound,
    catalogData: state.customerReducer.catalogData,
    errorMessage: state.customerReducer.errorMessage,
    role: state.loginReducer.role,
    userId: state.loginReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
    requestCatalog: (fabricId, status,page_no, offset,search) => dispatch(customerActions.requestCatalog(fabricId, status,page_no, offset,search)),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),

});
export default connect(mapStateToProps, mapDispatchToProps)(CatalogSelectionScreen);
