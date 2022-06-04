import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookDto } from 'src/app/models/bookDto.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  @Input() data: BookDto[] = [];
  subscriptions: Subscription[] = [];
  countriesLoaded = false;
  panelOpenState = false;
  countryList: string[] = [];

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.statisticsService.getCountries().subscribe( countries => {
        this.countryList = countries;
        this.countriesLoaded = true;
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterCountry(country: string) {
    const authorsCountry = this.data.filter(item => item.country === country);
    const authorsAlone = authorsCountry.map( item => item.author);
    return new Set(authorsAlone);
  }

}
