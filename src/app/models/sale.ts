import { ISale } from './../interfaces/isale';
import * as _ from 'lodash';
import { Solditems } from './solditems';

export class Sale implements ISale{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id');
    }

    set id(value: string){
        _.set(this, 'data.id', value);
    }

    get day(): string{
        return _.get(this, 'data.day')
    }

    set day(value: string){
        _.set(this, 'data.day', value)
    }

    get items_sold(): Solditems[]{
        return _.get(this, 'data.items_sold');
    }

    set items_sold(value: Solditems[]){
        _.set(this, 'data.items_sold', value)
    }


    getData(){
        return _.get(this, 'data');
    }

}
