/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Component } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import ConsumptionType from './store/ConsumptionType';
import Record from './store/Record';

interface IAppState {
    changeList: boolean;
    records: Record[];
}

export default class App extends Component<any, IAppState> {

    public state: IAppState = {
        changeList: true,
        records: [],
    };

    public async componentDidMount() {
        const records = await this.getRecords();
        const promises = records.map((r) => {
            return ConsumptionType.find((c: ConsumptionType) => c.type === r.type);
        });
        const types = await Promise.all(promises);
        records.forEach((r, index) => {
            r.typeDesc = types[index][0].title;
        });
        this.setState({records});
    }

    public async getRecords(): Promise<Record[]> {
        return await Record.find<Record>();
    }

    public pressTitle = (text: string) => {
        Alert.alert('title', text);
    }

    public addRecord = () => {
        const {records, changeList} = this.state;
        const r = new Record(1, Date.now(), '');
        records.push(r);
        this.setState({records, changeList: !changeList});
    }

    public renderListItem = ({item}: {item: Record}) => {
        return (
            <ListItem
                chevron={false}
                bottomDivider
                title={item.id}
                subtitle="as"
                leftIcon={{name: 'shop', type: 'Entypo'}}
                rightTitle="+3.00"
                rightSubtitle="今天 14:00"
            />
        );
    }

    public keyExtractor = (item: Record) => {
        return item.id;
    }

    public render() {
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
                    extraData={this.state.changeList}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    item: {
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        fontSize: 18,
        height: 44,
        padding: 10,
        width: '100%',
    },
    nav: {
        borderBottomWidth: 1,
        borderColor: '#EEE',
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 0,
        padding: 10,
    },
    navItem: {
        marginRight: 15,
    },
});
