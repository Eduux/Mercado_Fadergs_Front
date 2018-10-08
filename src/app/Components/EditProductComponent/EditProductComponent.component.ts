import { Component, OnInit } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutoService } from '../../Services/Produto.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'edit-produtos-component',
  templateUrl: './EditProductComponent.component.html',
  styleUrls: [ './EditProductComponent.component.css' ]
})
export class EditProductComponent implements OnInit {
  Produto: Produto[];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private ProdutoService: ProdutoService, private router: Router) { }

  addProductForm: FormGroup;

  ngOnInit() {
    this.getProduct();
    this.addProductForm = this.formBuilder.group({
        id: [],
        nome: ['', Validators.required],
        tipo: ['', Validators.required],
        valor: ['', Validators.required],
        estoque_entrada: ['', Validators.required],
        vendas: [''],
        estoque_loja: ['', Validators.required]
    });

  }

  getProduct(){
    const id = +this.route.snapshot.paramMap.get('id');
    const search = "id:"+id;
    
    this.ProdutoService.getProdutos(search)
      .subscribe(produtos => {
          this.Produto = produtos
          this.addProductForm.setValue(produtos[0])
      });
  }

  editarProduto(id) {
    if (this.addProductForm.invalid) {
        swal("Erro!", "Preencha todos os campos obrigatórios!", "error");
        return false;
    }
    console.log(this.addProductForm.value)
    this.ProdutoService.editarProduto(id, this.addProductForm.value).then(function(){
      swal("Sucesso!", "Produto editado com sucesso!", "success").then(function(){
        this.router.navigate(['/']);
      }.bind(this)); 
    }.bind(this));
  }
}
