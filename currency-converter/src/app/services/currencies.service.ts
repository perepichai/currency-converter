import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currencies } from '../models/currencies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) { }

  /**
   * This method get currencies
   */
   getCurrencies(): Observable<Currencies> {
    return this.http.get<Currencies>(`/p24api/pubinfo?json&exchange&coursid=5`);
  }

}
