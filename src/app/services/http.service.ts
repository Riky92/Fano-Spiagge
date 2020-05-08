import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { merge, take, timeout, map, catchError, filter } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { throwError as observableThrowError } from 'rxjs';



export interface HttpServiceParams {
  data?;
  method: string;
  path: string;
  search?: URLSearchParams;
  background?: boolean;
  uploadFile?;
  ignoreNavigation?: boolean;
  pdf?: boolean;
}

@Injectable()
export class HttpService {
  promiseQueue = 0;
  isBlkError = false;
  activeCalls: number;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  get(path: string, search?, options?) {
    return this.call({
      method: 'get',
      path,
      search,
      ignoreNavigation: options && options.ignoreNavigation
    });
  }

  getInBackground(path: string, search?: any) {
    return this.call({
      method: 'get',
      path,
      search,
      background: true
    });
  }

  getExternal(path: string, search?: any, external?) {
    return this.callExternal(
      {
        method: 'get',
        path,
        search
      },
      null,
      external
    );
  }

  post(path, data, options?) {
    return this.call({
      method: 'post',
      path,
      data,
      ignoreNavigation: options && options.ignoreNavigation
    });
  }

  postPDF(path, data) {
    return this.call({
      method: 'post',
      path,
      data,
      pdf: true
    });
  }

  put(path, data) {
    return this.call({
      method: 'put',
      path,
      data
    });
  }

  delete(path, data?) {
    return this.call({
      method: 'delete',
      path,
      data
    });
  }

  call(params: HttpServiceParams) {

    const options = this.createRequestOptions(params);

    const path = params.path;

    return this.http.request(params.method, path, options).pipe(
      merge(this.checkNavigation(params)),
      take(1),
      timeout(120000),
      map(this.parseResponse.bind(this, params)),
      map(this.checkForErrors.bind(this)),
      catchError(this.handleError.bind(this, params)),
      catchError(this.checkSubscriber)
    );
  }

  callExternal(params: HttpServiceParams, search, external?) {
    const options = this.createRequestOptions(params, external);
    this.promiseQueue += 1;

    return this.http.request('get', params.path, options).pipe(
      map(this.parseResponse.bind(this, params)),
      map(this.checkForErrors.bind(this)),
      catchError(this.handleError.bind(this, params)),
      catchError(this.checkSubscriber)
    );
  }

  protected createRequestOptions(httpServiceParams: HttpServiceParams, external?) {
    let params;
    let headers;
    let body;

    if (httpServiceParams.search) {
      let urlSearchParams = new HttpParams();
      httpServiceParams.search.forEach((value: any, param) => {
        if (value instanceof Array) {
          value.forEach(item => {
            urlSearchParams = urlSearchParams.append(param, item);
          });
        } else {
          urlSearchParams = urlSearchParams.append(param, value);
        }
      });
      params = urlSearchParams;
    }

    headers = new HttpHeaders();

    if (external) {
      headers = headers.set('operatorId', external.headerOperatorId);
      headers = headers.set('channelID', external.headerChannelId);
      headers = headers.set('systemId', external.headerSystemId);
      headers = headers.set('companyId', external.headerCompanyId);
      headers = headers.set('frontendId', external.headerFrontendId);
    }
    let responseType = null;
    if (httpServiceParams.uploadFile) {
      const formData = new FormData();
      formData.set('request', JSON.stringify(httpServiceParams.data));
      formData.set('file', httpServiceParams.uploadFile);
      body = formData;
    } else if (httpServiceParams.pdf) {
      body = JSON.stringify(httpServiceParams.data);
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      responseType = 'arraybuffer';
    } else if (httpServiceParams.data) {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      body = httpServiceParams.data;
    }
    if (responseType) {
      return { params, headers, body, responseType };
    } else {
      return { params, headers, body };
    }
  }

  private checkNavigation(params) {
    return this.router.events.pipe(
      filter(
        event => !params.ignoreNavigation && event instanceof NavigationStart
      ),
      map(data => {
        throw new Error('navigation-error');
      })
    );
  }

  protected checkForErrors(data: any) {
    if (this.activeCalls === 0) {
      // this.httpErrorProvider.resetBlkError();
      // this.alertNotification.clear();
    }
    // if (data.returnCode && data.returnCode !== Tipoalert.success) {
    //   if (data.returnCode < 0) {
    //     this.alertNotification.error(data.reasonCode);
    //   } else if (data.returnCode === Tipoalert.warning) {
    //     this.alertNotification.warn(data.reasonCode);
    //   } else if (data.returnCode === Tipoalert.error) {
    //     this.alertNotification.error(data.reasonCode);
    //   } else if (data.returnCode === Tipoalert.warningBloccante) {
    //     this.alertNotification.warnBloccante(data.reasonCode);
    //   }
    //   this.httpErrorProvider.setBlkError(this.alertNotification.getErrorStatus());
    // }
    // this.activeCalls = this.loadingService.stop();
    return data;
  }

  private checkSubscriber(error: any) {
    // evita che il subscriber debba esplicitamente gestire l'errore
    let destination = this as any;
    while (destination && destination._error) {
      destination = destination.destination;
    }
    if (destination) {
      destination._error = () => { };
    }
    return observableThrowError(error);
  }

  protected handleError(params: HttpServiceParams, error: any) {
    if (error && error.status) {
      // this.loadingService.shut();
      if (error.status !== 200) {
        //       this.errorResponseAlert(error.status);
      }
      // const errorMessage = error instanceof Error ? error.message : 'Errore durante l\'esecuzione del servizio';
    }
    return observableThrowError(error);
  }

  protected buildWarningDetail(warnings) {
    let toReturn = '';
    if (!warnings) {
      return toReturn;
    }
    warnings.forEach(warning => {
      toReturn += `<li>${warning}</li>`;
    });
    return `<ul>${toReturn}</ul>`;
  }

  private parseResponse(params: HttpServiceParams, response: any) {
    this.promiseQueue -= 1;

    if (!response) {
      throw new Error();
    }
    if (response.status && response.status === 204) {
      throw response;
    }
    // this.traceService.trace(params, response);
    // if (response.returnCode === 2) {
    //   this.openSnack(response.reasonCode, 'error');
    // } else if (response.returnCode === 1) {
    //   this.openSnack(response.reasonCode, 'warning');
    // } else if (response.returnCode === 3) {
    //   this.openSnack(response.reasonCode, 'warning-bloccante');
    // }
    return response;
  }
}

