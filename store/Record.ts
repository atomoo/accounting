import {Model, Entity, Primary, Ignore} from './Model';

@Entity()
class Record extends Model {
    @Primary
    id: string;
    amount: number;
    createTime: Date;
    type: number;
    desc?: string;

    constructor(id: string, amount: number, createTime: Date, type: number, desc?: string) {
        super();
        this.id = id;
        this.amount = amount;
        this.createTime = createTime;
        this.type = type;
        this.desc = desc;
    }
}
