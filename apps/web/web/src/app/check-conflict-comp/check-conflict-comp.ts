import { Component, inject, signal, OnInit } from '@angular/core';
import { NavComp } from '../nav-comp/nav-comp';
import { TableCheckConflictComp } from '../table-check-conflict-comp/table-check-conflict-comp';
import { TableData } from '../table.model';
import { CheckConflictService } from '../check-conflict-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComp } from '../badge-comp/badge-comp';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [NavComp, TableCheckConflictComp, BadgeComp],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp implements OnInit {
  checkConflictService = inject(CheckConflictService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

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
        console.log(this.dataTable());
      });
    });
  }
}
