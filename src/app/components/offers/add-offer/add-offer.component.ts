import { Router } from '@angular/router';
import { Offer } from './../../../models/offer';
import { IOffer } from './../../../interfaces/ioffer';
import { OfferService } from './../../../services/offer.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  public formOffer: FormGroup;
  
  private _newValue: string;
  private _unitPrice: number;
  private _offerStructure: IOffer;
  private _offerObj: Offer;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private router: Router
  ) {

    this.formOffer = this.formBuilder.group({
      article: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl({value: '', disabled: true}),
      totalPrice: new FormControl('', Validators.required)
    })

    this._offerObj = new Offer(this._offerStructure);
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

  addOffer(){

    this.generateOffer(this._offerObj);
    
    this.offerService.createOffer(this._offerObj);

    this.router.navigate(['/list-offers'])
    
  }

  generateOffer(offer: Offer){

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
