/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Alert
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';

type Props = {};

interface Record {
    id: string,
    amount: number,
    createTime: Date,
    type: number,
    desc?: string
}

interface AppState {
    records: Array<Record>
}


export default class App extends Component<Props, AppState> {

    state:AppState = {
        records: []
    };

    pressTitle = (text:string) => {
        Alert.alert('title', text);
    };

    addRecord = () => {
        const records = this.state.records;
        records.push({
            id: Math.random() + '',
            amount: Math.floor(Math.random() * 100),
            createTime: new Date(),
            type: 1,
            desc: ''
        });
        this.setState({records});
    }

    renderListItem = ({item}:{item: Record}) => {
        return (
            <ListItem
                chevron={false}
                bottomDivider
                title={item.id}
                subtitle="as"
                leftIcon={{name: 'shop', type:'Entypo'}}
                rightTitle="+3.00"
                rightSubtitle="今天 14:00"
            />
        );
    };

    keyExtractor = (item:Record) => {
        return item.id;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <Icon name="search" containerStyle={styles.navItem} type="feather" onPress={() => {
                        this.pressTitle('search');
                    }} />
                    <Icon name="plus" type="feather" onPress={this.addRecord} />
                </View>
                <FlatList
                    data={this.state.records}
                    renderItem={this.renderListItem}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    nav: {
        borderBottomWidth: 1,
        borderColor: '#EEE',
        borderStyle: 'solid',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 0
    },
    navItem: {
        marginRight: 15
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        width: '100%',
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
});
