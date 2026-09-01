import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-restaurant-header',
  imports: [],
  templateUrl: './restaurant-header.html',
  styleUrl: './restaurant-header.scss',
})
export class RestaurantHeader {

  title = input('ValidEat');
  location = input('Restaurant Nord');

  showBackButton = input(false);
  showLocation = input(true);

  private locationService = inject(Location);


  goBack(): void {
    this.locationService.back();

  }
}
