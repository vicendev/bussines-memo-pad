import { ISale } from './../../interfaces/isale';
import { SaleService } from './../../services/sale.service';
import { Sale } from './../../models/sale';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {

  public sales: ISale[];
  public loadPage: boolean;

  constructor(
    private saleService: SaleService
  ) { this.loadPage = true }

  ngOnInit() {
    this.loadPage = false;
    this.saleService.getBussines()
    .pipe(
      map( sales => sales.sort((a,b) => new Date(b.day).getTime() - new Date(a.day).getTime()))
    )
    .subscribe(listSales =>{
      this.sales = listSales
      this.loadPage = true;
    });

  }

  ViewDetails(sale: any){

    this.saleService.saleSelected = sale;
  }

}
