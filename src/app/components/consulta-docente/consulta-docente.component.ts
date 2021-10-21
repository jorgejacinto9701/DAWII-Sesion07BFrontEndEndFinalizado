import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-docente',
  templateUrl: './consulta-docente.component.html',
  styleUrls: ['./consulta-docente.component.css']
})
export class ConsultaDocenteComponent implements OnInit {

  //Ng model
  nombre:string="";
  dni:string="";
  selDepartamento:string = ""; 
  selProvincia:string = ""; 
  selDistrito:number = 0;

  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  //Grila
  docentes: Docente[] = [];

  constructor(private ubigeoService: UbigeoService, 
              private docenteService:DocenteService) { 

    ubigeoService.listarDepartamento().subscribe(
        response => this.departamentos = response
    );

  }

  consultaDocente(){
        this.docenteService.consultaDocente(this.nombre, this.dni, this.selDistrito).subscribe(
            response => this.docentes = response.lista
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
