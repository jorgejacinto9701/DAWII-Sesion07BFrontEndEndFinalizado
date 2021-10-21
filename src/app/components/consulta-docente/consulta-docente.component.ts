import { Component, OnInit } from '@angular/core';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-docente',
  templateUrl: './consulta-docente.component.html',
  styleUrls: ['./consulta-docente.component.css']
})
export class ConsultaDocenteComponent implements OnInit {

  //Ng model
  selDepartamento:string = ""; 
  selProvincia:string = ""; 
  selDistrito:number = 0;

  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  constructor(private ubigeoService: UbigeoService) { 

    ubigeoService.listarDepartamento().subscribe(
        response => this.departamentos = response
    );

  }

  cargaProvincia(){
    this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
          response => this.provincias = response      
    );
  }
  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
          response => this.distritos = response      
    );
  }


  ngOnInit(): void {}

}
