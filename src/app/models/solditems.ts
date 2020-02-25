import { Article } from './article';
import { ISolditems } from './../interfaces/isolditems';
import * as _ from 'lodash';

export class Solditems implements ISolditems{

    constructor(data){
        _.set(this, 'data', data);
    }

    get sale(): Article[]{
        return _.get(this, 'data.sale');
    }

    get total(): number{
        return _.get(this, 'data.total');
    }
    
}
