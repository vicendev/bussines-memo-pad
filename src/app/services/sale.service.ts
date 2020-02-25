import { Sale } from './../models/sale';
import {map} from 'rxjs/internal/operators';
import { ISale } from './../interfaces/isale';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private _data: any;

  private _saleSelected: Sale;

  get bussines(){
    return this._data;
  }

  get saleSelected(): Sale {
    return this._saleSelected;
  }
  
  set saleSelected(value: Sale) {
    this._saleSelected = value;
  }

constructor(
  private http: HttpClient,
  private afd: AngularFireDatabase) {
 }

 /**
 * Añade una venta
 * @param sale
 */
 createDay(sale: Sale){

  // Obtengo la referencia de bussines
  let saleRef = this.afd.database.ref('bussines');
  console.log(saleRef)

  //Añado un nuevo elemento
  let newSale = saleRef.push();
  
  // Añado un nuevo id con el key del elemento añadido
  sale.id = newSale.key;
  
  // Obtengo el elemento con ese id
  let saleRefId = this.afd.database.ref('bussines/' + sale.id)

  // Seteo el valor de la categoria
  saleRefId.set(sale.getData())

}


  getBussines(): Observable<ISale[]>{
    return this.afd.list<ISale>('/bussines').valueChanges();
  }

  editBussines(sale: Sale): Promise<void> {
    return this.afd.object('bussines/' + sale.id).set(sale.getData());
  }


}
