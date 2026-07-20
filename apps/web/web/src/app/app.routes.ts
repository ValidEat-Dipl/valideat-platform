import { Routes } from '@angular/router';
import {AdminOverviewComp} from './admin-overview-comp/admin-overview-comp';
import {ClearingTicketsComp} from './clearing-tickets-comp/clearing-tickets-comp';
import {CreateTicketComp} from './create-ticket-comp/create-ticket-comp';
import {ExportComp} from './export-comp/export-comp';
import {OpenConflictsComp} from './open-conflicts-comp/open-conflicts-comp';
import {CheckConflictComp} from './check-conflict-comp/check-conflict-comp';
import {TicketDetailsComp} from './ticket-details-comp/ticket-details-comp';
import { MostRecentTicketsComp } from './most-recent-tickets-comp/most-recent-tickets-comp';
import { CorrectTicketComp } from './correct-ticket-comp/correct-ticket-comp';

export const routes: Routes = [
  /* voll */ { path: 'admin-overview', component: AdminOverviewComp },
  /* voll */ { path: 'most-recent-created', component: MostRecentTicketsComp },
  /* fast */ { path: 'create-ticket', component: CreateTicketComp }, // * keine admin erkennung weil fehlendes user system
  /* voll */ { path: 'clearing-tickets', component: ClearingTicketsComp },
  /* voll */ { path: 'clearing-tickets/check-conflict/:id', component: CheckConflictComp },
  /* voll */ { path: 'open-conflicts', component: OpenConflictsComp },
  /* NEIN */ { path: 'export', component: ExportComp }, // fast nichts, für woche 3 geplant
  /* voll */ { path: 'ticket-details/:id', component: TicketDetailsComp },
  /* voll */ { path: 'ticket-details/correct/:id', component: CorrectTicketComp },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((module) => module.EMPLOYEE_ROUTES),
  },
  { path: '**', component: AdminOverviewComp },
];
