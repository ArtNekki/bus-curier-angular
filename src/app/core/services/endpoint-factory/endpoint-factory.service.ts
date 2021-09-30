import {Injectable, Injector} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

// @Injectable()
export class EndpointFactory {

  private environment = environment;
  static readonly apiVersion: string = '1';
  static readonly appVersion: string = '1.0.0';
  public readonly baseUrl: string = environment.api_url + `/v${EndpointFactory.apiVersion}`;

  private static _authBaseUrl: string = '';

  public get authBaseUrl(): string {
    return EndpointFactory._authBaseUrl + `/identity/api/v${EndpointFactory.apiVersion}`;
  }

  private get authUrl() {
    return this.authBaseUrl + '/auth/login';
  }

  private get refreshAuthUrl() {
    return this.authBaseUrl + '/auth/refresh';
  }

  public static initAuthVariables(url: string) {
    EndpointFactory._authBaseUrl = url;
  }


  private taskPauser: Subject<any>;
  private isRefreshingLogin: boolean;

  private _authService: AuthService;

  protected get authService() {
    if (!this._authService)
      this._authService = this.injector.get(AuthService);

    return this._authService;
  }

  constructor(protected http: HttpClient, private injector: Injector) {

  }

  getLoginEndpoint<T>(user: any): Observable<T> {

    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { email: user.email, password: user.password, resource: 'https://deprerp.f-case.ru/' };
    return this.http.post<T>(this.authUrl, JSON.stringify(params), { headers: header });
  }

  getRefreshLoginEndpoint<T>(): Observable<T> {

    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {};
    // const params = { refreshToken: this.authService.refreshToken };
    return this.http.post<T>(this.refreshAuthUrl, JSON.stringify(params), { headers: header });
  }

  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      // 'Authorization': this.authService.accessToken,
      // 'Content-Type': 'application/json',
      Accept: `application/json`,
      // Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
      // 'App-Version': EndpointFactory.appVersion
    });

    return { headers };
  }


  protected getRequestHeadersHtml(): { headers: HttpHeaders | { [header: string]: string | string[]; }, responseType: 'text' } {
    const headers = new HttpHeaders({
      // 'Authorization': this.authService.accessToken,
      'Content-Type': 'application/json',
      Accept: 'text/html, */*',
      'App-Version': EndpointFactory.appVersion
    });

    return { headers, responseType: 'text' };
  }
  protected getUploadRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      // 'Authorization': this.authService.accessToken,
      Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
      'App-Version': EndpointFactory.appVersion
    });
    return { headers };
  }

  protected getRequestArrayHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[]; },
    observe: 'response',
    responseType: 'arraybuffer';
  } {
    const headers = new HttpHeaders({
      // 'Authorization': this.authService.accessToken,
      'Content-Type': 'application/octet-stream',
      Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
      'App-Version': EndpointFactory.appVersion
    });

    return { headers, observe: 'response', responseType: 'arraybuffer' };
  }

  protected getRequestHeadersWithResponse(httpParams?: HttpParams): {
    headers: HttpHeaders | { [header: string]: string | string[]; };
    observe: 'response';
    params?: HttpParams;
  } {

    const headers = new HttpHeaders({
      // Authorization: this.authService.accessToken,
      'Content-Type': 'application/json',
      Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
      'App-Version': EndpointFactory.appVersion
    });

    return { headers, observe: 'response', params: httpParams };
  }

  protected execute(obs: Observable<any>, continuation: () => Observable<any>): Observable<any> {
    return obs.pipe(
      catchError((error) => {
        return this.handleError(error, continuation);
      }));
  }

  protected handleError(error, continuation: () => Observable<any>) {
    return throwError(error);
    // if (error.status === 401) {
    //   if (this.isRefreshingLogin) {
    //     return this.pauseTask(continuation);
    //   }
    //
    //   this.isRefreshingLogin = true;
    //
    //   return this.authService.refreshLogin().pipe(
    //     mergeMap(data => {
    //       this.isRefreshingLogin = false;
    //       this.resumeTasks(true);
    //
    //       return continuation();
    //     }),
    //     catchError(refreshLoginError => {
    //         this.isRefreshingLogin = false;
    //         this.resumeTasks(false);
    //
    //         if (refreshLoginError.status === 401 || (refreshLoginError.url && refreshLoginError.url.toLowerCase().includes(this.authUrl.toLowerCase()))) {
    //           this.authService.reLogin();
    //           return Observable.throw('session expired');
    //         }
    //         else {
    //           return Observable.throw(refreshLoginError || 'server error');
    //         }
    //       }
    //     ));
    // }
    //
    // if (error.url && error.url.toLowerCase().includes(this.authUrl.toLowerCase())) {
    //   this.authService.reLogin();
    //
    //   return Observable.throw((error.error && error.error.error_description) ? `session expired (${error.error.error_description})` : 'session expired');
    // }
    // else {
    //   return Observable.throw(error);
    // }
  }
}
