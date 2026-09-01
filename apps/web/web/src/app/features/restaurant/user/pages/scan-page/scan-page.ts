import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';

@Component({
  selector: 'app-scan-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './scan-page.html',
  styleUrl: './scan-page.scss',
})
export class ScanPage {}
