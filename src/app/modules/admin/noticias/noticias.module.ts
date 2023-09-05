import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NoticiasService } from './services/noticias.service';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasComponent } from './noticias.component';
import { NoticiasListComponent } from './noticias-list/noticias-list.component';
import { NoticiasCreateComponent } from './noticias-create/noticias-create.component';
import { noticiasRoutes } from './noticias.routing';



@NgModule({
    declarations: [
        NoticiasComponent,
        NoticiasListComponent,
        NoticiasCreateComponent,
    ],
    imports     : [
        RouterModule.forChild(noticiasRoutes),
        SharedModule,
        HttpClientModule
    ],
    providers: [
        NoticiasService
    ]
})
export class NoticiasModule
{
}
