import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any = null;
  credits: any = null;
  translations: any = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTvShowDetails(+id);
    }
  }

  loadTvShowDetails(id: number) {
    forkJoin({
      tvShowDetails: this.tmdbService.getTvShowDetails(id),
      credits: this.tmdbService.getTvShowCredits(id),
      translations: this.tmdbService.getTvShowTranslations(id)
    }).subscribe({
      next: (data: any) => {
        this.tvShow = data.tvShowDetails;
        this.credits = data.credits;
        this.translations = data.translations;
        console.log('TV Show details loaded:', this.tvShow);
      },
      error: (error) => {
        console.error('Error fetching TV Show details:', error);
      }
    });
  }
}