import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../models/usuario';
import { NoticiasService } from '../services/noticias.service';
import { MatDialog } from '@angular/material/dialog';
import { NoticiasCreateComponent } from '../noticias-create/noticias-create.component';
import { Noticia } from '../models/noticias';


@Component({
    selector     : 'noticias-list',
    templateUrl  : './noticias-list.component.html',
})
export class NoticiasListComponent implements OnInit
{
    noticias : Noticia[] = []
    constructor(
        private _noticiaService : NoticiasService, 
        private _matDialog : MatDialog,
        private _changeDetectorRef : ChangeDetectorRef,)
    {
    }

    ngOnInit(): void{
        this._noticiaService.getNoticiaList().subscribe(
            result => {this.noticias = result;}
        )
    }

    add(): void {
        const dialogRef = this._matDialog.open(NoticiasCreateComponent, {
          autoFocus: true,
        })
        dialogRef.afterClosed().subscribe(
          response => {
            if(response){
              this.noticias.unshift(response);
              this._changeDetectorRef.markForCheck();
            }
          }
        )
      }

}
