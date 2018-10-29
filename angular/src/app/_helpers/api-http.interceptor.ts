import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('ApiHttpInterceptor intercepted!!!');

        if(req.url.startsWith('/api/')) {
            const url = environment.apiUrl;
            req = req.clone({
            url: url + req.url,
            });
        }

        return next.handle(req);
    }
}