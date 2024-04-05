import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component'; 


const routes: Routes = [
  { path: '', component: TodoAppComponent },
  { path: 'currency-converter', component: CurrencyConverterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
