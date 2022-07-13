import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {path: '', component: TabsComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'add-item', component: AddItemComponent},
  {path: 'edit-item/:id', component: EditPageComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
