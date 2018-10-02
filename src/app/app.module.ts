import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent }   from './Components/Produtos/Produtos.component';
import { EditProductComponent }   from './Components/EditProductComponent/EditProductComponent.component';
import { NewProductComponent }   from './Components/NewProductComponent/NewProductComponent.component';
import { HttpClientModule }    from '@angular/common/http';

import {ReactiveFormsModule} from "@angular/forms";
import { CurrencyMaskModule } from "ngx-currency-mask";

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    NewProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
