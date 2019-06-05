import React, { useState } from 'react';
import {Alert, Linking, Picker, Text, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import ConsumptionType from '../store/ConsumptionType';
// TODO: 管理已保存的分类
const ConsumTypeForm: React.FC = () => {
    const types = ['material', 'material-community', 'font-awesome', 'octicon', 'ionicon', 'foundation', 'evilicon',
        'simple-line-icon', 'zocial', 'entypo', 'feather', 'antdesign'];
    // icon 分类
    const [type, setType] = useState(types[0]);
    // 分类title
    const [title, setTitle] = useState('');
    // 分类title错误信息
    const [titleErrorInfo, setTitleErrorInfo] = useState('');
    // 分类icon name
    const [name, setName] = useState('');
    const [nameErrorInfo, setNameErrorInfo] = useState('');

    const handlePickerChange = (itemValue: any) => {
        setType(itemValue);
    };

    const handleTitleChange = (titleInput: string) => {
        setTitle(titleInput);
        setTitleErrorInfo('');
    };

    const handleNameInput = (nameInput: string) => {
        setName(nameInput);
    };

    const handleSubmit = async () => {
        if (name && title) {
            const newType = new ConsumptionType(name, type, title);
            try {
                await newType.create();
                Alert.alert('添加成功');
            }
            catch (e) {
                Alert.alert(e);
            }
        }
        else {
            if (!title) {
                setTitleErrorInfo('请输入分类的title');
            }
            if (!name) {
                setNameErrorInfo('请输入icon name');
            }
        }
    };

    const openHelpDoc = () => {
        Linking.openURL('https://react-native-training.github.io/react-native-elements/docs/icon.html')
            .catch((e) => Alert.alert(e));
    };

    return <View style={{marginTop: 10, flex: 1}}>
        <Input label="title"
            labelStyle={{fontSize: 18}}
            textContentType="none"
            spellCheck={false}
            value={title}
            onChangeText={handleTitleChange}
            errorMessage={titleErrorInfo}
        />
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
            value={name}
            onChangeText={handleNameInput}
            errorMessage={nameErrorInfo}
        />
        <Button title="type和name的设置参考文档"
            type="clear"
            containerStyle={{marginTop: 20}}
            icon={<Icon type="feather" name="help-circle" color="#2089DC" />}
            onPress={openHelpDoc}
        />
        <Button title="添加"
            containerStyle={{marginLeft: 10, marginRight: 10, justifyContent: 'flex-end', flex: 1, marginBottom: 30}}
            onPress={handleSubmit}
        />
    </View>;
};

export default ConsumTypeForm;
