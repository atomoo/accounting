import {Entity, Model, Primary} from './Model';

@Entity()
class Record extends Model {
    @Primary
    public id: string;
    public amount: number;
    public createTime: Date;
    public type: number;
    public desc?: string;

    constructor(id: string, amount: number, createTime: Date, type: number, desc?: string) {
        super();
        this.id = id;
        this.amount = amount;
        this.createTime = createTime;
        this.type = type;
        this.desc = desc;
    }
}
