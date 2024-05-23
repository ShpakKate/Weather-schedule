import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlParams } from '../shared/models/url-params';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  constructor(
    private readonly router: Router,
  ) {}

  setUrlParams(urlParams: UrlParams) {
    this.router.navigate([],{
      queryParams: urlParams,
      queryParamsHandling: 'merge',
    })
  }

  resetParams() {
    this.router.navigate([], {
      queryParams : {
        city: null,
        slug : null,
      }
    })
  }
}
