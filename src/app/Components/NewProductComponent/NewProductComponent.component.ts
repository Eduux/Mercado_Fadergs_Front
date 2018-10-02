import { Component, OnInit } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutoService } from '../../Services/Produto.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'new-produtos-component',
  templateUrl: './NewProductComponent.component.html',
  styleUrls: [ './NewProductComponent.component.css' ]
})
export class NewProductComponent {
  Produto: Produto[];

  constructor(private formBuilder: FormBuilder, private ProdutoService: ProdutoService, private router: Router) { }

  addProductForm: FormGroup;

  ngOnInit() {

    this.addProductForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['', Validators.required],
      estoque: ['', Validators.required]
    });

  }

  cadastrarProduto() {
    if (this.addProductForm.invalid) {
        swal("Erro!", "Preencha todos os campos obrigatórios!", "error");
        return false;
    }
    this.ProdutoService.addProduct(this.addProductForm.value).then(function(){
      swal("Sucesso!", "Produto cadastrado com sucesso!", "success").then(function(){
        this.router.navigate(['/']);
      }.bind(this)); 
    }.bind(this));
  }
}
