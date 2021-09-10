import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalConfirmComponent>) { }

  ngOnInit(): void {

  }

 

  onNoClick(): void {
    this.dialogRef.close();
  }

}
