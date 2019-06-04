/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {createAppContainer, createStackNavigator} from 'react-navigation';
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
                headerRight: <Icon name="plus"
                    type="feather"
                    iconStyle={{marginRight: 10}}
                    onPress={() => {
                        if (navigation.navigation.state.routeName !== 'Add') {
                            navigation.navigation.navigate('Add');
                        }
                    }}
                />,
            };
        },
        initialRouteName: 'Add',
    },
);

export default createAppContainer(AppNavigator);
