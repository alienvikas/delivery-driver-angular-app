import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
    //Intercepts HttpRequest and handles them.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const baseUrl = "https://localhost:44383/api/";
        const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
}