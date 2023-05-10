import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearUsuarioModalComponent } from '../modales/crear-usuario-modal/crear-usuario-modal.component';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  filtroBusquedaUsuarios = {
    usuario: "",
    contrasenia: ""
  }

  listadoUsuarios: Usuario[] = [];

  constructor(
    public dialog: MatDialog, 
    private usuarioService: UsuariosService,
    private router: Router) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(CrearUsuarioModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarUsuarios();
    });
  }

  buscarUsuarios(){
    if(this.filtroBusquedaUsuarios.usuario == "" && this.filtroBusquedaUsuarios.contrasenia == ""){
      this.usuarioService.listar().subscribe(
        usuarios => {
          this.listadoUsuarios = usuarios
          this.dataSource = this.listadoUsuarios;
        }
      )
    }
  }

  borrarUsuario(id: string){
    this.usuarioService.delete(id).subscribe(
       response => this.buscarUsuarios()
    );
  }

  /* editarUsuario(id: number){
    usuarioSeleccionado: Usuario = {
      usuario: "",
      contrasenia: ""
    }; 
    usuarioSeleccionado = this.dataSource.find(usuario => usuario.id == id);
    this.openDialog('500ms', '0ms');
  } */

  //  Tabla estática usuarios
  displayedColumns: string[] = ['id', 'usuario', 'contrasenia', 'fechaCreacion', 'acciones'];
  dataSource = this.listadoUsuarios;

  //  Tabla dinámica usuarios  
  /* columns = [
    {
      columnDef: 'id',
      header: 'id.',
      cell: (element: Usuario) => `${element.id}`
    },
    {
      columnDef: 'usuario',
      header: 'Usuario',
      cell: (element: Usuario) => `${element.usuario}`
    },
    {
      columnDef: 'contrasenia',
      header: 'Contraseña',
      cell: (element: Usuario) => `${element.contrasenia}`
    },
    {
      columnDef: 'fechaCreacion',
      header: 'Fecha de alta',
      cell: (element: Usuario) => `${element.fechaCreacion.toLocaleDateString()}`
    }
  ];

  dataSource = USER_DATA;
  displayedColumns = this.columns.map(c => c.columnDef); */

  
}
