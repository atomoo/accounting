import React, { useState } from 'react';
import {Alert, Linking, Picker, Text, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';

const ConsumTypeForm: React.FC = () => {
    const types = ['material', 'material-community', 'font-awesome', 'octicon', 'ionicon', 'foundation', 'evilicon',
        'simple-line-icon', 'zocial', 'entypo', 'feather', 'antdesign'];
    const [type, setType] = useState('material');

    const handlePickerChange = (itemValue: any) => {
        setType(itemValue);
    };

    const openHelpDoc = () => {
        Linking.openURL('https://react-native-training.github.io/react-native-elements/docs/icon.html')
            .catch(e => Alert.alert(e));
    };

    return <View style={{marginTop: 10, flex: 1}}>
        <Input label="title" labelStyle={{fontSize: 18}} textContentType="none" spellCheck={false} />
        <Text style={{fontSize: 18, color: '#86939E', fontWeight: 'bold', margin: 10}}>type</Text>
        <View style={{margin: 10, borderWidth: 1, borderColor: '#eee'}}>
            <Picker selectedValue={type} onValueChange={handlePickerChange}>
                {
                    types.map((t) => <Picker.Item key={t} label={t} value={t} />)
                }
            </Picker>
        </View>
        <Input label="name"
            labelStyle={{fontSize: 18}}
            textContentType="none"
            spellCheck={false}
        />
        <Button title="type和name的设置参考文档"
            type="clear"
            containerStyle={{marginTop: 20}}
            icon={<Icon type="feather" name="help-circle" color="#2089DC" />}
            onPress={openHelpDoc}
        />
        <Button title="添加"
            containerStyle={{marginLeft: 10, marginRight: 10, justifyContent: 'flex-end', flex: 1, marginBottom: 30}}
        />
    </View>;
};

export default ConsumTypeForm;
