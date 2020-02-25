import { EditOfferComponent } from './components/offers/edit-offer/edit-offer.component';
import { ListOffersComponent } from './components/offers/list-offers/list-offers.component';
import { AddOfferComponent } from './components/offers/add-offer/add-offer.component';
import { DetailsSaleComponent } from './components/details-sale/details-sale.component';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { AddSaleComponent } from './components/add-sale/add-sale.component';
import { IndexContentComponent } from './components/index-content/index-content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'index-content', component: IndexContentComponent},
  {path: 'add-sale', component: AddSaleComponent},
  {path: 'list-sales', component: ListSalesComponent},
  {path: 'details-sale', component: DetailsSaleComponent},
  {path: 'add-offer', component: AddOfferComponent},
  {path: 'list-offers', component: ListOffersComponent},
  {path: 'edit-offer', component: EditOfferComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'index-content'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
