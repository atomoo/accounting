import AsyncStorage from '@react-native-community/async-storage';
import {pickBy} from 'lodash';

// 用来记录保存到AsyncStorage里面的对象
interface ICollection {
    // key是每个要保存的对象contructor name 对应保存到storage 的key，value 是不需要保存的字段数组
    [key: string]: {
        ignoreKeys: string[],
        primary: string,
        storageKey: string,
    };
}
const collection: ICollection = {};
const tempCollection: ICollection = {};

function findCollectionByStorageKey(storageKey: string) {
    return Object.keys(collection).find((key: string) => collection[key].storageKey === storageKey);
}

export function Entity(namespace?: string) {
    return (target: any) => {
        const className = target.name;
        const storageKey: string = `@Accounting:${namespace || className}`;
        if (collection[className]) {
            throw new Error(`Duplicate model \`${className}\``);
        }
        else if (findCollectionByStorageKey(storageKey)) {
            throw new Error(`Duplicate storageKey \`${storageKey}\``);
        }
        else {
            collection[className] = tempCollection[className];
            delete tempCollection[className];
        }
    };
}

export function Ignore(target: any, propertyKey: string): void {
    const className = target.constructor.name;
    const classInfo = tempCollection[className];
    if (tempCollection[className]) {
        const targetIgnoreKeys = classInfo.ignoreKeys;
        if (Array.isArray(targetIgnoreKeys) && targetIgnoreKeys.indexOf(propertyKey) === -1
            && propertyKey !== classInfo.primary) {
            tempCollection[className].ignoreKeys.push(propertyKey);
        }
    }
    else {
        tempCollection[className] = {
            ignoreKeys: [propertyKey],
            primary: '',
            storageKey: `@Accounting:${className}`,
        };
    }
}

export function Primary(target: any, propertyKey: string): void {
    const className = target.constructor.name;
    if (tempCollection[className]) {
        tempCollection[className].primary = propertyKey;
    }
    else {
        tempCollection[className] = {
            ignoreKeys: [],
            primary: propertyKey,
            storageKey: `@Accounting:${className}`,
        };
    }
}

export class Model {
    public static async find<T extends Model>(this: any, cb?: (item: T, index: number) => boolean): Promise<T[]> {
        const rawData = await AsyncStorage.getItem(collection[this.name].storageKey);
        let findResult = [];
        if (rawData) {
            try {
                const list = JSON.parse(rawData);
                if (Array.isArray(list)) {
                    if (cb) {
                        findResult = list.filter(cb);
                    }
                    findResult = list;
                }
            }
            catch (e) {
                throw new Error(`find ${this.name} error: ${e}`);
            }
        }
        return findResult;
    }

    public async create<T extends Model>() {
        const className = this.constructor.name;
        const collectionInfo = collection[className];
        if (collectionInfo) {
            try {
                const saveObj: Partial<T> = pickBy(this as any, (value: any, key: string) =>
                    !collectionInfo.ignoreKeys.includes(key));
                let dataList: Array<Partial<T>> = [];
                const oldDataDoc = await AsyncStorage.getItem(collectionInfo.storageKey);
                if (oldDataDoc) {
                    dataList = JSON.parse(oldDataDoc);
                    const primaryKey = collectionInfo.primary as (keyof Partial<T>);
                    if (dataList.find((data) => data[primaryKey] === saveObj[primaryKey])) {
                        throw new Error(`Duplicate data, ${JSON.stringify(saveObj)}`);
                    }
                }
                dataList.push(saveObj);
                await AsyncStorage.setItem(collectionInfo.storageKey, JSON.stringify(dataList));
            } catch (error) {
                throw new Error(`create ${className} error: ${error}`);
            }
        }
        else {
            throw new Error(`Need to register model`);
        }
    }
}
