import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../Produto';
import auth from '../Auth/Auth'; 
import swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  private produtosUrl = 'http://142.93.241.14:8080/mercado/api/mercado/produto/v1/produtos'; 
  private productUrl = 'http://142.93.241.14:8080/mercado/api/mercado/produto/v1/produto/';

  constructor(private http: HttpClient) { }

  getProdutos (search) {
    return this.http.get<Produto[]>(this.produtosUrl+"?search="+search);
  }

  addProduct (produto: Produto) {
    return new Promise(
    function(resolve){  
      auth().then(function(){
        resolve();
        return this.http.post(this.productUrl, produto, httpOptions).subscribe();
      }.bind(this));
    }.bind(this)
    );
  }

  deleteProduto(produto){
    return new Promise(
    function (resolve) {
      auth().then(function() {
        swal("Sucesso!", "Produto deletado com sucesso!", "success");
        resolve();
        return this.http.delete(this.productUrl+produto.id).subscribe();
      }.bind(this))
    }.bind(this)
    );
  }

  editarProduto(id, produto){
    return new Promise(
    function (resolve, reject) {
      auth().then(function() {
        swal("Sucesso!", "Produto editado com sucesso!", "success");
        resolve();
        return this.http.put(this.productUrl+id, produto).subscribe();
      }.bind(this))
    }.bind(this)
    );
  }

  editarProdutoNoAuth(id, produto){
    return new Promise(
    function (resolve) {
        resolve();
        return this.http.put(this.productUrl+id, produto).subscribe();
    }.bind(this)
    );
  }

}

