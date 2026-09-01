import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantNavigation } from '../../../components/restaurant-navigation/restaurant-navigation';

@Component({
  selector: 'app-restaurant-user-overview-page',
  imports: [RestaurantHeader, RestaurantNavigation, RouterLink],
  templateUrl: './restaurant-user-overview-page.html',
  styleUrl: './restaurant-user-overview-page.scss',
})
export class RestaurantUserOverviewPage {}
