import {pickBy} from 'lodash';
import {AsyncStorage} from 'react-native';

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

function findCollectionByStorageKey(storageKey: string) {
    return Object.keys(collection).find((key: string) => collection[key].storageKey === storageKey);
}

export function Entity(namespace?: string) {
    return (target: any) => {
        const className = target.constructor.name;
        const storageKey: string = namespace || target.constructor.name;
        if (collection[className]) {
            throw new Error(`Duplicate model \`${className}\``);
        }
        else if (findCollectionByStorageKey(storageKey)) {
            throw new Error(`Duplicate storageKey \`${storageKey}\``);
        }
        else {
            collection[className] = {
                ignoreKeys: [],
                primary: 'id',
                storageKey,
            };
        }
    };
}

export function Ignore(target: any, propertyKey: string): void {
    const className = target.constructor.name;
    const classInfo = collection[className];
    const targetIgnoreKeys = classInfo.ignoreKeys;
    if (Array.isArray(targetIgnoreKeys) && targetIgnoreKeys.indexOf(propertyKey) === -1
        && propertyKey !== classInfo.primary) {
        collection[className].ignoreKeys.push(propertyKey);
    }
}

export function Primary(target: any, propertyKey: string): void {
    const className = target.constructor.name;
    const targetIgnoreKeys = collection[className];
    if (Array.isArray(targetIgnoreKeys) && targetIgnoreKeys.indexOf(propertyKey) === -1) {
        collection[className].primary = propertyKey;
    }
}

export class Model {
    public static async find<T extends Model>(this: any, cb?: (item: T, index: number) => T[]): Promise<T[]> {
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
                console.error(e);
            }
        }
        return findResult;
    }

    public async create() {
        const className = this.constructor.name;
        const collectionInfo = collection[className];
        if (collectionInfo) {
            try {
                const saveObj: Partial<this> = pickBy(this as any, (value: any, key: string) =>
                    !collectionInfo.ignoreKeys.includes(key));
                const oldDataDoc = await AsyncStorage.getItem(collectionInfo.storageKey);
                let dataToSave: Array<Partial<this>> = [];
                if (oldDataDoc) {
                    dataToSave = JSON.parse(oldDataDoc);
                }
                dataToSave.push(saveObj);
                await AsyncStorage.setItem(collectionInfo.storageKey, JSON.stringify(dataToSave));
            } catch (error) {
                console.error(error);
            }
        }
        else {
            throw new Error(`Need to register model`);
        }
    }

    public update() {}
    public delete() {}
}

// export function
