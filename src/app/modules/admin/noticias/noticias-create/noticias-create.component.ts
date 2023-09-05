import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { MatDialogRef } from '@angular/material/dialog'
import { FormBaseComponent } from 'app/shared/utils/form-base-component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { MaskPhone } from 'app/shared/utils/mask-phone';
import { Noticia } from '../models/noticias';

@Component({
    selector     : 'noticias-create',
    templateUrl  : './noticias-create.component.html',
})
export class NoticiasCreateComponent extends FormBaseComponent
{
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    errors: any[] = [];
    noticiaForm : FormGroup
    noticia : Noticia
    idChamado : string;
    phoneMask : string = '(00) 00000-00009';

    constructor(public matDialogRef: MatDialogRef<NoticiasCreateComponent>, private fb: FormBuilder,
        private _noticiasService : NoticiasService,
        private toastr : ToastrService) {
        super();
        this.validationMessages = {
            titulo: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            autor: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            Descricao: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
            },
            
        }
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    ngOnInit(): void {
        this.noticiaForm = this.fb.group({
            titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
            descricao: ['', [Validators.required, Validators.minLength(2)]],
            autor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]]
        })
    }

    ngAfterViewInit(): void {
        super.configurarValidacaoFormularioBase(this.formInputElements, this.noticiaForm);
    }

    submitForm(){
        this.noticia = Object.assign({}, this.noticia, this.noticiaForm.value);
        
        this._noticiasService.postNoticia(this.noticia).subscribe(
            response => {
                this.noticia.id = response.id
                this.processarSucesso()
            },
            error => this.processarFalha(error)
        )
    }

    processarSucesso(){
        this.noticiaForm.reset();
        this.errors = [];

        let toast = this.toastr.success('Cadastro feito com sucesso!', 'Sucesso!');
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.matDialogRef.close(this.noticia)
            });
        }
    }

    processarFalha(fail: any) {
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    onHidden(){
        this.matDialogRef.close()
    }


}
