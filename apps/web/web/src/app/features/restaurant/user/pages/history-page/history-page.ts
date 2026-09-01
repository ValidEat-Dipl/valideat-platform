import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantNavigation } from '../../../components/restaurant-navigation/restaurant-navigation';

@Component({
  selector: 'app-history-page',
  imports: [RestaurantHeader, RestaurantNavigation, RouterLink],
  templateUrl: './history-page.html',
  styleUrl: './history-page.scss',
})
export class HistoryPage {}
