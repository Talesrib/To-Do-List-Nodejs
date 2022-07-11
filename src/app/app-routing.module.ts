import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {path: '', component: TabsComponent},
  {path: 'add-item', component: AddItemComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
