import { Component, OnInit } from '@angular/core';


import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any = {
    nome:null, email:'maycon.trb@gmail.com'
  }
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  public submit(form){
    this.http.post(`https://httpbin.org/post`, JSON.stringify(form))
      .subscribe(res=> console.log(res));
  }

  public verificaValidTouched(campo){
    return  campo.invalid && campo.touched;
  }

  public aplicaCss(campo){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }  

  // Curso Angular #85: Forms (template driven) Pesquisando endereço automaticamente com CEP
  public buscaCep(cep:string,form){
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      let validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {
        this.reset(form);
          this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
      
          .subscribe(data=>{
              console.log(data);
              this.populaDadosForm(data,form);
          });
      }
    }
    console.log(cep);
  }

  public populaDadosForm(dado,formulario):void{
    formulario.form.patchValue({
      endereco:{
        rua: dado.logradouro,
        bairro: dado.bairro,
        cidade:dado.localidade,
        estado: dado.uf
      }
    });
  }

  public reset(formulario){
    formulario.form.patchValue({
      endereco:{
        rua: null,
        bairro:null,
        cidade:null,
        estado:null
      }
    });
  }
}
