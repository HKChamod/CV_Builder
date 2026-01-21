import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'editor',
    loadComponent: () => import('./features/editor/cv-editor/cv-editor.component').then(m => m.CvEditorComponent)
  },
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full'
  }
];
