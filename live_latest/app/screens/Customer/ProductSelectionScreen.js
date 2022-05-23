import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/ProductSelectionStyles";
import Colors from "../../Resources/Colors";
import ToastMessage from "../../components/ToastMessage";
import * as customerActions from "../../actions/customerActions";
import { convertStringToNumber, formatString } from "../../utils/TextUtils";
import { Constants } from "../../Resources";
import LoadingView from "../../components/LoadingView";
import { Strings } from "../../utils/Strings";
import ErrorScreen from "../../components/ErrorScreen";
import BreadScrum from "../../components/BreadScrum";
import EndlessFlatList from "../../components/EndlessFlatList";
import NoProductImage from "../../Images/assets/no_product.jpg";
import OffIcon from "@svg/switch";
import OnIcon from "@svg/switch_on";
import FabricImage from "../../components/FastImage";
import AddToCart from "../../components/AddToCart";
const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
class ProductSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: "",
      isLoading: false,
      perPiecePrice: "",
      piecesInSet: "",
      addToCart: false,
      searchText: "",
      isSearchEnable: false,
      searchProductList: [],
    };

    this.pageNumber = 1;
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS
  ): void {
    const { isProductDataFound, productData, errorMessage } = this.props;
    const { isSearchEnable, searchCatalogList } = this.state;

    if (
      productData &&
      productData !== prevProps.productData &&
      (prevState.isApiRunning || isSearchEnable)
    ) {
      const { status } = productData;
      console.log("Searchda--", productData);
      if (productData) {
        const { pagination, product_data } = productData.data;
        this.isApiRunning = false;
        if (status == "200") {
          if (isSearchEnable) {
            this.totalSearchRecords = pagination.Totalrecords;
            this.setState({
              isApiRunning: false,
              searchProductList:
                this.pageNumber > 1
                  ? prevState.searchProductList.concat(product_data)
                  : product_data,
            });
          } else {
            this.total = pagination.Totalrecords;
            // debugger
            this.setState({
              isApiRunning: false,
              productList:
                this.pageNumber > 1
                  ? prevState.productList.concat(product_data)
                  : product_data,
            });
          }
        } else {
          ToastMessage(errorMessage);
        }
      }

      this.setState({ isLoading: false });
    }
  }

  componentDidMount(): void {
    this.setState({ isLoading: true });
    this.onRefresh();
  }

  handleItem(item, index, status) {
    const { productList } = this.state;
    const { id } = item;
    fetch(`${Constants.BASE_URL}/${Constants.ACTIVE_INACTIVE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        status:
          status == Constants.FABRIC.ACTIVE
            ? Constants.FABRIC.INACTIVE
            : Constants.FABRIC.ACTIVE,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let st = responseJson.status;

        if (st == "200") {
          productList[index].product_status =
            status == Constants.FABRIC.ACTIVE
              ? Constants.FABRIC.INACTIVE
              : Constants.FABRIC.ACTIVE;
          this.setState({ productList });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderItem(item, index) {
    console.log("PRODUCT ITEM ", item);
    const { catalogId, catalogName, fabricName } = this.props.route.params;
    const { product_status, images, product_stock } = item;
    let imageUrl;
    if (item && item.images.length > 0) {
      imageUrl = formatString(
        Constants.IMAGES_URL.REGULAR_IMAGE,
        Constants.HOST_URL,
        Constants.IMAGES_TYPES.product,
        item.images[0].product_image
      );
    }

    let productId = item.id;

    const { role, route } = this.props;
    const { isArhamGSilk } = route.params;
    return (
      <TouchableOpacity style={styles.itemStyle}>
        <FabricImage
          image={images.length > 0 ? images[0].product_image : ""}
          type={Constants.IMAGES_TYPES.product}
          disabled={role === Constants.ROLE.DISPATCHER || product_stock == 0}
          onPressItem={() => {
            console.log("productId--", item);
            this.props.navigation.navigate("ProductDetailScreen", {
              catalogId,
              productId,
              catalogName,
              productColour: item.product_color,
              fabricName,
              isArhamGSilk,
              item,
            });
          }}
        />

        <Text style={styles.textTitleStyle}>{item.product_color}</Text>

        {role === Constants.ROLE.DISPATCHER &&
          product_status !== Constants.FABRIC.ACTIVE && (
            <TouchableOpacity
              onPress={() => this.handleItem(item, index, product_status)}
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

        {role == Constants.ROLE.DISPATCHER &&
          product_status == Constants.FABRIC.ACTIVE && (
            <TouchableOpacity
              onPress={() => this.handleItem(item, index, product_status)}
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
        {product_stock == 0 ? (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>{"out of stock"}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }

  _listEmptyComponent = () => {
    const { isSearchEnable } = this.state;
    return (
      <ErrorScreen
        image={require("../../Images/assets/outofstock.png")}
        title={
          isSearchEnable
            ? Strings.cart.search_empty_msg
            : Strings.cart.out_of_stock
        }
      />
    );
  };

  onRefresh() {
    this.pageNumber = 1;
    this.setState({ isLoading: true, isApiRunning: true });
    const { searchText } = this.state;
    const { catalogId, product_id } = this.props.route.params;
    const { role, requestProduct } = this.props;
    requestProduct(
      catalogId,
      role == Constants.ROLE.DISPATCHER ? "" : Constants.FABRIC.ACTIVE,
      this.pageNumber,
      Constants.ADMIN.OFFSET_VALUE,
      searchText
    );
  }

  getItemLayout = (data, index) => ({
    length: width + (width * 33) / 100,
    offset: width + ((width * 33) / 100) * index,
    index,
  });

  render() {
    const {
      productList,
      isLoading,
      searchText,
      searchProductList,
      isSearchEnable,
    } = this.state;
    const { requestProduct, role } = this.props;
    const { catalogName, catalogId, fabricName, isArhamGSilk } =
      this.props.route.params;

    if (isLoading) {
      return <LoadingView />;
    } else {
      return (
        <View style={[styles.container, { backgroundColor: "white" }]}>
          {productList.length > 0 && isArhamGSilk && (
            <BreadScrum
              t1={fabricName}
              searchPlaceholder={"Search Items"}
              isCatalogScreen={isArhamGSilk}
              search={(searchText, searchEnable) => {
                if (searchEnable && searchText.length >= 1) {
                  this.pageNumber = 1;
                  this.isApiRunning = true;
                  this.setState({
                    isSearchEnable: true,
                    searchText,
                    isApiRunning: true,
                  });
                  requestProduct(
                    catalogId,
                    role == Constants.ROLE.DISPATCHER
                      ? ""
                      : Constants.FABRIC.ACTIVE,
                    this.pageNumber,
                    Constants.ADMIN.OFFSET_VALUE,
                    searchText
                  );
                } else if (!searchEnable) {
                  this.pageNumber = productList.length / 10;

                  this.setState(
                    { isSearchEnable: false, searchText: "" },
                    () => {
                      this.flatListRef.scrollToIndex({
                        animated: true,
                        index: 0,
                      });
                    }
                  );

                  let le = productList.length;
                  // debugger
                }
              }}
            />
          )}

          {productList.length > 0 && !isArhamGSilk && (
            <BreadScrum
              t2={catalogName}
              t1={fabricName}
              isCatalogScreen={false}
            />
          )}

          {productList.length > 0 && !isArhamGSilk && (
            <View style={styles.piecesHeaderStyle}>
              <Text
                style={styles.textHeaderStyle}
              >{`${productList[0].product_piece} Pieces / Set`}</Text>
              <Text style={styles.textHeaderStyle}>{`${
                Strings.cart.price_symbol
              }${convertStringToNumber(
                productList[0].product_price
              )} / Piece`}</Text>
            </View>
          )}

          <EndlessFlatList
            /* initialScrollIndex={0}*/
            forwardRef={(ref) => {
              this.flatListRef = ref;
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
            keyExtractor={(item, index) => item.id || index.toString()}
            data={isSearchEnable ? searchProductList : productList}
            onSwipeRefresh={() => this.onRefresh()}
            /*getItemLayout={this.getItemLayout}*/
            renderItem={({ item, index }) => this.renderItem(item, index)}
            ListEmptyComponent={
              isSearchEnable
                ? !this.isApiRunning && this._listEmptyComponent
                : this._listEmptyComponent
            }
            loadMore={() => {
              console.log("total--", this.total);

              if (!this.isApiRunning) {
                this.isApiRunning = true;
                this.pageNumber++;
                this.setState({ isApiRunning: true });
                // debugger
                requestProduct(
                  catalogId,
                  role == Constants.ROLE.DISPATCHER
                    ? ""
                    : Constants.FABRIC.ACTIVE,
                  this.pageNumber,
                  Constants.ADMIN.OFFSET_VALUE,
                  searchText
                );
              }
            }}
            loadedAll={
              isSearchEnable
                ? searchProductList.length == 0
                  ? true
                  : searchProductList.length >= this.totalSearchRecords
                : productList.length == 0
                ? true
                : productList.length >= this.total
            }
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isProductDataFound: state.customerReducer.isProductDataFound,
  productData: state.customerReducer.productData,
  errorMessage: state.customerReducer.errorMessage,
  role: state.loginReducer.role,
});

const mapDispatchToProps = (dispatch) => ({
  requestProduct: (catalogId, status, page_no, offset, search) =>
    dispatch(
      customerActions.requestProduct(catalogId, status, page_no, offset, search)
    ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelectionScreen);
