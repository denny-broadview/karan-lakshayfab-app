import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, TextInput, Dimensions, View} from 'react-native';
import styles from './Styles/BreadScrumStyles';
import HomeIcon from '@svg/icon_home';
import SearchIcon from '@svg/icon_search';
import ClearIcon from '@svg/ic_clear';
import BreadScrumIcon from '@svg/icon_breadcums';
import NavigationService from '../navigation/NavigationService';
import {
    Colors,
    Fonts,
} from '@resources';
import colors from '../Resources/Colors';

const width = Dimensions.get('window').width;


function SearchImage(props) {
    const [searchEnable, SetSearchEnable] = useState(false);
    const [searchText, SetSearchText] = useState('');
    const textInputRef = React.createRef();
    const {
        t1,
        t2,
        style,
        title,
        isCatalogScreen,
        textStyles,
        search,
        isSearchEnable,
        searchPlaceholder
    } = props;

    useEffect(() => {
        if (searchEnable) {
            textInputRef.current.focus();
        }

    }, [searchEnable]);

    let size = t1 ? t1.length : 0;

    if (searchEnable) {
        return <View style={[styles.container, style]}>
            <View style={styles.searchStyle}>
                <TextInput
                    ref={textInputRef}
                    placeholder={'Search Items'}
                    placeholderTextColor={colors.rgb_383431}
                    underlineColorAndroid='transparent'
                    onChangeText={text => {
                        search(text, searchEnable);
                        SetSearchText(text);
                    }}
                    numberOfLines={1}
                    value={searchText}
                    style={styles.searchTextInputStyle}
                />

                <TouchableOpacity onPress={() => {
                    if (searchText.length > 0) {
                        SetSearchText('');
                    } else {
                        SetSearchEnable(false);
                        search('', false);
                    }

                }}>
                    <ClearIcon width={23} height={23} fill={Colors.rgb_e15517} style={{marginHorizontal: 15}}/>
                </TouchableOpacity>

            </View>
        </View>;

    } else {
        return (<View style={[styles.container, style]}>
                <TouchableOpacity onPress={() => {
                    NavigationService.navigate('HomeScreen');
                }}>
                    <HomeIcon width={23} height={23} fill={'white'} style={styles.homeIconStyle}/>
                </TouchableOpacity>

                <BreadScrumIcon width={30} height={38} fill={'white'}/>

                <Text numberOfLines={1}
                      style={[t2 ? styles.textStyles : styles.singleTextStyles, size < 10 ? {width: 80} : {width: width / 4}]}>{t1}</Text>

                {t2 && <BreadScrumIcon width={30} height={38} fill={'white'}/>}

                {isCatalogScreen && <TouchableOpacity onPress={() => {

                    SetSearchEnable(true);
                    search('', true);

                }} style={{right: 5, position: 'absolute'}}>
                    <SearchIcon width={30} height={38} fill={'white'}/>
                </TouchableOpacity>}
                {t2 && <Text numberOfLines={1} style={[styles.textStyles]}>{t2}</Text>}
                <Text editable={false} maxLength={10} numberOfLines={1}
                      style={[styles.textStyles, textStyles]}>{title}</Text>
            </View>
        );
    }


}

export default SearchImage;
