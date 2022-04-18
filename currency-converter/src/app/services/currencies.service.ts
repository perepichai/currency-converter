import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currencies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) { }

  /**
   * This method get currencies
   */
   getCurrencies(): Observable<Currency[]> {
     console.log('terst');
    return this.http.get<Currency[]>(`/p24api/pubinfo?json&exchange&coursid=5`);
  }

}
