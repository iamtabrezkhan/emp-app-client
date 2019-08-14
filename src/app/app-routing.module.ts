import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () => import('./components/sign-up-module/sign-up-module.module').then(mod => mod.SignUpModuleModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login-module/login-module.module').then(mod => mod.LoginModuleModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user-module/user-module.module').then(mod => mod.UserModuleModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./components/user-detail-module/user-detail-module.module').then(mod => mod.UserDetailModuleModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
