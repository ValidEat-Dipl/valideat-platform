import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'employee/entries/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'employee/entries/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: 'clearing-tickets/check-conflict/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ticket-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ticket-details/correct/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'restaurant/user/history/detail/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'restaurant/admin/overview',
    renderMode: RenderMode.Server,
  },
  {
    path: 'restaurant/admin/tickets',
    renderMode: RenderMode.Server,
  },
  {
    path: 'restaurant/admin/billing',
    renderMode: RenderMode.Server,
  },
  {
    path: 'restaurant/admin/settings',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
