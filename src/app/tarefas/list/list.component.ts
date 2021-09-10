import { AngularFireDatabase } from '@angular/fire/database';
import { EditComponent } from './../edit/edit.component';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';

import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  
  

})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'option'];
  dataSource : any;
  dbTabela = "tarefas";
  
  constructor(public dialog: MatDialog,
      private db: AngularFireDatabase) {
       
      this.dataSource = this.db.list(this.dbTabela)
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
              return Object.assign({key : item.payload.key} ,item.payload.val())
              console.log(items)
          })
        })
      )
  }

  ngOnInit(): void {
  }

  insert( ){
    //console.log('fernando');
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {type :'create', status : 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.db.list(this.dbTabela).push(result)
      }
     
    });
  }

  edit(data:any){
     //console.log('fernando');
     const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {...data, type: 'update'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.db.list(this.dbTabela).update(data.key, result)
      }
     
    });
  }

  modalDel(key:any){
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '250px',
      data: {type :'create', status : 0}
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete '+result)
      if(result == 'confirma'){
        this.delete(key)
      }
    });

    
   
    
  }

  delete(key:any ) {
    console.log('segundo '+key)
    this.db.list(this.dbTabela).remove(key)

  }

  statusTarefa(key:any){
    console.log('fernando Status')
    this.db.list(this.dbTabela).update(key, {status: 1})
  }

}


