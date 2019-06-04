import React, {useEffect, useState} from 'react';
import {Picker, View, Alert} from 'react-native';
import {Button, Icon, Input, Text} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ConsumptionType from '../store/ConsumptionType';

interface IPickerOption {
    label: string;
    value: string;
}

const RecordForm: React.FC = () => {
    const [amount, setAmount] = useState();
    const [amountError, setAmountError] = useState('');
    const [pickerOptions, setPickerOptions] = useState<IPickerOption[]>([]);
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

    const handleSubmit = () => {};

    const showDateTimePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDateTimePicker = (date: Date) => {
        setDatePickerVisible(false);
    };

    const dateTimeChange = (date: Date) => {
        setCreateTime(date);
    };

    useEffect(() => {
        async function getAllType() {
            const types = await ConsumptionType.find<ConsumptionType>();
            if (types.length > 0) {
                const pickerOptionsFromStore = types.map((t) => ({
                    label: t.title,
                    value: t.name,
                }));
                setPickerOptions(pickerOptionsFromStore);
                if (pickerOptionsFromStore.length > 0) {
                    setConsumptionType(pickerOptionsFromStore[0].value);
                }
            }
        }
        getAllType();
    }, []);

    return <View style={{marginTop: 10, flex: 1}}>
        <Input placeholder="请输入消费金额"
            label="金额"
            keyboardType="decimal-pad"
            textContentType="none"
            leftIcon={<Icon type="font-awesome" name="cny" />}
            onChangeText={handleAmountChange}
            errorMessage={amountError}
            value={amount}
            spellCheck={false}
        />
        <Text style={{fontSize: 16, color: '#86939E', fontWeight: 'bold', margin: 10}}>
            分类
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0}}>
            <View style={{flex: 1, borderWidth: 1, borderColor: '#eee'}}>
                <Picker style={{height: 40}} mode="dropdown"
                    selectedValue={consumptionType}
                    onValueChange={handleTypeChange}
                >
                    {
                        pickerOptions.map((o) => <Picker.Item key={o.value} label={o.label} value={o.value} />)
                    }
                </Picker>
            </View>
            <Button title="添加分类" type="clear" containerStyle={{width: 100}} />
        </View>
        <Text style={{fontSize: 16, color: '#86939E', fontWeight: 'bold', margin: 10}}>
            创建时间
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0}}>
            <Text>{createTime.toString()}</Text>
            <Button containerStyle={{width: 100}} title="选择时间" type="clear" onPress={showDateTimePicker} />
        </View>
        <DateTimePicker mode="datetime"
            isVisible={datePickerVisible}
            onCancel={hideDateTimePicker}
            onConfirm={dateTimeChange}
        />
        <Input placeholder="描述信息"
            label="备注"
            multiline
            textContentType="none"
            value={desc}
            spellCheck={false}
            onChangeText={handleDescChange}
        />
        <Button title="提交"
            containerStyle={{marginLeft: 10, marginRight: 10, justifyContent: 'flex-end', flex: 1, marginBottom: 30}}
            onPress={handleSubmit}
        />
    </View>;
};
export default RecordForm;
