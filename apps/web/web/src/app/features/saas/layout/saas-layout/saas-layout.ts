import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SaasSidebar } from '../../components/saas-sidebar/saas-sidebar';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-layout',
  imports: [FormsModule, RouterOutlet, SaasSidebar],
  providers: [SaasState],
  templateUrl: './saas-layout.html',
  styleUrl: './saas-layout.scss',
})
export class SaasLayout implements OnInit {

  constructor(public state: SaasState) {

  }

  ngOnInit(): void {

    this.state.loadTenants();

  }

}