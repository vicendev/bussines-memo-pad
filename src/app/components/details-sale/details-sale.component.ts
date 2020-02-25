import { Article } from './../../models/article';
import { Solditems } from './../../models/solditems';
import { SaleService } from './../../services/sale.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-sale',
  templateUrl: './details-sale.component.html',
  styleUrls: ['./details-sale.component.css']
})
export class DetailsSaleComponent implements OnInit {

  @ViewChild("modal_articles", {static: false}) modal_articles;

  displayedColumns: string[] = ['article','quantity','price','totalPrice'];

  public sale: Sale;
  public listItemsSold: Solditems[];
  public listArticle: Article[];

  public itemsPreview: any;
  public loadPage: boolean;

  constructor(
    private saleService: SaleService,
    private modalService: NgbModal
  ) {
    this.sale = null;
    this.listItemsSold = [];
    this.listArticle = [];

    this.itemsPreview = [];
    this.loadPage = true;
   }

  ngOnInit() {
    this.loadPage = false;
    this.sale = this.saleService.saleSelected;
    
    // TODO
    if(this.sale.items_sold){
      this.listItemsSold = this.sale.items_sold;

      for (let index = 0; index < this.listItemsSold.length; index++) {
        const element = this.listItemsSold[index];

        _.forEach(element.sale, articles =>{
          this.listArticle.push(articles);
        })
        
      }
    }
     this.loadPage = true;

  }

  viewArticles(sale){ 
    this.itemsPreview = sale;
    this.modalService.open(this.modal_articles);
  }


}
