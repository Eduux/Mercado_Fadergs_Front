import { Component, OnInit } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutoService } from '../../Services/Produto.service';
import {Router} from "@angular/router";

@Component({
  selector: 'produtos-component',
  templateUrl: './Produtos.component.html',
  styleUrls: [ './Produtos.component.css' ]
})
export class ProdutosComponent implements OnInit {
  Produtos: Produto[];

  constructor(private ProdutoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.ProdutoService.getProdutos(null)
    .subscribe(produtos => this.Produtos = produtos);
  }

  deleteProduto(produto: Produto){
    this.ProdutoService.deleteProduto(produto).then(function(){
      this.Produtos = this.Produtos.filter(p => p !== produto);
    }.bind(this))
  }

  searchProdutos(type, search){
    var query = type+":"+search
    this.ProdutoService.getProdutos(query)
    .subscribe(produtos => this.Produtos = produtos);
  }

  editProduct(id){
    this.router.navigate(['/produto', id]);
  }
}
