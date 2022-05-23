import React, {Component} from 'react';
import {
    Dimensions,
    Linking,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import Swiper from 'react-native-swiper';
import NoProductImage from '../../Images/gif/placeholder.gif';
import LoadingSpinner from '../../components/LoadingSpinner';
import {formatString} from '../../utils/TextUtils';
import FabricImage from '../../components/FastImage';
import DeviceInfo from 'react-native-device-info';
import * as customerActions from '../../actions/customerActions';
import * as loginActions from '../../actions/loginActions';
import {connect} from 'react-redux';
import styles from './Styles/CustomerHomeScreenStyles'
import ErrorScreen from '../../components/ErrorScreen';
import VersionCheck from 'react-native-version-check';
import {Strings} from '../../utils/Strings';
import Video from 'react-native-video';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../Resources/Colors';

const isTablet = DeviceInfo.isTablet();

const DEVICE_WIDTH = Dimensions.get('window').width;

const DEVICE_HEIGHT = Dimensions.get('window').height;

let videoRef = null

class CustomerHomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            slider: [],
            homeData: '',
            item1: '',
            item2: '',
            item3: '',
            isDataFound:false,
            latest_catalogs:[],
            isError:false,
            errorMessage:'',
            errorData:{},
            isVideoPlay: false,
            isVideoLoading: false,
            isPlayButton: true,
            isBannerVideoPlay: false,
            isBannerPlayButton : true,
            isBannerVideoLoading: false

        };
    }

    async componentDidMount(): void {
        const{navigation}=this.props


            // KR
       // alert(VersionCheck.getPackageName());        // com.reactnative.app
        //alert(VersionCheck.getCurrentBuildNumber()); // 10
       /* alert(VersionCheck.getCurrentVersion());     // 0.1.1


        VersionCheck.needUpdate().then(async res => {
            console.log(res.storeUrl);    // true
            if (res.isNeeded) {
                Linking.openURL(res.storeUrl);  // open store if update is needed.
            }else {
                this.getHomeAPi()
            }
        });*/

      /*  VersionCheck.getLatestVersion()    // Automatically choose profer provider using `Platform.select` by device platform.
            .then(latestVersion => {
              // alert(latestVersion);    // 0.1.2
            });
*/


        this.unsubscribe = navigation.addListener('focus', async () => {
            this.getHomeAPi()
        });
    }

    async getHomeAPi() {
        const {isDataFound} = this.state
        if (!isDataFound) {
            this.setState({isLoading: true});
        }
        let data = await this.isUserActive();
        if (data && data.status && data.status == 200) {
            messaging().getToken().then((result) => {
                console.log('HOME API : ',JSON.stringify(result));
                this.getHomeData(result);
            });

        } else {
            this.setState({isLoading: false});
            this.props.logout();
        }
    }

    componentWillUnmount(): void {
       this.unsubscribe();
    }

    async isUserActive() {
        const {userId} = this.props;
        let device_id = DeviceInfo.getUniqueId();
        return fetch(Constants.BASE_URL + `/users/authCheck/${userId}/${device_id}`, {
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


    getHomeData(fcm_token) {

        const {userId} = this.props;
        console.log('HOME DATA ',JSON.stringify({user_id: userId,fcm_token,version:VersionCheck.getCurrentVersion(),device_type:Platform.OS}))
            fetch(Constants.BASE_URL + '/users/mobile_home', {
            method: 'POST',
            body: JSON.stringify({user_id: userId,fcm_token,version:VersionCheck.getCurrentVersion(),device_type:Platform.OS}),

        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                // console.log('CustomerHomeScreen',responseJson)
                const {status, message, data} = responseJson;
                if (status == '200') {
                    let {latest_catalogs} = data;
                    // console.log('catalogs--',latest_catalogs)

                    let itemsArr = []
                    let i = 0;
                    while(i < latest_catalogs.length){
                        itemsArr.push(latest_catalogs[i+1] ? {
                            obj1:latest_catalogs[i],
                            obj2:latest_catalogs[i+1]
                        } : {
                            obj1:latest_catalogs[i],
                        }); i = i + 2;
                    }

                    this.setState({
                        isDataFound:true,
                        homeData: data,
                        slider: data.sliders,
                        latest_catalogs:itemsArr,
                    });
                } else if (status=='400'){
                    this.setState({isError:true,errorMessage:message,errorData:data})
                    //ToastMessage(message);
                }


            })
            .catch((error) => {
                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });
    }


    renderCatalog(obj1){
        const {id,catalog_name,product_id,product_image,product_color,fabric_name,catalog_image}=obj1
        const {navigation}=this.props

        return <TouchableOpacity style={styles.latestItemsView} >
            <FabricImage
                type={id=="21"?Constants.IMAGES_TYPES.product:Constants.IMAGES_TYPES.catalog}
                image={id=="21"?product_image:catalog_image}
                imageStyle={styles.latestImageStyle} fallback
                defaultSource={NoProductImage}
                onPressItem={() => {
                    console.log('Object 1 ', obj1)
                    if (id=="21"){
                        this.props.navigation.navigate('ProductDetailScreen', {
                            catalogId:id,
                            productId:product_id,
                            catalogName:catalog_name,
                            productColour: product_color,
                            fabricName:fabric_name,
                            isArhamGSilk:true,
                            item:obj1,
                        });
                    }
                    else{
                        navigation.navigate('ProductSelectionScreen', {
                            catalogId:id,
                            catalogName: catalog_name,
                            fabricName: fabric_name,
                            isArhamGSilk:id=="21",
                            product_id:id=="21"?product_id:undefined
                        })
                    }
        
        
                   /* navigation.navigate('ProductSelectionScreen', {
                        catalogId:id,
                        catalogName: catalog_name,
                        fabricName: fabric_name,
                        isArhamGSilk:id=="21",
                        product_id:id=="21"?product_id:undefined
                    })*/
                }}
                />
            <Text style={styles.titleName}>{id=="21"?obj1.product_color:obj1.catalog_name}</Text>
        </TouchableOpacity>
    }


    _renderItem = (item, index) => {
        //console.log(item.product_image);
        const {navigation} = this.props;
        const {banner_image} = item;
        const {slider} = this.state;

        let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.slider, banner_image);
        let fullImageUrl = formatString(Constants.IMAGES_URL.LARGE_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.slider, banner_image);

        // console.log(fullImageUrl)
        switch (item.type) {
            case 'image':
                return (
                    <View key={index.toString()} style={{alignSelf: 'center'}}>
                        <FabricImage
                            type={Constants.IMAGES_TYPES.slider} image={banner_image}

                            imageStyle={{width: DEVICE_WIDTH, height: (DEVICE_WIDTH * 80 / 100)}} fallback
                            defaultSource={NoProductImage}/>
                    </View>
                )
            case 'video':
                return (
                    <View style={{width: DEVICE_WIDTH, height: (DEVICE_WIDTH * 80 / 100),justifyContent: 'center', alignItems: 'center'}}>
                    <Video 
                        ref={ref => videoRef = ref}
                        source={{uri: 'http://lakshayfabrics.in/assets/uploads/slider/video/' + item.banner_image}}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0
                        }}
                        paused={!this.state.isVideoPlay}
                        onBuffer={(data) => {
                            console.log('Buffer Data ', data)
                            this.setState({isVideoLoading: false})
                        }}
                        onProgress={(data) => {
                            console.log('Progress Data ', data)
                        }}
                        resizeMode='contain'
                        onLoadStart={(meta) => {
                            // this.setState({isVideoLoading: true})
                        }}
                        onLoad={() => {
                            console.log('here')
                            this.setState({isVideoLoading: false})
                        }}
                        onTouchStart={() => {
                            console.log('im touching it')
                            this.setState({isPlayButton: true})
                        }}
                        onTouchEnd={() => {
                            setTimeout(() => {
                                this.setState({isPlayButton: false})
                            }, 10000);
                        }}
                        
                    />
                    {!this.state.isVideoLoading && this.state.isPlayButton ? <MIcon name={!this.state.isVideoPlay ? 'play-circle' : 'pause-circle'} size={60} color={colors.rgb_e15517} onPress={() => {
                        this.setState({isPlayButton: !this.state.isVideoPlay ? false : true, isVideoPlay: !this.state.isVideoPlay})
                    }} /> : null}
                    {this.state.isVideoLoading ? <ActivityIndicator size='small' color={colors.rgb_e15517} /> : null}
                    </View>
                )
        
            default:
                break;
        }



        // return (
        //     <View key={index.toString()} style={{alignSelf: 'center'}}>

        //         <FabricImage
        //             type={Constants.IMAGES_TYPES.slider} image={banner_image}
        //             imageStyle={{width: DEVICE_WIDTH, height: (DEVICE_WIDTH * 80 / 100)}} fallback
        //             defaultSource={NoProductImage}/>

        //     </View>
        // );

    };

    _renderLatestItems = (item, index) => {
        //console.log(item.product_image);
        const {navigation} = this.props;
        const {obj1,obj2}=item
        const {catalog_image1,catalog_image2,catalog_name1,catalog_name2} = item;
        const {slider} = this.state;

        return (<View key={index.toString()} style={{alignSelf: 'center',flexDirection:'row',flex:1}}>
                {this.renderCatalog(obj1)}
                {obj2 && this.renderCatalog(obj2)}
            </View>
        );

    };


    render() {
        const {navigation} = this.props;
        const {slider,latest_catalogs , homeData, isLoading,isError} = this.state;
        // console.log(latest_catalogs);
        if (isLoading) {
            return <LoadingSpinner/>;
        } else {
            return (
              <ScrollView style={{ marginBottom: 20 }}>
                <View
                  style={[
                    styles.minimumItemStyle,
                    { height: (DEVICE_WIDTH * 80) / 100, padding: 1 },
                  ]}
                >
                  <Swiper showsButtons={false} autoplay={false}>
                    {slider.map((item, index) => this._renderItem(item, index))}
                  </Swiper>
                  {slider.length === 0 && (
                    <Image
                      source={NoProductImage}
                      style={{
                        width: DEVICE_WIDTH - 38,
                        height: 250,
                        alignSelf: "center",
                      }}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.shopNow}
                  onPress={() => navigation.navigate("FabricSelectionScreen")}
                >
                  <View style={[styles.view2]}>
                    <View style={styles.button}>
                      <Text style={styles.text5}>Shop Now</Text>
                    </View>
                  </View>

                  <Image
                    source={require("../../Images/logo.png")}
                    style={{
                      width: DEVICE_WIDTH - 15,
                      height: isTablet ? 500 : 240,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductSelectionScreen", {
                      catalogId: 21,
                      catalogName: "Arham G Silk Mills Item",
                      fabricName: "Arham G Silk Mills",
                      isArhamGSilk: true,
                    })
                  }
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 10,
                    backgroundColor: "white",
                    width: DEVICE_WIDTH - 15,
                  }}
                >
                  <View style={[styles.view2]}>
                    <View style={styles.button} activeOpacity={1}>
                      <Text style={styles.text5}>Shop Now</Text>
                    </View>
                  </View>
                  <Image
                    source={require("../../Images/assets/logo1.png")}
                    style={{
                      width: isTablet ? DEVICE_WIDTH - 250 : 200,
                      height: isTablet ? 340 : 135,
                    }}
                  />
                </TouchableOpacity>

                <View>
                  <Text style={styles.latestItemTextStyle}>Latest Items</Text>
                  <View
                    style={[
                      styles.minimumItemStyle,
                      {
                        height: ((DEVICE_WIDTH / 2 + 20) * 149) / 100,
                        padding: 1,
                      },
                    ]}
                  >
                    <Swiper showsButtons={false} autoplay={true}>
                      {latest_catalogs.map((item, index) =>
                        this._renderLatestItems(item, index)
                      )}
                    </Swiper>
                    {latest_catalogs.length == 0 && (
                      <Image
                        source={NoProductImage}
                        style={{
                          width: DEVICE_WIDTH - 38,
                          height: ((DEVICE_WIDTH / 2 + 20) * 149) / 100,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </View>
                </View>
                {homeData.banner_video != '' ? (
                    <View style={{width: DEVICE_WIDTH - 14, height: (DEVICE_WIDTH * 80 / 100),justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                    <Video
                    ref={ref => videoRef = ref}
                    source={{uri: homeData != undefined ? homeData.banner_video : ''}}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                    }}
                    paused={!this.state.isBannerVideoPlay}
                    onBuffer={(data) => {
                        console.log('Buffer Data ', data)
                        this.setState({isBannerVideoLoading: false})
                    }}
                    onProgress={(data) => {
                        console.log('Progress Data ', data)
                    }}
                    resizeMode='contain'
                    onLoadStart={(meta) => {
                        // this.setState({isVideoLoading: true})
                    }}
                    onLoad={() => {
                        console.log('here')
                        this.setState({isBannerVideoLoading: false})
                    }}
                    onTouchStart={() => {
                        console.log('im touching it')
                        this.setState({isBannerPlayButton: true})
                    }}
                    onTouchEnd={() => {
                        setTimeout(() => {
                            this.setState({isBannerPlayButton: false})
                        }, 10000);
                    }}
                    
                />
                {!this.state.isBannerVideoLoading && this.state.isBannerPlayButton ? <MIcon name={!this.state.isBannerVideoPlay ? 'play-circle' : 'pause-circle'} size={60} color={colors.rgb_e15517} onPress={() => {
                        this.setState({isBannerPlayButton: !this.state.isBannerVideoPlay ? false : true, isBannerVideoPlay: !this.state.isBannerVideoPlay})
                    }} /> : null}
                    {this.state.isBannerVideoLoading ? <ActivityIndicator size='small' color={colors.rgb_e15517} /> : null}
                </View>
                ) : (
                  <TouchableOpacity
                    
                  >
                    <FabricImage
                      imageUri={homeData.banner}
                      imageStyle={{
                        width: DEVICE_WIDTH,
                        marginTop: -5,
                        height: (DEVICE_WIDTH * 80) / 100,
                        alignSelf: "center",
                      }}
                      onPressItem={() => navigation.navigate("FabricSelectionScreen")}
                    />
                  </TouchableOpacity>
                )}
                {/* {homeData.bannerVideo != undefined && 
                    homeData.bannerVideo.settings_value == '' ?
                    (<TouchableOpacity onPress={() => navigation.navigate('FabricSelectionScreen')}>
                        <FabricImage
                            imageUri={homeData.banner}
                            imageStyle={{
                                width: DEVICE_WIDTH,
                                marginTop: -5,
                                height: (DEVICE_WIDTH * 80 / 100),
                                alignSelf: 'center',
                            }}/>
                    </TouchableOpacity>)
                    : (
                        <View style={{width: DEVICE_WIDTH, height: (DEVICE_WIDTH * 80 / 100),justifyContent: 'center', alignItems: 'center'}}>
                        <Video 
                            ref={ref => videoRef = ref}
                            source={{uri: 'http://lakshayfabrics.in/assets/uploads/banner/video/Zhld8.mp4'}}
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0
                            }}
                            paused={!this.state.isBannerVideoPlay}
                            onBuffer={(data) => {
                                console.log('Buffer Data ', data)
                                this.setState({isBannerVideoLoading: false})
                            }}
                            onProgress={(data) => {
                                console.log('Progress Data ', data)
                            }}
                            resizeMode='contain'
                            onLoadStart={(meta) => {
                                // this.setState({isVideoLoading: true})
                            }}
                            onLoad={() => {
                                console.log('here')
                                this.setState({isBannerVideoLoading: false})
                            }}
                            onTouchStart={() => {
                                console.log('im touching it')
                                this.setState({isBannerPlayButton: true})
                            }}
                            onTouchEnd={() => {
                                setTimeout(() => {
                                    this.setState({isBannerPlayButton: false})
                                }, 10000);
                            }}
                            poster={{uri: NoProductImage}}
                            
                        />
                        {!this.state.isBannerVideoLoading && this.state.isBannerPlayButton ? <MIcon name={!this.state.isBannerVideoPlay ? 'play-circle' : 'pause-circle'} size={60} color={colors.rgb_e15517} onPress={() => {
                            this.setState({isBannerPlayButton: !this.state.isBannerVideoPlay ? false : true, isBannerVideoPlay: !this.state.isBannerVideoPlay})
                        }} /> : null}
                        {this.state.isBannerVideoLoading ? <ActivityIndicator size='small' color={colors.rgb_e15517} /> : null}
                    </View>
                    )
                    } */}
              </ScrollView>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    userId: state.loginReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHomeScreen);

