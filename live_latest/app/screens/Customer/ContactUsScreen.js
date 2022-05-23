import React from 'react';
import {View, Text,TouchableOpacity,Platform,Linking} from 'react-native';
import styles from './Styles/ContactUsStyles';
import {Strings} from '../../utils/Strings';
import WhatsAppIcon from '@svg/ic_whatsapp';
import { Colors } from '../../Resources';
import Share from 'react-native-share'
const  ContactUsScreen=()=> {

    const renderView=(label,data)=>{
        return <View style={{flexDirection:'row'}}>
            <Text style={styles.labelStyle}>{label}</Text>
            <Text style={styles.textTitleStyle}>{data}</Text>
        </View>
    }
const onShare=async()=>{
             {renderView('GST','24AFFPJ7581M1Z0')}
             let message = `Name:Hans Jain,\nEmail:Lakshay.fabrics@gmail.com,\nPhone: +91 96383-24333\nLandline No:0261-3951433\nPAN:AFFPJ7581M\nGSTIN:24AFFPJ7581M1Z0\n${Strings.contactUs.address}:${Strings.contactUs.address1}\n${Strings.contactUs.bank_details}\nBank:ICICI Bank\nA/c No:777705007333\nIFSC:ICIC0000850\nBRANCH:NANPURA,SURAT` 
    
       
             const shareOptions = {
            title: 'Share Customer',
            message: message,
            social: Share.Social.WHATSAPP,
        }
    if(Platform.OS=='android'){

        const res = await Share.shareSingle(shareOptions)
        console.log('SHARE RESPONSE ::: ', res)

    }else{

        Linking.openURL(`https://api.whatsapp.com/send?text=${message}`)
    }
}
    return (<View style={styles.container}>
         <View style={styles.parentView}>
             <Text style={styles.titleStyle}>{'Lakshay Fabrics'}</Text>
             {/* Commented WhatsApp functionality */}
           
             <TouchableOpacity onPress={onShare} style={{position: 'absolute', right: 15,top:10}}>
    <WhatsAppIcon width={20} height={20} fill={Colors.rgb_e15517}/>
</TouchableOpacity>
             <Text style={[styles.headerStyle]}>{Strings.contactUs.contact_details}</Text>

             {renderView('Contact Person','Hans Jain')}

             {renderView('Email','Lakshay.fabrics@gmail.com')}
             {renderView('Mobile No','+91 96383-24333')}
             {renderView('Landline No','0261-3951433')}
             {renderView('PAN','AFFPJ7581M')}
             {renderView('GST','24AFFPJ7581M1Z0')}

             <Text style={[styles.headerStyle,{marginTop:15}]}>{Strings.contactUs.address}</Text>
             <Text style={styles.addressStyle}>{Strings.contactUs.address1}</Text>
             <Text style={[styles.headerStyle,{marginTop:15}]}>{Strings.contactUs.bank_details}</Text>

             {renderView('Bank','ICICI Bank')}
             {renderView('A/c No','777705007333')}
             {renderView('IFSC','ICIC0000850')}
             {renderView('BRANCH','NANPURA,SURAT')}



         </View>
    </View>)

}
export default ContactUsScreen

