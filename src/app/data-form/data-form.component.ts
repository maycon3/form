import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupName, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from '../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { empty, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados$:Observable<EstadoBr[]>;
  cargos:any[];
  tecnologias:any[];
  newLetterOp:any;
  frameworks = ['Angular','React','Vue','Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService:DropdownService,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    this.estados$ = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newLetterOp = this.dropdownService.getNewLetter();
    this.createForm();
    
    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        tap(value=> console.log('valor do CEP:',value))
      )
      .subscribe();
    // .pipe(
    //   distinctUntilChanged(),
    //   tap(value=> console.log('status do cep: ' + value)),
    //   switchMap(status => status === 'VALID' ? 
    //     this.consultaCepService.buscaCep(this.formulario.get('endereco.cep').value): empty())
    // ).subscribe(dados => dados ? this.populaDadosForm(dados): {});
  }

  public createForm(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      confirmacaoEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }),
  
      cargo:[null],
      tecnologia:[null],
      newsletter:['s'],
      termos:[null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });
  }

  public buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);
  }

  public submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks.map((v,i)=> v? this.frameworks[i]: null).filter(v => v !== null)
    });
  
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', valueSubmit)
        .subscribe(res => console.log(res));
    } else {
      this.verificaValidacaoForm(this.formulario);
    }
  }

  public verificaValidacaoForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controler = formGroup.get(campo);
      controler.markAsTouched();
      if(controler instanceof FormGroup){
        this.verificaValidacaoForm(controler);
      }
    });
  }

  public reset(): void {
    this.formulario.reset();
  }

  public verificaValidTouched(campo: string) {
    return this.formulario.get(campo).invalid && this.formulario.touched ;
  }

  public aplicaCss(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  public buscaCep() {
    const cep = this.formulario.get('endereco.cep').value;
    if(cep != null && cep !== ''){
        this.consultaCepService.buscaCep(cep)
          .subscribe(dados=>{
            this.reset();
            this.populaDadosForm(dados);
          })
    }
  }

  public populaDadosForm(dado): void {
    this.formulario.patchValue({
      endereco: {
        cep: dado.cep,
        rua: dado.logradouro,
        bairro: dado.bairro,
        cidade: dado.localidade,
        estado: dado.uf
      }
    });
  }

  public setarCargos(){
    const cargo = {nome:'Dev', nivel:'Pleno', desc:'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  public compararCargo(obj1,obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  public setarTecnologia(){
    const tecnologia = ['java','javascript'];
    this.formulario.get('tecnologia').setValue(tecnologia);
  }
}
