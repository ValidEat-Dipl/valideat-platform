import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';

@Component({
  selector: 'app-detail-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})
export class DetailPage {}
