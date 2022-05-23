import React, { useState ,useEffect} from "react";
import { Button, View,Appearance } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useSelector} from 'react-redux';

const DateTimePicker = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [theme,SetTheme]=useState(Appearance.getColorScheme() === 'dark')
    const {handleConfirm,hideDatePicker,visible,minDate,cancelPicker}=props

    useEffect(()=>{

    },[])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hidePicker = () => {
        setDatePickerVisibility(false);
        hideDatePicker()
    };

    const handleConfirmButton = (date) => {
        //console.warn("A date has been picked: ", date);
        hidePicker();
        handleConfirm(date)
    };

    const cancelDatePicker=()=>{
        hideDatePicker()
        cancelPicker!=null ?cancelPicker():null
    }

    return (
        <View>
            <DateTimePickerModal
                {...props}
                isVisible={visible  }
                mode="date"
               /* pickerContainerStyleIOS={{
                    backgroundColor:theme?'black':'white'
                }}*/
                minDate={minDate}
                onConfirm={handleConfirmButton}
                onCancel={cancelDatePicker}

            />
        </View>
    );
};

export default DateTimePicker
