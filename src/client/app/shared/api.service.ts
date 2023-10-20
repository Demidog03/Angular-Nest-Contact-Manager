import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import {environment} from "../../environments/environment";
import {Headers, Http, Request, RequestMethod, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class ApiService {
  private baseUrl = environment.apiUrl
  constructor(private http: Http, private authService: AuthService) { }

  get(url: string) {
    return this.request(url, RequestMethod.Get)
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body)
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body)
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete)
  }

  request(url: string, method: RequestMethod, body?: Object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if(this.authService.isLoggedIn()) {
      headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method,
      headers
    })

    if(body) {
      requestOptions.body = body
    }

    const request = new Request(requestOptions)

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res))
  }

  private onRequestError(res: Response) {
    const statusCode = res.status
    const body = res.json()

    const error = {
      statusCode: statusCode,
      message: body.message
    }

    alert(error.message)
    return Observable.throw(error)
  }
}
