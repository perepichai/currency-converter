import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/models/currencies.model';
import { GetCurrencies } from 'src/app/store/currencies.actions';
import { CurrenciesState } from 'src/app/store/currencies.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Select(CurrenciesState.currencies)
  currencies$!: Observable<Currency[]>;
  currencies: Currency[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.currencies$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(currencies => this.currencies = currencies);
    this.store.dispatch(new GetCurrencies());
  }

}
