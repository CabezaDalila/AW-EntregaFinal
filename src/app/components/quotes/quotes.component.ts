import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { IDailyStocksResponse } from '../../interfaces/IdailyStocks';
import { formatYYYYMMDD } from '../../shared/utils/date.utility';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})

export class QuotesComponent implements OnInit {
  stocksData?: IDailyStocksResponse['results'];
  stockServices = inject(ApiPolygonService);
  constructor(private apiPolygon: ApiPolygonService) { }

  ngOnInit(): void {
    this.getDailyStock();
  }

  getDailyStock() {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    const todayFormatted = formatYYYYMMDD(date);
    console.log(todayFormatted);
    this.apiPolygon.getDailyStocks(todayFormatted).subscribe(
      (data) => {
        const results = data.results.slice(0, 9);
        this.stocksData = results;
        console.log(this.stocksData);
      }, (error) => {
        console.error(`Error fetching data`, error);
      }
    );
  }
}
