import { Observable } from 'rxjs';
import { IOffer } from './../interfaces/ioffer';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Offer } from './../models/offer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private _data: any;

  private _offerSelected: Offer;

  get offerSelected(): Offer {
    return this._offerSelected;
  }

  set offerSelected(value: Offer) {
    this._offerSelected = value;
  }

  constructor(
    private http: HttpClient,
    private afd: AngularFireDatabase
  ) { }

  createOffer(offer: Offer){

      // Obtengo la referencia de bussines
  let offerRef = this.afd.database.ref('offer');

  //Añado un nuevo elemento
  let newSale = offerRef.push();
  
  // Añado un nuevo id con el key del elemento añadido
  offer.id = newSale.key;
  
  // Obtengo el elemento con ese id
  let offerRefId = this.afd.database.ref('offer/' + offer.id)

  // Seteo el valor de la categoria
  offerRefId.set(offer.getData())

  }

  getOffer(): Observable<IOffer[]>{
    return this.afd.list<IOffer>('/offer').valueChanges();
  }

  getOfferById(id:string) { 
    return this.afd.object('offer/' + id).valueChanges()
  }

  editOffer(offer: Offer): Promise<void> {
    return this.afd.object('offer/' + offer.id).set(offer.getData());
  }

  deleteOffer(id:string){
    this.afd.object('/offer/' + id).remove()
    
  }


}
