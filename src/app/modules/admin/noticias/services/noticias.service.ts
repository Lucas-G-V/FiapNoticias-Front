import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from "rxjs";
import { map} from "rxjs/operators";

import { AuthService } from "app/core/auth/auth.service";
import { environment } from "environments/environment";
import { Noticia } from "../models/noticias";


@Injectable()
export class NoticiasService {
    UrlApi : string = environment.UrlApiBack;
    constructor(private http: HttpClient, private _authService : AuthService) {}
    
    public getNoticiaList(): Observable<Noticia[]> {
      const path = "/Noticia/GetAll";
      return this.http.get<Noticia[]>(this.UrlApi + path, this.ObterHeaderJson())
        .pipe(
          map(response => {
            if (response === undefined || response === null) {
              return [];
            }
            return response;
          })
        );
    }

    public postNoticia(noticia : Noticia): Observable<any> {
      const path = "/Noticia";
      return this.http.post<any>(this.UrlApi + path, noticia, this.ObterHeaderJson())
        .pipe();
    }


    protected ObterHeaderJson() {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._authService.accessToken
          })

      };
    }

    
}