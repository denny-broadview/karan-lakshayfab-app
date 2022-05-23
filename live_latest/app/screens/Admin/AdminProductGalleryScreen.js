import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/AdminProductGalleryStyles";
import HomeItem from "../../components/HomeItem";
import { Colors, Constants } from "../../Resources";
import ToastMessage from "../../components/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatString } from "../../utils/TextUtils";
import DeleteIcon from "@svg/ic_delete";
import { Strings } from "../../utils/Strings";
import GalleryImage from "../../components/GalleryImage";
import ErrorScreen from "../../components/ErrorScreen";
import BreadScrum from "../../components/BreadScrum";
import DeviceInfo from "react-native-device-info";
import colors from "../../Resources/Colors";
import SearchIcon from "@svg/icon_search";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import ImagePicker from "react-native-image-crop-picker";
import WhatsAppIcon from "@svg/ic_whatsapp";
import AsyncStorage from "@react-native-community/async-storage";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const isTablet = DeviceInfo.isTablet();
const fs = RNFetchBlob.fs;

class AdminProductGalleryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      searchText: "",
      productList: [],
      searchData: [],
      selectedImage: [],
      selectedIds: "",
    };
    this.lastPress = 0;
  }

  async componentDidMount() {
    const { navigation } = this.props;

    this.unsubscribe = navigation.addListener("focus", async () => {
      this.getProductsGallery();
      //  await   AsyncStorage.removeItem('ImageAlbum')
      let oldData = await AsyncStorage.getItem("ImageAlbum");
      if (
        JSON.parse(oldData) != null &&
        JSON.parse(oldData).length > 0 &&
        oldData != undefined
      ) {
        let array = [];
        JSON.parse(oldData).filter((item) => {
          array.push(item);
        });
        this.setState(
          {
            selectedImage: array,
          },
          () => {
            console.log("its old data", this.state.selectedImage);
          }
        );
      }
    });
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  getProductsGallery() {
    const { navigation, album_id } = this.props.route.params;

    const { productList } = this.state;
    let data = {
      album_id,
    };

    if (productList.length === 0) {
      this.setState({ isLoading: true });
    }

    fetch(Constants.BASE_URL + "/users/get_gallery", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const { status, message } = responseJson;
        this.setState({ isLoading: false });
        console.log(responseJson);
        if (status == "200") {
          let data = responseJson.data.map((item) => {
            if (item.gallery_name == null) {
              return { ...item, gallery_name: " " };
            } else {
              return item;
            }
          });
          this.setState({ productList: data });
        } else {
          ToastMessage(message);
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  deleteImage(gallery_id, index) {
    const { navigation, album_id } = this.props.route.params;

    let data = {
      gallery_id,
    };

    this.setState({ isLoading: true });

    fetch(Constants.BASE_URL + "/users/delete_gallery", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const { status, message } = responseJson;
        this.setState({ isLoading: false });
        let { productList } = this.state;
        console.log(responseJson);
        if (status == "200") {
          productList.splice(index, 1);
          this.setState({ productList });
        } else {
          ToastMessage(message);
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  deleteImagePopup(gallery_id, index) {
    Alert.alert(
      Constants.APP_NAME,
      Strings.gallery.delete_msg,
      [
        {
          text: "Ok",
          onPress: () => {
            this.deleteImage(gallery_id, index);
          },
          style: "cancel",
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("s");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  async longPressHanlder(item) {
    if (
      !JSON.stringify(this.state.selectedImage).includes(JSON.stringify(item))
    ) {
      this.setState(
        {
          selectedImage: [...this.state.selectedImage, item],
        },
        async () => {
          let data = this.state.selectedImage;
          await AsyncStorage.setItem("ImageAlbum", JSON.stringify(data));
          let existData = await AsyncStorage.getItem("ImageAlbum");
          // console.log(existData)
        }
      );
    } else {
      let arr = this.state.selectedImage.filter((e) => {
        return JSON.stringify(e) != JSON.stringify(item);
      });
      this.setState({ selectedImage: arr }, async () => {
        let data = this.state.selectedImage;
        await AsyncStorage.setItem("ImageAlbum", JSON.stringify(data));
        let existData = await AsyncStorage.getItem("ImageAlbum");
        // console.log(' Selected Image  ',existData)
      });
      console.log("remove ", this.state.selectedImage);
    }
  }
  onPressHandler(fullImageUrl) {
    this.props.navigation.navigate("ImageZoomScreen", {
      imageUrl: fullImageUrl,
    });
  }

  // TODO: convert selected ids to string
  convertIdsToString(selectedImage) {
    const { selectedIds } = this.state;
    let ids = selectedImage.map((e) => {
      return e.id;
    });
    ids = ids.toString();
    this.props.navigation.navigate("PdfScreen", {
      url: `https://lakshayfabrics.in/api/reports/selectedGalleryPDF?gallery_ids=${ids}&sort_by_name=ASC`,
    });
  }

  renderItem(item, index) {
    // console.log('ITEM ', item)
    const { productList } = this.state;
    const { gallery_image, id, gallery_name, gallery_price } = item;
    let imageUrl, fullImageUrl;
    if (item && gallery_image) {
      imageUrl = formatString(
        Constants.IMAGES_URL.GALLERY_IMAGE,
        Constants.HOST_URL,
        Constants.IMAGES_TYPES.gallery,
        gallery_image
      );
    }
    fullImageUrl = formatString(
      Constants.IMAGES_URL.LARGE_IMAGE,
      Constants.HOST_URL,
      Constants.IMAGES_TYPES.gallery,
      gallery_image
    );
    let odd = productList.length % 2;
    let isSelected = this.state.selectedImage.filter((datas) => {
      // console.log('Is selected or not:::',datas==JSON.stringify(item))
      // console.log('actual',item)
      // console.log('selected',datas)
      // console.log()
      return datas.barcode == item.barcode;
      // if(JSON.stringify(datas)==item){
      //     console.log('isSelected here',true)
      // }
    });
    return (
      <HomeItem
        style={
          odd === 1 && index === productList.length - 1
            ? {
                maxWidth: width / 2 - 15,
                height: 300,
                justifyContent: "flex-start",
              }
            : {
                maxWidth: width / 2 - 5,
                height: 320,
                justifyContent: "flex-start",
                paddingBottom: 5,
              }
        }
        edit={
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 999, right: 10, top: 10 }}
            onPress={() => this.deleteImagePopup(id, index)}
          >
            <DeleteIcon width={23} height={23} fill={"white"} />
          </TouchableOpacity>
        }
        icon={
          <GalleryImage
            type={Constants.IMAGES_TYPES.gallery}
            image={gallery_image}
            styles={{
              width: "100%",
              height: "90%",
              borderRadius: 5,
              marginHorizontal: -1,
            }}
          />
        }
        onPress={() => {
          // this.doubleTapHandler(fullImageUrl)
          if (this.state.selectedImage.length > 0) {
            this.longPressHanlder(item);
          } else {
            this.onPressHandler(fullImageUrl);
          }
        }}
        titleStyle={{ marginTop: -10 }}
        title={gallery_name ? gallery_name : ""}
        price={gallery_price ? gallery_price : ""}
        isWhatsApp={true}
        onPressWhatsAppPress={() => this.convertImage(gallery_image, item)}
        onLongPress={() => {
          // if(Platform.OS=='android'){
          console.log(this.state.selectedImage.length);
          if (this.state.selectedImage.length > 0) {
            this.onPressHandler(fullImageUrl);
          } else {
            this.longPressHanlder(item);
          }
          // }else{
          //     this.onPressHandler(fullImageUrl)
          // }

          // this.longPressHanlder(item)
        }}
        isSelected={JSON.stringify(this.state.selectedImage).includes(
          JSON.stringify(item)
        )}
      />
    );
  }

  renderHeader() {
    const { album_name } = this.props.route.params;
    return (
      <View style={{ marginBottom: 10, marginHorizontal: 5 }}>
        {this.state.selectedImage.length >= 1 && (
          <View
            style={{
              marginBottom: 5,
              marginHorizontal: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {/* Commented WhatsApp functionality */}
            {Platform.OS == "android" && (
              <>
                <Text
                  onPress={() =>
                    this.convertMultipleImage(this.state.selectedImage)
                  }
                  style={styles.headerStyle}
                >
                  <WhatsAppIcon height={20} width={20} /> Share Images
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: Colors.rgb_e15517,
                  }}
                >
                  OR
                </Text>
              </>
            )}
            <Text
              onPress={() => this.convertIdsToString(this.state.selectedImage)}
              style={styles.headerStyle}
            >
              <WhatsAppIcon height={20} width={20} /> Share Rate List
            </Text>
          </View>
        )}
        <Text style={styles.headerStyle}>{album_name}</Text>
      </View>
    );
  }

  _listEmptyComponent = () => {
    return (
      <ErrorScreen
        image={require("../../Images/assets/gallery.png")}
        title={Strings.gallery.no_galley_found}
      />
    );
  };

  renderFlatList() {
    const { productList, searchText, searchData } = this.state;
    let items =
      searchText.length > 0
        ? searchData.filter((e) => {
            return e.gallery_name
              .toString()
              .toLowerCase()
              .includes(searchText.toString().trim().toLowerCase());
          })
        : productList.filter((e) => {
            return e.gallery_name
              .toString()
              .toLowerCase()
              .includes(searchText.toString().trim().toLowerCase());
          });
    return (
      <FlatList
        style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 5 }}
        keyExtractor={(item, index) => item.id || index.toString()}
        data={items}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        ListHeaderComponent={() => this.renderHeader()}
        ListEmptyComponent={this._listEmptyComponent}
        numColumns={2}
      />
    );
  }

  // Search filter
  onSearchFilter(text) {
    this.setState({ searchText: text, spinner: false });
    let cpData = this.state.productList;
    console.log("CP DATA", cpData);
    if (text) {
      let newData = cpData.filter(function (item) {
        const albumName =
          item.gallery_name != null ? item.gallery_name.toLowerCase() : "";
        return albumName.indexOf(text.toLowerCase()) > -1;
      });
      this.setState({ searchData: newData });
      console.log("NEW DATA : " + JSON.stringify(newData));
    } else {
      this.setState({ searchText: text, productList: cpData });
    }
  }

  // Convert image to base64
  async convertImage(image, item) {
    let imagePath = null;
    let url = formatString(
      Constants.IMAGES_URL.LARGE_IMAGE,
      Constants.HOST_URL,
      Constants.IMAGES_TYPES.gallery,
      image
    );
    try {
      await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        .then((res) => {
          imagePath = res.path();
          return fs.readFile(imagePath, "base64");
        })
        .then((base64data) => {
          // console.log('data ', base64data)
          this.shareImage(base64data, item);
          fs.unlink(imagePath);
        });
    } catch (error) {
      console.log("Convert Error :: ", error);
    }
  }

  // Share single image
  async shareImage(image, item) {
    var options = {
      title: "Image Share",
      message: `Name: ${item.gallery_name} \n Price: ${item.gallery_price}`,
      social: Share.Social.WHATSAPP,
      url: "data:image/png;base64," + image,
    };
    try {
      const res = await Share.shareSingle(options);
      console.log("Share RES : " + JSON.stringify(res));
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  // TODO: Convert multiple image
  async convertMultipleImage(data) {
    this.setState({ isLoading: true });
    let newArr = [];
    let limit = data.length > 29 ? 30 : data.length;
    for (let i = 0; i < limit; i++) {
      let imagePath = null;
      let url = formatString(
        Constants.IMAGES_URL.LARGE_IMAGE,
        Constants.HOST_URL,
        Constants.IMAGES_TYPES.gallery,
        data[i].gallery_image
      );
      try {
        await RNFetchBlob.config({
          fileCache: true,
        })
          .fetch("GET", url)
          .then(async (res) => {
            imagePath = await res.path();
            return fs.readFile(imagePath, "base64");
          })
          .then(async (base64Data) => {
            newArr.push("data:image/png;base64," + base64Data);
            fs.unlink(imagePath);
          });
      } catch (error) {
        console.log("error ", error);
      }
    }

    if (newArr.length > 0) {
      this.shareMultipleImage(newArr);
      this.setState({ isLoading: false });
    }
  }

  //TODO: share multiple image
  async shareMultipleImage(album) {
    // console.log(album)
    let shareOption = {
      title: "Image Share",
      social: Share.Social.WHATSAPP,
      urls: album,
      // message:
    };
    try {
      const res = await Share.shareSingle(shareOption);
      this.setState({ selectedImage: [] }, async () => {
        await AsyncStorage.removeItem("ImageAlbum");
      });
    } catch (error) {
      alert("catch");

      console.log("Error ", error);
    }
  }

  render() {
    console.log(this.state.productList);
    const { isLoading, searchText } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Image Name"
            placeholderTextColor={colors.rgb_0E0E0E}
            value={searchText}
            onChangeText={(text) => this.onSearchFilter(text)}
          />
          <SearchIcon height={30} width={30} fill={colors.rgb_e15517} />
        </View>
        {!isLoading && this.renderFlatList()}

        {isLoading && <LoadingSpinner />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.loginReducer.id,
});

export default connect(null, null)(AdminProductGalleryScreen);
