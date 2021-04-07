import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br';
import { Observable } from 'rxjs';

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) { }

  public getEstadosBr():Observable<EstadoBr[]>{
    return this.http.get<EstadoBr[]>('../../../assets/dados/estadosbr.json');
  }

  public getCargos(){
    return [
      {nome:'Dev', nivel:'Junior', desc:'Dev Jr'},
      {nome:'Dev', nivel:'Pleno', desc:'Dev Pl'},
      {nome:'Dev', nivel:'Senior', desc:'Dev Sr'}
    ];
  }

  public getTecnologias():any[]{
    return [
      {nome:'java', desc:'Java'},
      {nome:'javascript',desc:'JavaScript'},
      {nome:'php', desc:'PHP'},
      {nome:'ruby', desc:'Ruby'}
    ];
  }

  public getNewLetter(){
    return [
      {valor:'s', desc:'Sim'},
      {valor:'n', desc:'Nao'}
    ];
  }
}
