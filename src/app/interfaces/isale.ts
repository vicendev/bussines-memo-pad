import { Solditems } from './../models/solditems';

export interface ISale {

    id: string,
    day: string,
    items_sold: Solditems[],
}
