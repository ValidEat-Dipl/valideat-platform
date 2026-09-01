import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';

@Component({
  selector: 'app-select-restaurant-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './select-restaurant-page.html',
  styleUrl: './select-restaurant-page.scss',
})
export class SelectRestaurantPage {}
