import React from 'react'
import {
    View,
    FlatList, RefreshControl,
} from 'react-native';


import styles from './Styles/EndlessFlatListStyles'
import LoadingSpinner from './LoadingSpinner';
import LoadingView from './LoadingView';

let _renderFooter = (loadedAll, ListFooterComponent) => {
    if (loadedAll) {
        if (ListFooterComponent) {
            return ListFooterComponent()
        } else {
            return null
        }
    } else {
        return (
            <View style={styles.footerContainer}>
                <LoadingView />
            </View>
        )
    }
}

export default function EndlessFlatList(props) {
    if (props.error) {
        return (
            <>
                {props.ListHeaderComponent && props.ListHeaderComponent()}
                {props.error()}
                {props.ListFooterComponent && props.ListFooterComponent()}
            </>
        )
    } else {
        return (
            <FlatList
                {...props}
                ref={props.forwardRef}
                keyExtractor={(item, index) => item.id || index.toString()}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        onRefresh={()=>props.onSwipeRefresh!=undefined?props.onSwipeRefresh():null}
                    />
                }

                ListFooterComponent={() => _renderFooter(props.loadedAll, props.ListFooterComponent)}
                onEndReachedThreshold={0.1}
                onEndReached={!props.loadedAll && props.loadMore}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='always'
            />
        )
    }
}
