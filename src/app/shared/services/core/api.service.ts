import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../config.service';
import { AppUtilsService } from 'src/app/shared/services/core/app-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpHeaders: HttpHeaders = new HttpHeaders();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private get httpOptions() {
    return {
      headers: this.httpHeaders
    };
  }


  constructor(
    private readonly http: HttpClient,
    private readonly utilsService: AppUtilsService
  ) {
    this.httpHeaders = this.utilsService.getHeaders();
  }

  public get<T>(resourceUrl: string, queryString?: string): Observable<T> {
    this.httpHeaders = this.utilsService.getHeaders()
    if(queryString) {
      return this.http.get<T>(`${resourceUrl}${queryString}`, this.httpOptions);
    }
    return this.http.get<T>(`${resourceUrl}`, this.httpOptions);
  }

  public downloadFile(resourceUrl: string): Observable<any> {
    return this.http.get(`${resourceUrl}`, {responseType:'blob' });
  }

  public getExtendedResponse<T>(resourceUrl: string, queryString?: string): Observable<T> {
    this.httpHeaders = this.utilsService.getHeaders()
    return this.http.get<T>(`${resourceUrl}${queryString}`, this.httpOptions);
  }

  // ******* Applying Session Storage *************
  public getAndCache<T>(resourceUrl: string, force: boolean = false): Observable<T> {
    const key = btoa(resourceUrl);
    let envelope = JSON.parse(sessionStorage.getItem(key)!);

    if (!force && envelope && envelope.timestamp > new Date()) {
      return new Observable<T>(_ => {
        _.next(envelope.body);
      });
    }

    return this.http.get<T>(resourceUrl, this.httpOptions)
      .pipe(tap(res => {
        envelope = {
          timestamp: new Date().setTime(new Date().getTime() + 1000 * 60 * 5),
          body: res
        };
        sessionStorage.setItem(key, JSON.stringify(envelope));
      }));
  }

  public post<T>(resourceUrl: string, payload: any): Observable<T> {
    return this.http.post<T>(resourceUrl, payload, this.httpOptions);
  }

  public patch<T>(resourceUrl: string, payload: any): Observable<T> {
    return this.http.patch<T>(resourceUrl, payload, this.httpOptions);
  }

  public put<T>(resourceUrl: string, payload: any): Observable<T> {
    return this.http.put<T>(this.getResourceUrl(resourceUrl), payload, this.httpOptions);
  }

  public delete<T>(resourceUrl: string): Observable<T> {
    return this.http.delete<T>(this.getResourceUrl(resourceUrl), this.httpOptions);
  }

  private getResourceUrl(resourcePath: string): string {
    return ConfigService.resourceApiUrl + (resourcePath.startsWith('/') ? '' : '/') + resourcePath;
  }
}
