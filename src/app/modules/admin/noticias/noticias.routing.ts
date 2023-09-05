import { Route } from "@angular/router";
import { NoticiasComponent } from "./noticias.component";
import { NoticiasListComponent } from "./noticias-list/noticias-list.component";



export const noticiasRoutes: Route[] = [
    {
        path     : '',
        component: NoticiasComponent,
        children: [
            {
                path: '',
                component: NoticiasListComponent,
            },
        ]
    }
];