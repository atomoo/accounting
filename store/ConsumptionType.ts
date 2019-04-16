import {Entity, Model, Primary} from './Model';

@Entity()
export default class ConsumptionType extends Model {
    @Primary
    public name: string;
    public title: string;
    public type: string;

    constructor(name: string, type: string, title: string) {
        super();
        this.name = name;
        this.type = type;
        this.title = title;
    }
}