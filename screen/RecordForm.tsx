import moment from 'moment';
import React, {useState} from 'react';
import {Alert, Picker, View} from 'react-native';
import {Button, Icon, Input, Text} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {NavigationEvents, NavigationParams, NavigationRoute, NavigationScreenProp} from 'react-navigation';
import ConsumptionType from '../store/ConsumptionType';

moment.locale('zh-cn');

interface IRecordFormProps {
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>>;
}

const RecordForm: React.FC<IRecordFormProps> = (props: IRecordFormProps) => {
    const [amount, setAmount] = useState();
    const [amountError, setAmountError] = useState('');
    const [pickerOptions, setPickerOptions] = useState<ConsumptionType[]>([]);
    const [consumptionType, setConsumptionType] = useState();
    const [desc, setDesc] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [createTime, setCreateTime] = useState(new Date());

    const handleAmountChange = (val: string) => {
        setAmount(val);
        if (val && isNaN(Number(val))) {
            setAmountError('请输入正确的金额');
        }
        else {
            setAmountError('');
        }
    };

    const handleTypeChange = (itemValue: string) => {
        setConsumptionType(itemValue);
    };

    const handleDescChange = (descInput: string) => {
        setDesc(descInput);
    };

    const showDateTimePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDateTimePicker = (date: Date) => {
        setDatePickerVisible(false);
    };

    const dateTimeChange = (date: Date) => {
        setCreateTime(date);
        setDatePickerVisible(false);
    };

    const goToCategory = () => {
        props.navigation.navigate('ConsumTypeForm');
    };

    const handleSubmit = () => {
        Alert.alert('submit');
    };

    async function getAllType() {
        const types = await ConsumptionType.find<ConsumptionType>();
        if (types.length > 0) {
            const pickerOptionsFromStore = types.map((t) => ({
                label: t.title,
                value: t.name,
            }));
            setPickerOptions(types);
            setConsumptionType(types[0].name);
        }
    }

    return <View style={{marginTop: 10, flex: 1}}>
        <NavigationEvents onWillFocus={getAllType} />
        <Input placeholder="请输入消费金额"
            label="金额"
            labelStyle={{fontSize: 18}}
            keyboardType="decimal-pad"
            textContentType="none"
            leftIcon={<Icon type="font-awesome" name="cny" />}
            onChangeText={handleAmountChange}
            errorMessage={amountError}
            value={amount}
            spellCheck={false}
        />
        <Text style={{fontSize: 18, color: '#86939E', fontWeight: 'bold', margin: 10}}>
            分类
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0}}>
            <View style={{flex: 1, borderWidth: 1, borderColor: '#eee'}}>
                <Picker style={{height: 40}} mode="dropdown"
                    selectedValue={consumptionType}
                    onValueChange={handleTypeChange}
                >
                    {
                        pickerOptions.map((o) => <Picker.Item key={o.name} label={o.title} value={o.name} />)
                    }
                </Picker>
            </View>
            <Button title="添加分类" type="clear" containerStyle={{width: 100}} onPress={goToCategory} />
        </View>
        <Text style={{fontSize: 18, color: '#86939E', fontWeight: 'bold', margin: 10}}>
            创建时间
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0}}>
            <Text style={{fontSize: 16}}>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Button containerStyle={{width: 100}} title="选择时间" type="clear" onPress={showDateTimePicker} />
        </View>
        <DateTimePicker mode="datetime"
            isVisible={datePickerVisible}
            onCancel={hideDateTimePicker}
            onConfirm={dateTimeChange}
        />
        <Input placeholder="描述信息"
            label="备注"
            labelStyle={{fontSize: 18}}
            multiline
            textContentType="none"
            value={desc}
            spellCheck={false}
            onChangeText={handleDescChange}
        />
        <Button title="提交"
            containerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 30,
                marginLeft: 10,
                marginRight: 10,
            }}
            onPress={handleSubmit}
        />
    </View>;
};
export default RecordForm;
