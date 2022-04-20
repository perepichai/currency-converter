import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/models/currencies.model';
import { Currencies } from 'src/app/shared/enum/currencies';
import { RoundPipe } from 'src/app/shared/pipe/round.pipe';
import { GetCurrencies } from 'src/app/store/currencies.actions';
import { CurrenciesState } from 'src/app/store/currencies.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [RoundPipe]
})
export class MainComponent implements OnInit {
  @Select(CurrenciesState.currencies)
  currencies$!: Observable<Currency[]>;
  rates: Currency[] = [];
  selectedFirstCurrency = Currencies.usd;
  selectedSecondCurrency = Currencies.eur;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  quantityFirst = new FormControl(0);
  quantitySecond = new FormControl(0);
  currencyFirst = new FormControl('');
  currencySecond = new FormControl('');

  constructor( private store: Store, private pipe: RoundPipe) { }

  ngOnInit(): void {
    this.currencies$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(rates => this.rates = rates);
    this.store.dispatch(new GetCurrencies());
  }

  onChangeFirstCurrency(): void {
    const value: number = +this.quantityFirst.value;
    const result: number = this.calculate(value, false)
    this.quantitySecond.setValue(result);
  }
  onChangeSecondCurrency(): void {
    const value: number = this.quantitySecond.value;
    const result: number = this.calculate(value, true)
    this.quantityFirst.setValue(result);
  }

  calculate(value: number, isRevert: boolean): number {
    const firstCurrencyName = this.currencyFirst.value;
    const secondCurrencyName = this.currencySecond.value;
    const firstRateSale = +(this.rates.find(currency => currency.ccy === firstCurrencyName)?.sale || 0);
    const secondRateSale = +(this.rates.find(currency => currency.ccy === secondCurrencyName)?.sale || 0);
    const rate = isRevert ? (secondRateSale/firstRateSale) : (firstRateSale/secondRateSale);
    return this.pipe.transform(rate*value);
  }

}
