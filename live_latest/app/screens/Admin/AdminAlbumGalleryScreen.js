import React from 'react';
import {Dimensions, FlatList, Image, TouchableOpacity, View, TextInput,Platform} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/AdminProductGalleryStyles';
import HomeItem from '../../components/HomeItem';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import {formatString} from '../../utils/TextUtils';
import TotalPrice from '../../components/TotalPrice';
import EditIcon from '@svg/icon_edit';
import GalleryImage from '../../components/GalleryImage';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import SearchIcon from '@svg/icon_search'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'

const window = Dimensions.get('window');
const width = window.width;
const fs = RNFetchBlob.fs

class AdminAlbumGalleryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: '',
            productList: [],
            searchValue: '',
            searchData: [],
            albumImages: []
        };
    }

    componentDidMount() {

        const {navigation} = this.props;

        this.unsubscribe = navigation.addListener('focus', () => {
            this.getProductsGallery();
        });


    }


    componentWillUnmount(): void {
        this.unsubscribe();
    }

    getProductsGallery() {
        const {productList}=this.state
        if (productList.length===0){
            this.setState({isLoading: true});
        }

        fetch(Constants.BASE_URL + '/users/album_list', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                if (status == '200') {
                    this.setState({productList: responseJson.data});
                } else {
                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({isLoading: false});
                //ToastMessage(error.message.toString());
            });
    }

    //TODO: Get Images of album
    getAlbumImages(album_id) {
        const { albumImages } = this.state
        let data = {
            album_id
        }

        if (albumImages.length === 0) {
            this.setState({isLoading: true})
        }

        fetch(Constants.BASE_URL + '/users/get_gallery', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            const { status, message } = jsonResponse
            
            if (status == '200') {
                let data = jsonResponse.data.map(item => {
                    if(item.gallery_name == null) {
                        return {...item, gallery_name: ''}
                    } else {
                        return item
                    }
                })
                this.convertImage(data)
                // this.setState({albumImages: data})
            } else {
                ToastMessage(message)
            }
        })
        .catch(error => {
            this.setState({isLoading: false})
        })
    }
    
    // TODO: Fetch Image and Convert it to base64
    async convertImage(data) {
        
        let newArr = []
        let limit = data.length > 29 ? 30 : data.length
        for (let i = 0; i < limit; i++) {
            let imagePath = null
            let url = formatString(Constants.IMAGES_URL.LARGE_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.gallery, data[i].gallery_image)
            console.log('URL ', i + url )
            try {
                await RNFetchBlob.config({
                    fileCache: true
                })
                .fetch('GET',url)
                .then(async res => {
                    imagePath = await res.path()
                    return fs.readFile(imagePath,'base64')
                })
                .then(async base64Data => {
                    // await console.log(`Data ${index} `, base64Data)
                    newArr.push('data:image/png;base64,'+base64Data)
                    fs.unlink(imagePath)
                })
            } catch (error) {
                console.log('Error ', error)
            }   
        }
        console.log('new arr : ', JSON.stringify(newArr))
        
        if (newArr.length > 0) {
            this.setState({isLoading: false})
            this.shareImage(newArr)
        }
        
    }

    // TODO: Share album images at once
    async shareImage(album) {
        let shareOption = {
            title: 'Image Share',
            social: Share.Social.WHATSAPP,
            urls: album
        }
        if(Platform.OS=='android'){
            shareOption.message='I am sharing album'
        }
        try {
            const res = await Share.shareSingle(shareOption)
            console.log('RES : ', res)
        } catch (error) {
            console.log('Error : ', error)
        }
    }

    renderFooterComponent() {
        const {navigation} = this.props;
        return <TotalPrice t1={''} t3={''} t2={'Upload Image'}
                           style={{width: '60%', alignSelf: 'center'}}
                           press={() => {
                               navigation.navigate('UploadImageScreen');
                           }}/>;
    }

    renderItem(item, index) {
        const {productList} = this.state;
        const {navigation}=this.props
        const {album_image, album_name, id} = item;
        let imageUrl;
        if (item && album_image) {
            imageUrl = formatString(Constants.IMAGES_URL.GALLERY_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.album, album_image);
        }
       console.log(item);

        let odd = productList.length % 2;

        return <HomeItem
            style={(odd === 1 && index === productList.length - 1) ? {
                maxWidth: width / 2 - 15,
                height: 300,
                justifyContent: 'flex-start',
            } : {maxWidth: width / 2 - 5, height: 300,  justifyContent: 'flex-start',}}

            edit={<TouchableOpacity style={{position:'absolute',zIndex:999,right:10,top:10}} onPress={()=>navigation.navigate('UploadAlbumScreen',{id,album_name,imageUrl})}>
                <EditIcon width={23} height={23} fill={'white'}/>
            </TouchableOpacity>}

            icon={
                <GalleryImage type={Constants.IMAGES_TYPES.album} image={album_image}  styles={{width: '100%', height: '93%', borderRadius: 5,marginHorizontal:-1}}/>
            }
            onPress={() => this.props.navigation.navigate('AdminProductGalleryScreen', {
                album_id: id, album_name,
            })}
            titleStyle={{marginTop: -10}}
            title={album_name}
            
            // isWhatsApp={Platform.OS=='ios'? false : true}
            isWhatsApp={true}
            onPressWhatsAppPress={() => this.getAlbumImages(id)}
        />;
    }
    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/gallery.png')}
                title={Strings.gallery.no_galley_found}
            />

        );
    };


    renderFlatList() {
        const {productList,searchValue, searchData} = this.state;
        return <FlatList
            style={{marginTop: 15, marginBottom:10, marginHorizontal: 1}}
            keyExtractor={(item, index) => item.id || index.toString()}
            data={searchValue ? searchData : productList}
            renderItem={({item, index}) => this.renderItem(item, index)}
            ListEmptyComponent={this._listEmptyComponent}
            numColumns={2}/>;
    }

    // Search filter
    onSearchFilter(text) {
        this.setState({searchValue: text, spinner: false})
        let cpData = this.state.productList
        
        if (text) {
            let newData = cpData.filter(function (item) {
                const albumName = item.album_name != null ? item.album_name.toLowerCase() : ''
                return albumName.indexOf(text.toLowerCase()) > -1
            })
            this.setState({searchData: newData})
            console.log('NEW DATA : ' + JSON.stringify(newData))
        } else {
            this.setState({searchValue: text, productList: cpData})
            
        }
        
    }


    render() {
        const {isLoading, searchValue} = this.state;
        return <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                    <TextInput 
                        style={styles.searchBar} 
                        placeholder='Search Album Name'
                        placeholderTextColor={colors.rgb_0E0E0E}
                        value={searchValue}
                        onChangeText={text => this.onSearchFilter(text)}
                    />
                    <SearchIcon height={30} width={30} fill={colors.rgb_e15517} />
                </View>
            {!isLoading && this.renderFlatList()}
            {isLoading && <LoadingSpinner/>}
        </View>;
    }

}

const mapStateToProps = (state) => ({
    id: state.loginReducer.id,

});

export default connect(null, null)(AdminAlbumGalleryScreen);
