import { Optional } from '@angular/core';
import { Injector } from '@angular/core';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  public modalData = {nome: null, descricao : null, type: 'update'}
  title = 'Criar'

    constructor(
      public dialogRef: MatDialogRef<EditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any ){
        Object.assign(this.modalData, data)
        this.title = (this.modalData.type == 'create') ? 'Criar ': 'Atualizar'
      }


  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
