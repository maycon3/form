import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control',
  templateUrl: './campo-control.component.html',
  styleUrls: ['./campo-control.component.css']
})
export class CampoControlComponent implements OnInit {
 
  @Input() mostraErro:boolean;
  @Input() mostraMsg:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
