import { IArticle } from './../../interfaces/iarticle';
import { ISale } from './../../interfaces/isale';
import { UtilsService } from './../../services/utils.service';
import { SaleService } from './../../services/sale.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-index-content',
  templateUrl: './index-content.component.html',
  styleUrls: ['./index-content.component.css']
})
export class IndexContentComponent implements OnInit {

  public objectSale: any;
  public sale: ISale;
  public article: IArticle;

  public activeApp: boolean;
  public openDay: number;
  public totalMoneyDay: number;

  private _today: Date;

  constructor(
    private saleService: SaleService,
    private utilsService: UtilsService
  ) {

    this.totalMoneyDay = 0;
    this._today = new Date()

    this.sale = {
      id: '',
      day: null,
      items_sold: [],
    }
    
   }

  ngOnInit() {
    
    this.setLocal_daysComparison();

  }

  /**
   * Crear Objeto para comenzar día
   */
  createDay(){

    let sal = new Sale(this.sale);
    sal.day = this._today.toString();
    
    this.saleService.createDay(sal);
    
  }

  // Obtiene valor valor de la comparasión de fechas
  setLocal_daysComparison(){

    let lastDay = new Date()
    let today = new Date()

    this.saleService.getBussines().subscribe(listSale =>{
      
    if(listSale != null && listSale.length > 0){
      lastDay = this.utilsService.obtainLastDay(listSale)
      
      if(this.utilsService.formatDay(today,lastDay)){
        // No hay un día iniciado
        localStorage.setItem("openDay","0");
        this.openDay = Number(localStorage.getItem("openDay"))
      }else{
        // Hay un día iniciado
        localStorage.setItem("openDay","1");
        this.openDay = Number(localStorage.getItem("openDay"))
        this.getTotalMoneyDay(listSale);
      }
    }else{
      //No existen datos del negocio (usuario nuevo)
      localStorage.setItem("openDay","-1")
      this.openDay = Number(localStorage.getItem("openDay"))
    }
    
    console.log(localStorage.getItem("openDay"))
     
    })

  }

  getTotalMoneyDay(sale: ISale[]){
    let data = sale[sale.length - 1];
    let sumTotal = 0;
    console.log(data);

    _.forEach(data.items_sold, money =>{
      sumTotal += Number(money.total)
    })

    this.totalMoneyDay = sumTotal;
  }

}
