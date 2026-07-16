import { Routes } from '@angular/router';
import {AdminOverviewComp} from './admin-overview-comp/admin-overview-comp';
import {ClearingTicketsComp} from './clearing-tickets-comp/clearing-tickets-comp';
import {CreateTicketComp} from './create-ticket-comp/create-ticket-comp';
import {ExportComp} from './export-comp/export-comp';
import {OpenConflictsComp} from './open-conflicts-comp/open-conflicts-comp';
import {CheckConflictComp} from './check-conflict-comp/check-conflict-comp';
import {TicketDetailsComp} from './ticket-details-comp/ticket-details-comp';
import { MostRecentTicketsComp } from './most-recent-tickets-comp/most-recent-tickets-comp';

export const routes: Routes = [
  { path: 'admin-overview', component: AdminOverviewComp }, // fertig
  { path: 'most-recent-created', component: MostRecentTicketsComp }, // fertig
  { path: 'create-ticket', component: CreateTicketComp }, // noch keine datalist, automatische hr erkennung fehlt (weil noch kein user system da ist), speichern button fehlerhaft
  { path: 'clearing-tickets', component: ClearingTicketsComp }, // fertig
  { path: 'clearing-tickets/check-conflict', component: CheckConflictComp }, // backend noch nicht fertig, fehlt noch viel frontend
  { path: 'open-conflicts', component: OpenConflictsComp }, // wenig gemacht, ka ob backend route da ist
  { path: 'export', component: ExportComp }, // fast nichts, für woche 3 geplant
  { path: 'ticket-details/:id', component: TicketDetailsComp }, // in bearbeitung
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((module) => module.EMPLOYEE_ROUTES),
  },
  { path: '**', component: AdminOverviewComp },
];
