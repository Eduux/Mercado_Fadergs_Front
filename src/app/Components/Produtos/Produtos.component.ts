import { Component, OnInit } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutoService } from '../../Services/Produto.service';
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'produtos-component',
  templateUrl: './Produtos.component.html',
  styleUrls: [ './Produtos.component.css' ]
})
export class ProdutosComponent implements OnInit {
  Produtos: Produto[];
  activeModal: boolean;
  Produto: any;

  constructor(private ProdutoService: ProdutoService, private router: Router) {
    this.activeModal = false;
    this.Produto = {
       id: 0,
       nome: "",
       tipo: "",
       valor: 0,
       estoque_entrada: 0,
       vendas: 0,
       estoque_loja: 0
    }
   }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.ProdutoService.getProdutos(null)
    .subscribe(produtos => {
      this.Produtos = produtos;
    });
  }

  getProduto(id){
    this.activeModal = true;
    var query = "id:"+id;
    this.ProdutoService.getProdutos(query)
    .subscribe(produtos => {
      this.Produto = {
         id: produtos[0].id,
         nome: produtos[0].nome,
         tipo: produtos[0].tipo,
         valor: produtos[0].valor,
         estoque_entrada: produtos[0].estoque_entrada,
         vendas: produtos[0].vendas,
         estoque_loja: produtos[0].estoque_loja
      }
    });
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

  orderby(id){
    if(id == 1){
      this.Produtos = this.Produtos.sort(function(a, b){
        return b.vendas-a.vendas
      })
    }

    if(id == 2){
      this.Produtos = this.Produtos.sort(function(a, b){
        return a.vendas-b.vendas
      })
    }

    if(id == 3){
      this.Produtos = this.Produtos.sort(function(a, b){
        return b.estoque_loja-a.estoque_loja
      })
    }

    if(id == 4){
      this.Produtos = this.Produtos.sort(function(a, b){
        return a.estoque_loja-b.estoque_loja
      })
    }
  }

  vender(){
    this.Produto.vendas = this.Produto.vendas + 1; 
    this.Produto.estoque_loja = this.Produto.estoque_loja - 1;

    this.ProdutoService.editarProdutoNoAuth(this.Produto.id, this.Produto).then(function(){
      swal("Sucesso!", "Produto vendido com sucesso!", "success").then(function(){
        this.activeModal = false;
        this.getProdutos();
      }.bind(this)); 
    }.bind(this));
  }

  cancelarVenda(){
    if(this.Produto.vendas > 0){
      this.Produto.vendas = this.Produto.vendas - 1; 
      this.Produto.estoque_loja = this.Produto.estoque_loja + 1;
  
      this.ProdutoService.editarProduto(this.Produto.id, this.Produto).then(function(){
        swal("Sucesso!", "Venda cancelada com sucesso!", "success").then(function(){
          this.activeModal = false;
          this.getProdutos();
        }.bind(this));
      }.bind(this));
      this.activeModal = false;
    } else {
      swal("Erro!", "Você não tem nenhuma venda!", "error").then(function(){
        this.activeModal = false;
        this.getProdutos();
        return false
      }.bind(this)); 
    }

  }

  editProduct(id){
    this.router.navigate(['/produto', id]);
  }
}
