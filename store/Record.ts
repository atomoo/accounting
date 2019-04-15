import {Entity, Model, Primary} from './Model';

@Entity()
export default class Record extends Model {
    @Primary
    public id: string;
    public amount: number;
    public createTime: string;
    public type: number;
    public desc?: string;

    constructor(id: string, amount: number, createTime: string, type: number, desc?: string) {
        super();
        this.id = id;
        this.amount = amount;
        this.createTime = createTime;
        this.type = type;
        this.desc = desc;
    }
}
