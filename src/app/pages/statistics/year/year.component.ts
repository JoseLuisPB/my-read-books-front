import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookDto } from 'src/app/models/bookDto.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit, OnDestroy {

  @Input() data: BookDto[] = [];
  panelOpenState = false;
  yearsLoaded = false;
  yearList :number[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.statisticsService.getYears().subscribe( years =>{
        this.yearList = years;
        this.yearsLoaded = true;
      }, error => {
        console.error(error);
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterYear(year: number): any {
    return this.data.filter(item => item.year === year);
  }

}
