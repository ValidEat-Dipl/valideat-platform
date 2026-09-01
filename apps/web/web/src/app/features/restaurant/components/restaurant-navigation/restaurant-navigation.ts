import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-restaurant-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './restaurant-navigation.html',
  styleUrl: './restaurant-navigation.scss',
})
export class RestaurantNavigation {}
