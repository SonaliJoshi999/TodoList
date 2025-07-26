import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListFormsComponent } from '../list-forms/list-forms.component';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ListFormsComponent, ListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'TodoList';
  showTodoList:boolean=true;

  toggleComponents(componentsToShow:string)
  {
    this.showTodoList=(componentsToShow==='A');
  }
}
