import React, { Component } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { Strings } from "../../utils/Strings";
import LocationIcon from "@svg/icon_location";
import CloseIcon from "@svg/icon_close";
import CheckMarkIcon from "@svg/ic_approve";
import LoadingView from "../../components/LoadingView";
import AdminOrderItem from "../../components/AdminOrderItem";
import * as adminActions from "../../actions/adminActions";
import Colors from "../../Resources/Colors";
import ProductOrderItem from "../../components/ProductOrderItem";
import Dash from "react-native-dash";
import { Constants } from "../../Resources";
import ToastMessage from "../../components/ToastMessage";
import TotalPrice from "../../components/TotalPrice";
import styles from "./Styles/AdminOrderDetailStyles";
import DispatchedDetails from "../../components/DispatchedDetails";

class AdminOrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      isLoading: true,
      isNewOrder: this.props.route.params.isNewOrder,
      isRejectedOrder: this.props.route.params.isRejectedOrder,
    };
  }

  componentDidMount(): void {
    const { requestMyOrderDetail, navigation, route } = this.props;

    const { order_id, isApproveOrder } = route.params;

    this.unsubscribe = navigation.addListener("focus", () => {
      this.setState({ isLoading: true });
      requestMyOrderDetail(order_id);
    });
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS
  ): void {
    const { isOrderDetailFound, orderDetailResponse } = this.props;
    if (
      isOrderDetailFound &&
      orderDetailResponse != prevProps.orderDetailResponse &&
      prevState.isLoading
    ) {
      console.log("AllOrdersData Found--", orderDetailResponse);
      const { data } = orderDetailResponse;
      this.setState({
        isLoading: false,
        orderList: data,
      });
    }
  }

  renderOrderFirmTotal(title, message) {
    return (
      <View style={styles.childItemsView}>
        <Text style={styles.titleView}>{title}</Text>
        <Text style={styles.valueView}>{message}</Text>
      </View>
    );
  }

  renderAcceptReject(orderItem) {
    return (
      <View style={styles.acceptRejectStyle}>
        <TouchableOpacity
          style={styles.acceptRejectTouchableStyle}
          onPress={() =>
            this.acceptRejectApi(
              orderItem.id,
              "Approve",
              Strings.messages.order_accept_msg
            )
          }
        >
          <CheckMarkIcon
            width={24}
            height={24}
            fill={Colors.rgb_green}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.acceptRejectTextStyle}>
            {Strings.orders.accept}
          </Text>
        </TouchableOpacity>

        {!this.state.isRejectedOrder && (
          <View style={{ width: 1, backgroundColor: Colors.rgb_666666 }} />
        )}

        {!this.state.isRejectedOrder && (
          <TouchableOpacity
            style={styles.acceptRejectTouchableStyle}
            onPress={() =>
              this.acceptRejectApi(
                orderItem.id,
                "Reject",
                Strings.messages.order_reject_msg
              )
            }
          >
            <CloseIcon width={20} height={20} style={{ marginRight: 10 }} />

            <Text style={styles.acceptRejectTextStyle}>
              {Strings.orders.reject}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderFooterComponent(orderItem) {
    const {
      order_number,
      create_at,
      LR_number,
      bill_number,
      name,
      purchaser_no,
      owner_no,
      address_house_no,
      address_city,
      address_state,
      address_landmark,
      address_mobile_no,
      address_zipcode,
    } = orderItem;
    const { isShipped } = this.props.route.params;

    return (
      <View style={{ marginBottom: 30 }}>
        <View style={styles.footerView}>
          <Text style={styles.footerTextStyle}>{"Customer Details"}</Text>
          <Dash
            style={{ width: "100%", height: 1, marginVertical: 5 }}
            dashColor={Colors.rgb_eaeaea}
            dashGap={0}
          />

          {this.renderOrderFirmTotal("Name", name)}
          {this.renderOrderFirmTotal("Owner No", owner_no)}
          {this.renderOrderFirmTotal("Purchaser No", purchaser_no)}

          <Text
            style={[
              styles.footerTextStyle,
              {
                marginHorizontal: 15,
                marginBottom: 0,
              },
            ]}
          >
            {"Shipping Address"}
          </Text>

          <View style={styles.addressStyle}>
            <LocationIcon
              width={20}
              height={20}
              fill={"black"}
              style={{ marginLeft: 10, flex: 1 }}
            />
            <Text
              style={styles.addressTextStyle}
            >{`${address_house_no} ${address_landmark}  ${address_city}  ${address_state}  ${address_zipcode}`}</Text>
          </View>

          {(this.state.isNewOrder || this.state.isRejectedOrder) &&
            this.renderAcceptReject(orderItem)}
        </View>
        {bill_number != null && LR_number != null && (
          <DispatchedDetails orderItem={orderItem} />
        )}
        {isShipped && bill_number == null && LR_number == null && (
          <TotalPrice
            style={{ width: "60%", alignSelf: "center", marginTop: 10 }}
            textStyle={{}}
            press={() =>
              this.props.navigation.navigate("AddDispatchScreen", {
                order_id: orderItem.id,
              })
            }
            t2={Strings.logs.shipped}
            t1={""}
            t3={""}
          />
        )}
      </View>
    );
  }

  acceptRejectApi(id, status, msg) {
    console.log("cartData--", id);

    let data = {
      order_id: id,
      order_status: status,
    };
    this.setState({ spinner: true });
    fetch(Constants.BASE_URL + "/orders/update_order_status", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const { status, message } = responseJson;
        this.setState({ spinner: false });
        if (status == "200") {
          Alert.alert(
            Constants.APP_NAME,
            msg,
            [
              {
                text: "Ok",
                onPress: () => {
                  console.log("dfg");
                  // this.props.navigation.goBack();
                },
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
          if (this.state.isRejectedOrder) {
            this.setState({ isRejectedOrder: !this.state.isRejectedOrder });
          }
          if (this.state.isNewOrder) {
            this.setState({ isNewOrder: !this.state.isNewOrder });
          }

          this.props.modifyOrder(id, true);
        } else {
          ToastMessage(message);
        }
      })
      .catch((error) => {
        this.setState({ spinner: false });
        ToastMessage(error.message.toString());
      });
  }

  getPdfAPI() {
    console.log(this.state.orderList);
    let data = {
      order_ID: this.state.orderList.id,
      order_number: this.state.orderList.order_number,
    };
    fetch(
      "http://lakshayfabrics.in/api/Reports/oddReportPrintPDF?id=" +
        data.order_ID +
        "&ordernumbers=" +
        data.order_number
    )
      .then((res) => res.json())
      .then((resJSON) => {
        console.log("JSON RES : ", resJSON);
      })
      .catch((e) => {
        console.log("ERROR :: ", e);
      });
  }
  onShare = async () => {
    //  this.getPdfAPI();
    const { isFromApproveOrder } = this.props.route.params;
    let data = {
      order_ID: this.state.orderList.id,
      order_number: this.state.orderList.order_number,
    };
    let url = "";
    if (isFromApproveOrder) {
      url = "ShareProductDetailsOnApprovedOrder?order_id=";
    } else {
      url = "ShareProductDetailsOnDispatchedOrder?order_id=";
    }
    console.log(url)
    // http://lakshayfabrics.in/api/reports/ShareProductDetailsOnDispatchedOrder?order_id=3
    // http://lakshayfabrics.in/api/reports/ShareProductDetailsOnApprovedOrder?order_id=203
    this.props.navigation.navigate("PdfScreen", {
      url: `http://lakshayfabrics.in/api/Reports/${url}${data.order_ID}`,
    });
  };
  render() {
    const { isLoading, orderList } = this.state;
    const { requestAdminOrders, route } = this.props;
    const { isShipped, isApproveOrder } = route.params;
    console.log("order Details", this.state.orderList);
    if (isLoading) {
      return <LoadingView />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ paddingBottom: 20 }}
            keyExtractor={(item, index) => item.id || index.toString()}
            data={orderList.order_item}
            ListHeaderComponent={() => (
              <AdminOrderItem
                isShare={isApproveOrder}
                onItemPress={() => console.log("ss")}
                item={orderList}
                isCustomerOrders={false}
                isNewOrders={false}
                isShippingAddress={true}
                onShare={() => isApproveOrder && this.onShare()}
                onAcceptClick={() => alert("Click")}
                onRejectClick={() => alert("onrejetc")}
              />
            )}
            renderItem={({ item, index }) => (
              <ProductOrderItem
                item={item}
                index={index}
                isNewOrders={false}
                isCustomerOrders={true}
                onDetailsPress={() => alert("ss")}
              />
            )}
            ListFooterComponent={() => this.renderFooterComponent(orderList)}
            loadedAll={true}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isOrderDetailFound: state.adminReducer.isOrderDetailFound,
  orderDetailResponse: state.adminReducer.orderDetailResponse,
  errorMessage: state.adminReducer.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  requestMyOrderDetail: (order_id) =>
    dispatch(adminActions.requestMyOrderDetail(order_id)),
  modifyOrder: (order_id, isModified) =>
    dispatch(adminActions.modifyOrder(order_id, isModified)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOrderDetailScreen);
