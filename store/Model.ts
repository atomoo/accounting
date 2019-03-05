import {AsyncStorage} from 'react-native';

const namespaces: string[] = [];

export function Entity(namespace?: string) {
    return function(target: any) {
        const namespaceKey = namespace || target.constructor.name;
        if (namespaces.indexOf(namespaceKey) === -1) {
            namespaces.push(namespaceKey);
        }
        else {
            throw new Error(`Duplicate model \`${namespaceKey}\``);
        }
    };
}

export class Model {
    create() {
        
    }
    update() {}
    search() {}
    delete() {}
}

// export function
