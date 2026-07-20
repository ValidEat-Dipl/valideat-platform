import { Routes } from '@angular/router';
import {AdminOverviewComp} from './features/admin/components/admin-overview-comp/admin-overview-comp';
import {ClearingTicketsComp} from './features/admin/components/clearing-tickets-comp/clearing-tickets-comp';
import {CreateTicketComp} from './features/admin/components/create-ticket-comp/create-ticket-comp';
import {ExportComp} from './features/admin/components/export-comp/export-comp';
import {OpenConflictsComp} from './features/admin/components/open-conflicts-comp/open-conflicts-comp';
import {CheckConflictComp} from './features/admin/components/check-conflict-comp/check-conflict-comp';
import {TicketDetailsComp} from './features/admin/components/ticket-details-comp/ticket-details-comp';
import { MostRecentTicketsComp } from './features/admin/components/most-recent-tickets-comp/most-recent-tickets-comp';
import { CorrectTicketComp } from './features/admin/components/correct-ticket-comp/correct-ticket-comp';

export const routes: Routes = [
  /* voll */ { path: 'admin-overview', component: AdminOverviewComp },
  /* voll */ { path: 'most-recent-created', component: MostRecentTicketsComp },
  /* fast */ { path: 'create-ticket', component: CreateTicketComp }, // * keine admin erkennung weil fehlendes user system
  /* voll */ { path: 'clearing-tickets', component: ClearingTicketsComp },
  /* voll */ { path: 'clearing-tickets/check-conflict/:id', component: CheckConflictComp },
  /* voll */ { path: 'open-conflicts', component: OpenConflictsComp },
  /* bisl */ { path: 'export', component: ExportComp }, // in bearbeitung
  /* voll */ { path: 'ticket-details/:id', component: TicketDetailsComp },
  /* voll */ { path: 'ticket-details/correct/:id', component: CorrectTicketComp },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((module) => module.EMPLOYEE_ROUTES),
  },
  { path: '**', component: AdminOverviewComp },
];
