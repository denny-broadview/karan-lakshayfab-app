import { Alert } from 'react-native';
import {Constants} from '../Resources';
function ToastMessage(msg) {
    return (
    Alert.alert(
        Constants.APP_NAME,
        msg,
        [
            {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            }

        ],
        { cancelable: false })
    )
}

export default ToastMessage
