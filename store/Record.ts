import {Entity, Ignore, Model, Primary} from './Model';

@Entity()
export default class Record extends Model {
    @Primary
    public id: string = '';
    public amount: number;
    public createTime: number;
    public type: string;
    public desc: string = '';
    @Ignore
    public typeDesc: string = '';

    constructor(amount: number, createTime: number, type: string, desc?: string) {
        super();
        this.id = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        this.amount = amount;
        this.createTime = createTime;
        this.type = type;
        if (desc) {
            this.desc = desc;
        }
    }
}
