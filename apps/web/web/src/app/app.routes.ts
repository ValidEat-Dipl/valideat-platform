import { Routes } from '@angular/router';
import {AdminOverviewComp} from './admin-overview-comp/admin-overview-comp';
import {ClearConflictComp} from './clear-conflict-comp/clear-conflict-comp';
import {ClearingTicketsComp} from './clearing-tickets-comp/clearing-tickets-comp';
import {CreateTicketComp} from './create-ticket-comp/create-ticket-comp';
import {ExportComp} from './export-comp/export-comp';
import {OpenConflictsComp} from './open-conflicts-comp/open-conflicts-comp';
import {CheckConflictComp} from './check-conflict-comp/check-conflict-comp';
import {TicketDetailsComp} from './ticket-details-comp/ticket-details-comp';

export const routes: Routes = [
  { path: "admin-overview", component: AdminOverviewComp},
  { path: "clear-conflict", component: ClearConflictComp},
  { path: "clearing-tickets", component: ClearingTicketsComp},
  { path: "create-ticket", component: CreateTicketComp},
  { path: "open-conflicts", component: OpenConflictsComp},
  { path: "check-conflict", component: CheckConflictComp},
  { path: "export", component: ExportComp},
  { path: "ticket-details", component: TicketDetailsComp},
  { path: "**", component: AdminOverviewComp}
];
