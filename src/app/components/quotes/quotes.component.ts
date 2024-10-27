import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { Iaccion } from '../../interfaces/Iaccion';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})

export class QuotesComponent implements OnInit {
  stocks: Iaccion[] = [];
  stockServices = inject(ApiPolygonService);
  ticker: string = 'AAPL';
  date = new Date();

  day = (this.date.getDate() - 1).toString();
  day2 = (this.date.getDate() - 2).toString()
  month = (this.date.getMonth() + 1).toString();
  year = this.date.getFullYear()
  dateYesterday = `${this.year}-${this.month}-${this.day}`;
  dateYesterday2 = `${this.year}-${this.month}-${this.day2}`;
  constructor(private apiPolygon: ApiPolygonService) {

  }
  ngOnInit(): void {
    this.getStockData();
  }
  getStockData() {
    this.apiPolygon.getStockData(this.ticker, this.dateYesterday, this.dateYesterday2).subscribe(
      (data) => {
        this.stocks = data;
        console.log(this.stocks);//me tira error por consola
      }, (error) => {
        console.error(`Error fetching data for ${this.ticker}`, error);
      }
    );
  }


}
