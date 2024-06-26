import { Component, OnInit } from '@angular/core';
import { IPopularSerie } from '../model/serieModels';
import { SeriesHttpClientService } from './series-http.client.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {

  popularSeries? : IPopularSerie[];
  
  constructor(private serieService: SeriesHttpClientService,
              private router: Router){}
              
  ngOnInit(): void {
    this.loadPopularSeries();
  }
  
  async loadPopularSeries() {
    try {
      const series = await firstValueFrom(this.serieService.getPopularSeries());
      if (series) 
        this.popularSeries = series.results;
    }catch (e) {
      console.error(e);
    }
  }

  onClick(serieId: number): void {
    this.router.navigate(['serie/' + serieId]);
  }

}
