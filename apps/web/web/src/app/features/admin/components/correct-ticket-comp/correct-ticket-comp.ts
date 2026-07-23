import { Component, inject, OnInit, signal } from '@angular/core';
import { BadgeComp } from '../badge-comp/badge-comp';
import { ButtonComp } from '../button-comp/button-comp';
import { NavComp } from '../nav-comp/nav-comp';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetailService } from '../../services/ticket-detail-service';
import { TableData } from '../../models/table.model';
import { Status } from '../../models/status.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeTicketService } from '../../../employee/services/employee-ticket.service';
import { Restaurant } from '../../../employee/models/restaurant.model';
import { Tier } from '../../models/tier.model';
import { CostOrder } from '../../models/costOrder.model';
import { forkJoin } from 'rxjs';
import { CorrectTicketService } from '../../services/correct-ticket-service';
import { DeleteTicketService } from '../../services/delete-ticket-service';
import {Employee} from '../../models/employee.model';

@Component({
  selector: 'app-correct-ticket-comp',
  imports: [BadgeComp, NavComp, ReactiveFormsModule, ButtonComp],
  templateUrl: './correct-ticket-comp.html',
  styleUrl: './correct-ticket-comp.css',
})
export class CorrectTicketComp implements OnInit {
  route = inject(ActivatedRoute);
  ticketDetailService = inject(TicketDetailService);
  dropdownService = inject(EmployeeTicketService);
  deleteTicketService = inject(DeleteTicketService);
  fb = inject(FormBuilder);
  correctTicketService = inject(CorrectTicketService);
  router = inject(Router);

  id = signal<number>(0);

  showSuccessToast = signal(false);

  costOrders = signal<CostOrder[]>([]);
  restaurants = signal<Restaurant[]>([]);
  tiers = signal<Tier[]>([]);
  employees = signal<Employee[]>([]);
  ticketStatus = signal<string>('');
  ticketType = signal<string>('');

  dataDetail = signal<TableData>({
    headers: [],
    rows: [],
  });

  originalValues = {
    username: '',
    useDate: '',
    costDepartment: '',
    costRank: '',
    restaurant: '',
    status: '',
    correctionReason: '',
  };

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    useDate: ['', Validators.required],
    costDepartment: ['', Validators.required],
    costRank: ['', Validators.required],
    restaurant: ['', Validators.required],
    status: ['', Validators.required],
    type: ['', Validators.required],
    correctionReason: ['', Validators.required],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      forkJoin({
        ticket: this.ticketDetailService.loadTicketDetails(id),
        costOrders: this.dropdownService.getCostOrders(),
        restaurants: this.dropdownService.getRestaurants(),
        tiers: this.dropdownService.getTiers(),
        employees: this.dropdownService.getEmployees(),
      }).subscribe(({ ticket, costOrders, restaurants, tiers, employees }) => {
        this.costOrders.set(costOrders);
        this.restaurants.set(restaurants);
        this.tiers.set(tiers);
        this.employees.set(employees);
        this.ticketStatus.set(ticket.status);
        this.ticketType.set(ticket.ticketType);

        if (ticket.status === 'CHECKED') {
          this.router.navigate(['/ticket-details', id]);
          return;
        }

        this.dataDetail.set({
          headers: [
            { key: 'person', label: 'Mitarbeiter' },
            { key: 'datum', label: 'Datum' },
            { key: 'stufe', label: 'Stufe' },
            { key: 'kostenstelle', label: 'Kostenstelle' },
            { key: 'restaurant', label: 'Restaurant' },
            { key: 'status', label: 'Status' },
            { key: 'checkDate', label: 'Prüfdatum' },
          ],
          rows: [
            {
              person: ticket.firstName + ' ' + ticket.lastName,
              datum: ticket.useDate,
              stufe: ticket.tier,
              kostenstelle: ticket.costOrder,
              restaurant: ticket.restaurantName,
              checkDate: ticket.checkDate,
              status: new Status(ticket.status),
              id: ticket.id,
            },
          ],
        });

        this.form.patchValue({
          username: ticket.firstName + ' ' + ticket.lastName,
          useDate: ticket.useDate,
          costDepartment: ticket.costOrder,
          costRank: ticket.tier,
          restaurant: ticket.restaurantName,
          status: ticket.status,
        });

        this.id.set(ticket.id);
        this.originalValues = this.form.getRawValue();
      });
    });
  }

  protected resetForm() {
    this.form.reset(this.originalValues);
  }

  protected asStatus(value: unknown): Status | null {
    return value instanceof Status ? value : null;
  }

  protected showToast() {
    this.showSuccessToast.set(true);

    setTimeout(() => {
      this.showSuccessToast.set(false);
    }, 2000);
  }

  protected cancel() {
    this.router.navigate(['/ticket-details', this.id()]);
  }

  protected onSubmit() {
    if (this.form.invalid) return;
    if (this.ticketStatus() == 'CHECKED') return;
    const logging = {
      useDate: this.form.value.useDate!,
      employeeName: this.form.value.username!,
      costOrder: this.form.value.costDepartment!,
      tier: this.form.value.costRank!,
      restaurantName: this.form.value.restaurant!,
      status: this.form.value.status!,
      adminName: 'David Leitner',
    };
    console.log(logging);

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.correctTicketService
        .correctAdminTicket(id, {
          useDate: this.form.value.useDate!,
          employeeName: this.form.value.username!,
          costOrder: this.form.value.costDepartment!,
          tier: this.form.value.costRank!,
          restaurantName: this.form.value.restaurant!,
          status: this.form.value.status!,
          adminName: 'David Leitner',
        })
        .subscribe({
          next: () => {
            this.showToast();

            setTimeout(() => {
              this.router.navigate(['/clearing-tickets']);
            }, 2000);
          },
        });
    });
  }

  protected deleteTicket(id: number) {
    this.deleteTicketService.deleteTicket(id).subscribe({
      next: () => {
        this.router.navigate(['/most-recent-created']);
      },
    });
  }
}
