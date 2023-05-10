import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-crear-usuario-modal',
  templateUrl: './crear-usuario-modal.component.html',
  styleUrls: ['./crear-usuario-modal.component.css']
})
export class CrearUsuarioModalComponent implements OnInit {

  usuarioCreado: Usuario = {
    usuario: "",
    contrasenia: ""
  };

  private usuarioModificar?: Usuario;

  textoBotonCrearModificar: string = "Crear usuario";

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioModalComponent>, 
    private usuarioService: UsuariosService
    ) { }

  ngOnInit(): void {
    if(this.usuarioModificar){
      this.usuarioCreado = this.usuarioModificar;
      this.textoBotonCrearModificar = "Modificar usuario";
    }
  }

  crearUsuario(){
    this.usuarioService.create(this.usuarioCreado).subscribe(
      response => this.dialogRef.close()
    );
  }

}
