import { Router } from '@angular/router';
import { OfferService } from './../../../services/offer.service';
import { Offer } from './../../../models/offer';
import { IOffer } from './../../../interfaces/ioffer';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  public formOffer: FormGroup;
  
  private _newValue: string;
  private _unitPrice: number;
  private _offerObj: Offer;
  private _editedOffer: Offer;
  private _offerStructure: IOffer;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private router: Router
  ) {
    this._editedOffer = new Offer(this._offerStructure);
    this._offerObj = this.offerService.offerSelected;

    this.formOffer = this.formBuilder.group({
      article: new FormControl(this._offerObj.article, Validators.required),
      quantity: new FormControl(this._offerObj.quantity, Validators.required),
      price: new FormControl({value: this._offerObj.price, disabled: true}),
      totalPrice: new FormControl(this._offerObj.totalPrice, Validators.required)
    })
   }

  get article(){
    return this.formOffer.get('article');
  }

  get quantity(){
   return this.formOffer.get('quantity');
  }

  get price(){
    return this.formOffer.get('price');
  }

  get totalPrice(){
    return this.formOffer.get('totalPrice');
  }

  ngOnInit() {
  }

  editOffer(){

    this.generateOffer(this._editedOffer);

    console.log(this._editedOffer);
    
    this.offerService.editOffer(this._editedOffer);

    this.router.navigate(['/list-offers'])
    
  }

  generateOffer(offer: Offer){

    offer.id = this._offerObj.id;
    offer.name = this.generateNameOffer();
    offer.article = this.formOffer.controls['article'].value;
    offer.quantity = this.formOffer.controls['quantity'].value;
    offer.totalPrice = this.formOffer.controls['totalPrice'].value;
    offer.price = this.formOffer.controls['price'].value;

  }

  generateNameOffer():string{
    const article = this.formOffer.controls['article'].value;
    const quantity = this.formOffer.controls['quantity'].value;
    const totalPrice = this.formOffer.controls['totalPrice'].value;

    const name = quantity + ' x ' + article + ' = ' + totalPrice;

    return name;
  }

  removeFirstZero(){
    const valueQuantity = this.formOffer.controls['quantity'].value;
    const valuePrice = this.formOffer.controls['price'].value;

    const firstCharQuantity = String(valueQuantity).trim().charAt(0);
    const firstCharPrice = String(valuePrice).trim().charAt(0);

    if(firstCharQuantity == '0'){
      this._newValue = String(valueQuantity).replace(String(firstCharQuantity),'')
      this.formOffer.patchValue({quantity:this._newValue});
    }

    if(firstCharPrice == '0'){
      this._newValue = String(valuePrice).replace(String(firstCharPrice),'')
      this.formOffer.patchValue({price:this._newValue});
    }
  }

  removeChar(){
    const valueQuantity = this.formOffer.controls['quantity'].value;
    const valuePrice = this.formOffer.controls['price'].value;
    
    this._newValue = String(valueQuantity).trim().replace(/[\s+-.,]/g, "")
    this.formOffer.patchValue({quantity:this._newValue});

    this._newValue = String(valuePrice).trim().replace(/[\s+-.,]/g, "")
    this.formOffer.patchValue({price:this._newValue});

  }

  stringFormatFactory(){

    this.removeFirstZero();
    this.removeChar();
    this.UnitPrice();
    
  }

  UnitPrice(){

    this._unitPrice = this.formOffer.controls['totalPrice'].value / this.formOffer.controls['quantity'].value
    this._unitPrice = Math.floor(this._unitPrice);
    this.formOffer.patchValue({price:this._unitPrice});

  }

}
