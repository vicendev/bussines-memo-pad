import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfferService } from './../../../services/offer.service';
import { Offer } from './../../../models/offer';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {

  @ViewChild("modal_delete_offer", {static: false}) modal_delete_offer;

  public listOffer: Offer[];
  public offerObj: Offer; 
  public loadPage: boolean;
  public formOffer: FormGroup;

  constructor(
    private offerService: OfferService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.listOffer = [];
    this.loadPage = true;

    this.formOffer = this.formBuilder.group({
      article: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl({value: '', disabled: true}),
      totalPrice: new FormControl('', Validators.required)
    })
   }

  ngOnInit() {

    this.loadPage = false;
    this.offerService.getOffer().subscribe( offers =>{
      
      _.forEach(offers, item =>{
        this.listOffer.push(item);
      })
    })

    this.loadPage = true;
  }

  editOffer(offer: Offer){
    this.offerService.offerSelected = offer;
  }

  openDeleteModal(offer: Offer){
    this.offerObj = offer;
    this.modalService.open(this.modal_delete_offer);
  }

  deletePosts(){
    this.offerService.deleteOffer(this.offerObj.id);
    this.listOffer = [];
    this.modalService.dismissAll()
  }

}
