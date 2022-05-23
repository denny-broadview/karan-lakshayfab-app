import React, { Component } from 'react'
import { Dimensions, Text, View, TouchableOpacity,Platform } from 'react-native'
import Pdf from 'react-native-pdf'
import colors from '../../Resources/Colors'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'
import moment from 'moment'

const fs = RNFetchBlob.fs

export class PdfScreen extends Component {

    constructor() {
        super()
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
        let url = this.props.route.params != undefined ? this.props.route.params.url : ''
        console.log('PDF URL ', url)
        this.setState({
            url
        })
    }

    async convertPdf() {
        let imagePath = null
        if(Platform.OS=='android'){
            await RNFetchBlob.config({
                fileCache: true,
            })
            .fetch('GET', this.state.url)
            .then(resp => {
                console.log(resp)
                return resp.readFile("base64")
            })
            .then(base64Data => {
                // console.log('BASE 64 ', base64Data)
                    this.sharePdf(base64Data)
                fs.unlink(imagePath)
            })
        }else{
            let filePath = null;
            let file_url_length = this.state.url.length;
            const configOptions = {
              fileCache: true,
              path:
                fs.dirs.DocumentDir +'/customer_report_'+ moment()+'.pdf' // no difference when using jpeg / jpg / png /
            };
            RNFetchBlob.config(configOptions)
              .fetch('GET', this.state.url)
              .then(async resp => {
                filePath = resp.path();
                let options = {
                  type: 'application/pdf',
                  title: 'Share Pdf',
                message: 'PDF report',
                  url: filePath // (Platform.OS === 'android' ? 'file://' + filePath)
                };
                await Share.open(options);
                await fs.unlink(filePath);
              });
            // await RNFetchBlob.config({ 
            //     fileCache: true,
            //     path: fs.dirs.DocumentDir +'/customer_report_'+ moment()+'.pdf'
            // })
            // .fetch('GET', this.state.url)
            // .then( async resp => {
            //  let aw  = await RNFetchBlob.fs.cp(resp.path(),fs.dirs.DocumentDir +'/customer_report_'+ moment()+'.pdf').then((e)=>{
            //      console.log(e)
            //  }).catch(ew=>{
            //      console.log(ew)
            //  })
            //     console.log(resp)
            //     imagePath = resp.path()
            //     // let daya =await resp.respInfo().then((r)=>{

            //     //     console.log(r)
            //     // })a
            //     console.log(imagePath)
            // var    options = {
            //         title: 'PDF report',
            //         social: Share.Social.WHATSAPP,
            //         url: imagePath
            //     }
            //         // this.sharePdf(imagePath)
            //         Share.open({
            //             url:imagePath,
            //             type:'application/pdf',
            //             excludedActivityTypes:['addToReadingList','airDrop','copyToPasteBoard','mail','markupAsPDF','openInIBooks','postToFacebook','postToFlickr','saveToCameraRoll','print','postToWeibo']
            //         }).catch((e)=>{
            //             alert(e)
            //         }).then((r)=>{
            //             console.log(r)
            //         })
            //     return resp.readFile("base64")
            // })
            // .then(base64Data => {
            //     // console.log('BASE 64 ', base64Data)
            //     fs.unlink(imagePath)
            // })
        }
        
    }

    async sharePdf(path) {
        var options = {
            title: 'Share Pdf',
            message: 'PDF report',
            social: Share.Social.WHATSAPP,
            url: Platform.OS=='android'? 'data:application/pdf;base64,' + path: path
        }

        await Share.shareSingle(options)


    }

    

    render() {

        const { url } = this.state

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Pdf
                    source={{uri: url}}
                    minScale={1}
                    maxScale={1}
                    scale={1}
                    // fitPolicy={0}
                    enablePaging={true}
                    style={{
                        width: Dimensions.get('window').width,
                        height: 540
                    }}
                />
                <TouchableOpacity 
                onPress={() => {
                    this.convertPdf()
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.rgb_e15517
                }}>
                    <Text style={{fontSize: 16, color: '#fff'}}>{'Share PDF'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PdfScreen
