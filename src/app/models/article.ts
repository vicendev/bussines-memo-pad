import { IArticle } from './../interfaces/iarticle';
import * as _ from 'lodash';

export class Article implements IArticle{

    constructor(data){
        _.set(this, 'data', data)
    }

    get article(): string{
        return _.get(this, 'data.article');
    }

    set article(value: string){
        _.set(this, 'data.article', value)
    }

    get quantity(): number{
        return _.get(this, 'data.quantity');
    }

    set quantity(value: number){
        _.set(this, 'data.quantity', value)
    }

    get price(): number{
        return _.get(this, 'data.price');
    }

    set price(value: number){
        _.set(this, 'data.price', value)
    }

    get totalPrice(): number{
        return _.get(this, 'data.totalPrice');
    }

    set totalPrice(value: number){
        _.set(this, 'data.totalPrice', value)
    }

    get total(): number{
        return _.get(this, 'data.total');
    }

    set total(value: number){
        _.set(this, 'data.total', value)
    }

    getData(){
        return _.get(this, 'data');
    }

}
