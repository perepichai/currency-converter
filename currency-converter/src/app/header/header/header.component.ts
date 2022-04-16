import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Select(MetaDataState.currencies)
  // currencies$: Observable<Currency[]>;
  currencies = [{usd: 29.25, eur: 33}];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    // this.currencies$.pipe(
    //   takeUntil(this.destroy$),
    // ).subscribe(currencies => this.currencies = currencies);
    // this.currencies.push({usd: 29.25, eur: 33});
  }
}
