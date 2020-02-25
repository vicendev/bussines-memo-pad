import { IOffer } from './../interfaces/ioffer';
import * as _ from 'lodash';

export class Offer implements IOffer{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id')
    }

    set id(value: string){
        _.set(this, 'data.id', value)
    }

    get name(): string{
        return _.get(this, 'data.name')
    }

    set name(value: string){
        _.set(this, 'data.name', value)
    }

    get article(): string{
        return _.get(this, 'data.article')
    }

    set article(value: string){
        _.set(this, 'data.article', value)
    }

    get quantity(): number{
        return _.get(this, 'data.quantity')
    }

    set quantity(value: number){
        _.set(this, 'data.quantity', value)
    }

    get totalPrice(): number{
        return _.get(this, 'data.totalPrice')
    }

    set totalPrice(value: number){
        _.set(this, 'data.totalPrice', value)
    }

    get price(): number{
        return _.get(this, 'data.price')
    }

    set price(value: number){
        _.set(this, 'data.price', value)
    }
    
    getData(){
        return _.get(this, 'data');
    }
}
