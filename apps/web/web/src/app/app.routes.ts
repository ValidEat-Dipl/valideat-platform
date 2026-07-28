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
import { RegisterComp } from './features/admin/components/register-comp/register-comp';
import { LoginComp } from './features/admin/components/login-comp/login-comp';

export const routes: Routes = [
  { path: 'admin-overview', component: AdminOverviewComp },
  { path: 'most-recent-created', component: MostRecentTicketsComp },
  { path: 'create-ticket', component: CreateTicketComp },
  { path: 'clearing-tickets', component: ClearingTicketsComp },
  { path: 'clearing-tickets/check-conflict/:id', component: CheckConflictComp },
  { path: 'open-conflicts', component: OpenConflictsComp },
  { path: 'export', component: ExportComp },
  { path: 'ticket-details/:id', component: TicketDetailsComp },
  { path: 'ticket-details/correct/:id', component: CorrectTicketComp },
  { path: 'register', component: RegisterComp },
  { path: 'login', component: LoginComp },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((module) => module.EMPLOYEE_ROUTES),
  },
  { path: '**', component: AdminOverviewComp },
];
