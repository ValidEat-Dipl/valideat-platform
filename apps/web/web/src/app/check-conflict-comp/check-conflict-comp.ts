import { Component, inject, signal, OnInit, output } from '@angular/core';
import { NavComp } from '../nav-comp/nav-comp';
import { TableCheckConflictComp } from '../table-check-conflict-comp/table-check-conflict-comp';
import { TableData } from '../table.model';
import { CheckConflictService } from '../check-conflict-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComp } from '../badge-comp/badge-comp';
import { CorrectTicketService } from '../correct-ticket-service';
import { CreateAdminTicket } from '../create-admin-ticket.model';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [NavComp, TableCheckConflictComp, BadgeComp],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp implements OnInit {
  checkConflictService = inject(CheckConflictService);
  correctTicketService = inject(CorrectTicketService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  empId: number = 0;
  adminId: number = 0;

  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  showSuccessToast = signal(false);
  protected showToast() {
    this.showSuccessToast.set(true);

    setTimeout(() => {
      this.showSuccessToast.set(false);
    }, 2000);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.checkConflictService.getClearingCase(id).subscribe((ticket) => {
        this.dataTable.set({
          headers: [
            { key: 'person', label: 'Mitarbeiter' },
            { key: 'datum', label: 'Datum' },
            { key: 'stufe', label: 'Stufe' },
            { key: 'kostenstelle', label: 'Kostenstelle' },
            { key: 'restaurant', label: 'Restaurant' },
          ],
          rows: [
            {
              personEmp: ticket.empTicketEmpName,
              personAdmin: ticket.adminTicketEmpName,
              datumEmp: ticket.empTicketUseDate,
              datumAdmin: ticket.adminTicketUseDate,
              stufeEmp: ticket.empTicketTier,
              stufeAdmin: ticket.adminTicketTier,
              kostenstelleEmp: ticket.empTicketCostOrder,
              kostenstelleAdmin: ticket.adminTicketCostOrder,
              restaurantEmp: ticket.empTicketRestaurant,
              restaurantAdmin: ticket.adminTicketRestaurant,
              idEmp: ticket.empTicketId,
              idAdmin: ticket.adminTicketId,
            },
          ],
        });
        this.empId = ticket.empTicketId;
        this.adminId = ticket.adminTicketId;
      });
    });
  }

  private asString(value: unknown): string {
    return value?.toString() ?? '';
  }

  protected correctEmployee() {
    const row = this.dataTable().rows[0];

    this.correctTicketService
      .correctAdminTicket(this.empId, {
        useDate: this.asString(row['datumAdmin']),
        employeeName: this.asString(row['personAdmin']),
        costOrder: this.asString(row['kostenstelleAdmin']),
        tier: this.asString(row['stufeAdmin']),
        restaurantName: this.asString(row['restaurantAdmin']),
        adminName: 'David Leitner',
        status: 'OPEN',
        description: 'Adminerfassung übernommen',
      })
      .subscribe({
        next: () => {
          this.showToast();

          setTimeout(() => {
            this.router.navigate(['/clearing-tickets']);
          }, 3000);
        },
      });
  }

  protected correctAdmin() {
    const row = this.dataTable().rows[0];

    this.correctTicketService
      .correctAdminTicket(this.adminId, {
        useDate: this.asString(row['datumEmp']),
        employeeName: this.asString(row['personEmp']),
        costOrder: this.asString(row['kostenstelleEmp']),
        tier: this.asString(row['stufeEmp']),
        restaurantName: this.asString(row['restaurantEmp']),
        adminName: 'David Leitner',
        status: 'OPEN',
        description: 'Mitarbeitererfassung übernommen',
      })
      .subscribe({
        next: () => {
          this.showToast();

          setTimeout(() => {
            this.router.navigate(['/clearing-tickets']);
          }, 3000);
        },
      });
  }
}
