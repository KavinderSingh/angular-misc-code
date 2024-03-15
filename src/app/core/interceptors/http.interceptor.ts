import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, finalize, tap } from "rxjs";
import { LoaderService } from "src/app/shared/services/core/loader.service";

@Injectable()
export class HttpExchangeInterceptor implements HttpInterceptor {
  requestCount: number = 0;
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCount += 1;
    this.loaderService.show();
    return next.handle(req).pipe(tap((res) => {
          return res;
        })
      ).pipe(finalize(() => {
          this.requestCount -= 1;
          this.loaderService.requestCount = this.requestCount;
          this.loaderService.hide();
        })
      );
  }
}
