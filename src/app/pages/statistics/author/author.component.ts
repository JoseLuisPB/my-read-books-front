import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookDto } from 'src/app/models/bookDto.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {

  @Input() data: BookDto[] = [];
  panelOpenState = false;
  authorsLoaded = false;
  subscriptions: Subscription[] = [];
  authorList: string[] = [];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.statisticsService.getAuthors().subscribe( authors => {
        this.authorList = authors;
        this.authorsLoaded = true;
      }, error => {
        console.error(error);
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterAuthor(author: string): any {
    return this.data.filter( item => item.author === author);
  }

}
