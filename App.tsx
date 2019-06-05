/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {Alert, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import ConsumTypeForm from './screen/ConsumTypeForm';
import Home from './screen/Home';
import RecordForm from './screen/RecordForm';

const AppNavigator = createStackNavigator(
    {
        Add: {
            navigationOptions: {
                title: 'Add',
            },
            screen: RecordForm,
        },
        ConsumTypeForm: {
            navigationOptions: {
                title: 'Category',
            },
            screen: ConsumTypeForm,
        },
        Home: {
            navigationOptions: {
                title: 'Home',
            },
            screen: Home,
        },
    },
    {
        defaultNavigationOptions: (navigation) => {
            return {
                headerRight: <View>
                    {
                        navigation.navigation.state.routeName === 'Home'
                        && (
                            <Icon name="plus"
                                type="feather"
                                iconStyle={{marginRight: 10}}
                                onPress={() => {
                                    navigation.navigation.navigate('Add');
                                }}
                            />
                        )
                    }
                </View>,
            };
        },
        initialRouteName: 'Home',
    },
);

export default createAppContainer(AppNavigator);
