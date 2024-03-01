import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class HttpCoreInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const modifiedRequest = req.clone({
      setHeaders: {
        ContactType:'application/json',
        AccessControlAllowOrigin: '*'
        // Content-Type: 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      // headers: req.headers.append('Access-Control-Allow-Origin', '*'),
    });
    console.log(req)
    console.log(next)

    return next.handle(modifiedRequest);
  }
}
