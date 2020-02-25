// Angular
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

// Module
import { AppRoutingModule } from './app-routing.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DropdownModule} from 'primeng/dropdown';

// Services
import { SaleService } from './services/sale.service';

// Others
import { environment } from './../environments/environment.prod';

// Components
import { AppComponent } from './app.component';
import { IndexContentComponent } from './components/index-content/index-content.component';
import { HeaderComponent } from './components/header/header.component';
import { AddSaleComponent } from './components/add-sale/add-sale.component';
import { DetailsSaleComponent } from './components/details-sale/details-sale.component';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { AddOfferComponent } from './components/offers/add-offer/add-offer.component';
import { ListOffersComponent } from './components/offers/list-offers/list-offers.component';
import { EditOfferComponent } from './components/offers/edit-offer/edit-offer.component';


export function saleFactory(provider: SaleService){
  return () => provider.getBussines();
}


@NgModule({
  declarations: [
    AppComponent,
    IndexContentComponent,
    HeaderComponent,
    AddSaleComponent,
    ListSalesComponent,
    DetailsSaleComponent,
    AddOfferComponent,
    ListOffersComponent,
    EditOfferComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    DropdownModule
  ],
  providers: [
    SaleService,{
      provide: APP_INITIALIZER,
      useFactory: saleFactory,
      deps: [SaleService],
      multi: true
    },
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
