import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProductComponent }   from './Components/EditProductComponent/EditProductComponent.component';
import { ProdutosComponent }   from './Components/Produtos/Produtos.component';
import { NewProductComponent }   from './Components/NewProductComponent/NewProductComponent.component';


const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'novo-produto', component: NewProductComponent },
  { path: 'produto/:id', component: EditProductComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
