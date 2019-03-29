import {pickBy} from 'lodash';
import {AsyncStorage} from 'react-native';

// 用来记录保存到AsyncStorage里面的对象
interface ICollection {
    // key是每个要保存的对象contructor name 对应保存到storage 的key，value 是不需要保存的字段数组
    [key: string]: {
        storageKey: string,
        ignoreKeys: string[],
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
                storageKey,
            };
        }
    };
}

export function Ignore(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const className = target.constructor.name;
    const targetIgnoreKeys = collection[className];
    if (Array.isArray(targetIgnoreKeys) && targetIgnoreKeys.indexOf(propertyKey) === -1) {
        collection[className].ignoreKeys.push(propertyKey);
    }
}

export class Model {
    public async save() {
        const className = this.constructor.name;
        const collectionInfo = collection[className];
        if (collectionInfo) {
            const saveObj = pickBy(this, (value, key) => !collectionInfo.ignoreKeys.includes(key));
            await AsyncStorage.setItem(collectionInfo.storageKey, JSON.stringify(saveObj));
        }
        else {
            throw new Error(`Need to register model`);
        }
    }
    public update() {}
    public search() {}
    public delete() {}
}

// export function
