import { Offer } from './../../models/offer';
import { OfferService } from './../../services/offer.service';
import { ISolditems } from './../../interfaces/isolditems';
import { Router } from '@angular/router';
import { Article } from './../../models/article';
import { ISale } from './../../interfaces/isale';
import { Sale } from 'src/app/models/sale';
import { SaleService } from './../../services/sale.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Dropdown } from 'primeng/dropdown/dropdown';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddSaleComponent implements OnInit {

  displayedColumns: string[] = ['article','quantity','price','totalPrice']
  tableFooterColumns: string[] = ['article','quantity'];
  dataSource = new BehaviorSubject([]);

  public formSale: FormGroup;
  public listArticles: Article[];
  public saleSelected: Sale;
  public offersDropdown: any[];
  public offerSelected: any;

  public numSales: number;

  private  _sale: ISale;
  private _solditems: ISolditems;

  private _totalPrice: number;
  private _totalSale: number;
  private _newValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private offerService: OfferService,
    private router: Router
  ) {
    this.saleSelected = null;

    this._sale = {
      id: '',
      day: '',
      items_sold:[]
    }

    this._solditems = {
      sale:[],
      total:0
    }

    this.listArticles = [];
    this.offersDropdown = [];
    this._totalPrice = 0;
    this._totalSale = 0;

    this.formSale = this.formBuilder.group({
      article: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      totalPrice: new FormControl({value: '', disabled: true}),
      totalSale: new FormControl({value: '', disabled: true})
    })
    
   }

   get article(){
     return this.formSale.get('article');
   }

   get quantity(){
    return this.formSale.get('quantity');
  }

  get price(){
    return this.formSale.get('price');
  }

  get totalPrice(){
    return this.formSale.get('totalPrice');
  }
  

  ngOnInit() {
    this.loadSale();
    this.loadOffers();
  }

  /**
   * Agrega Ariculo a la tabla de articulos
   */
  addArticle(){
    this.formSale.get('totalSale').enable();
    this.formSale.get('totalPrice').enable();
    this.listArticles.push(this.formSale.value);
    this.dataSource.next(this.listArticles);
    this.formSale.get('totalSale').disable();
    this.formSale.get('totalPrice').disable();

    this.resetForm();
  }

  /**
   * Suma la totalidad de cantidad por precio
   */
  totalSum(){
    this.stringFormatFactory();
    this.sumTotal();

    this._totalPrice = this.formSale.controls['quantity'].value * this.formSale.controls['price'].value
    this.formSale.patchValue({totalPrice:this._totalPrice});
  }

  /**
   * Remueve los 0 que estan al prinicipio de un input
   */
  removeFirstZero(){
    const valueQuantity = this.formSale.controls['quantity'].value;
    const valuePrice = this.formSale.controls['price'].value;

    const firstCharQuantity = String(valueQuantity).trim().charAt(0);
    const firstCharPrice = String(valuePrice).trim().charAt(0);

    if(firstCharQuantity == '0'){
      this._newValue = String(valueQuantity).replace(String(firstCharQuantity),'')
      this.formSale.patchValue({quantity:this._newValue});
    }

    if(firstCharPrice == '0'){
      this._newValue = String(valuePrice).replace(String(firstCharPrice),'')
      this.formSale.patchValue({price:this._newValue});
    }
  }

  /**
   * Remueve caracteres especiales
   */
  removeChar(){
    const valueQuantity = this.formSale.controls['quantity'].value;
    const valuePrice = this.formSale.controls['price'].value;
    
    this._newValue = String(valueQuantity).trim().replace(/[\s+-.,]/g, "")
    this.formSale.patchValue({quantity:this._newValue});

    this._newValue = String(valuePrice).trim().replace(/[\s+-.,]/g, "")
    this.formSale.patchValue({price:this._newValue});

  }

  /**
   * Funciones de formato de texto
   */
  stringFormatFactory(){

    this.removeFirstZero();
    this.removeChar();
  }

  /**
   * Carga los datos del día actual
   */
  loadSale(){

    this.saleService.getBussines().subscribe(data =>{
      
      let saleData = data[data.length - 1];
      this.numSales = data.length + 1;

      if(!saleData.items_sold){

        this.saleService.saleSelected = new Sale(this._sale)
        this.saleService.saleSelected.id = saleData.id
        this.saleService.saleSelected.day = saleData.day
      
        
      }else{
        this.saleService.saleSelected = new Sale(saleData)

      }
      
    })
  }

  /**
   * Agrega una venta a la base de datos
   */
  finishSale(){

    let sale = this.saleService.saleSelected

    _.forEach(this.listArticles, item =>{
      this._solditems.sale.push(item)
    })
    this._solditems.total = this.sumTotal()
    
    sale.items_sold.push(this._solditems)

    this.saleService.editBussines(sale)

    this.router.navigate(['/index-content'])
    
  }

  /**
   * Suma total de todos los articulos
   */
  sumTotal(){
    this._totalSale = 0;
    _.forEach(this.listArticles, data =>{
      this._totalSale += Number(data.totalPrice)
    });

    return this._totalSale
  }

  loadOffers(){

    this.offerService.getOffer().subscribe(listOffers =>{
      _.forEach(listOffers, item =>{
        this.offersDropdown.push({label: item.name, 
                                  value:{
                                    article: item.article,
                                    quantity: item.quantity,
                                    price: item.price,
                                    totalPrice: item.totalPrice}
                                  })
      })
    })
  }

  resetForm(){

      this.formSale = this.formBuilder.group({
      article: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      totalPrice: new FormControl({value: '', disabled: true}),
      totalSale: new FormControl({value: this.sumTotal(), disabled: true})
    })

  }

  addArticleOffer(dropdown: Dropdown){

    if(this.offerSelected){
      this.listArticles.push(this.offerSelected);
      this.dataSource.next(this.listArticles);
      console.log(this.offerSelected)
      this.resetForm()
      dropdown.resetFilter();
    }
     
  }

}