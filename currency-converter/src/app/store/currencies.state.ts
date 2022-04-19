import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetCurrencies } from "./currencies.actions";

import { Currency } from "../models/currencies.model";
import { CurrenciesService } from "../services/currencies.service";
import { Observable, tap } from "rxjs";

export interface CurrenciesStateModel {
    currencies: Currency[];
}

@State<CurrenciesStateModel>({
    name: 'currencies',
    defaults: {
        currencies: [],
    }
  })
  
@Injectable()

export class CurrenciesState {
    @Selector()
    static currencies(state: CurrenciesStateModel): Currency[] {
      return state.currencies;
    }

    constructor(
        private currenciesService: CurrenciesService,
      ) { }
    
    @Action(GetCurrencies)
    getCurrencies({ patchState }: StateContext<CurrenciesStateModel>, { }: GetCurrencies): Observable<Currency[]> {
      return this.currenciesService.getCurrencies().pipe(
        tap((currencies: Currency[]) => patchState({ currencies: currencies })));
    }
}