import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { User } from '../user/user.types';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private _UrlApi : string = environment.UrlApiBack;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }


    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    set user(user: User)
    {
        localStorage.setItem('user', JSON.stringify(user));
    }

    get user(): User
    {
        var usuario = localStorage.getItem('user') ?? null;
        const usuarioResponse = JSON.parse(usuario) as User;
        return usuarioResponse;
    }

    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this._UrlApi + '/Usuario/Login', { email: credentials.email, senha: credentials.password }, this.ObterHeaderJson()).pipe(
            switchMap((response: any) => {
                const usuario = response.user as any;
                this.accessToken = response.accessToken;
                this._authenticated = true;

                const user: User = { 
                    id: usuario.id, 
                    name: usuario.nome, email: usuario.email};
                
                this._userService.user = user;
                this.user = user;
                return of(response);
            })
        );
    }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
      }

    signInUsingToken(): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>
                of(false)
            ),
            switchMap((response: any) => {
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }
                this._authenticated = true;
                this._userService.user = response.user;
                return of(true);
            })
        );
    }

    signOut(): Observable<any>
    {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }

    check(): Observable<boolean>
    {
        if ( this._authenticated )
        {
            return of(true);
        }
        if ( !this.accessToken )
        {
            return of(false);
        }

        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        return this.signInUsingToken();
    }
}
