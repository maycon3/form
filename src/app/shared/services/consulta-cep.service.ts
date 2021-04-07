import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http:HttpClient) { }

  public buscaCep(cep:string) {
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      let validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }
    return of({});
  }
}
