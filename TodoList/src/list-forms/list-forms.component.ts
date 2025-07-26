import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface Todolists{
  id:number;
  title:string;
  test:boolean;
}

export interface status{
  isEdit:boolean;
}

type Todo= Todolists & status;

@Component({
  selector: 'app-list-forms',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './list-forms.component.html',
  styleUrl: './list-forms.component.css'
})
export class ListFormsComponent {
    todos=signal<Todo[]>([]);
    private nextId=1;
    todoForm:FormGroup<{title:FormControl<string>}>;
    updateItem:Todo[]=[];

    constructor(private fb:FormBuilder){
      this.todoForm=this.fb.nonNullable.group({title:['']})
    }

    AddTodo(){
      const title=this.todoForm.value.title!.trim();
      if(!title) return;

      this.todos.update((u)=>[...u,{id:this.nextId++,title,test:true, isEdit:false}]);
      this.todoForm.reset();
    }

    DeleteTodo(id:number)
    {
      this.todos.update((u)=>u.filter((f)=>f.id!==id));
    }

    EditTodo(id:number)
    {
        const editedItem=this.todos().find((todo)=>todo.id==id);
        if(editedItem===undefined)
          return;
        else
        {
          editedItem!.isEdit=true;
          this.updateItem.push(Object.freeze({...editedItem}));
        }
    }

    SaveTodo(id:number){
        const editedItem=this.todos().find((todo)=>todo.id==id);
        if(editedItem===undefined)
          return;
        else
        {
          if(editedItem.title.trim()==='')
            alert("Please Enter Task");
          else
          {

            const taskExist=this.todos().filter((u)=>u.title.toLowerCase().trim()===editedItem.title.toLowerCase().trim());
            if(taskExist.length>1)
              alert("This task already exists.");
            else
            {
            // console.log(editedItem);
            // console.log(this.updateItem);
            //console.log(taskExist);
            // if(taskExist==false)
            // {
              editedItem.isEdit=false;
              this.updateItem=[];
            //}
            }
          }
        }
    }

    CancelTodo(id:number)
    {
      this.todos().find((todo)=>todo.id==id)
      const editedItem=this.todos().find((todo)=>todo.id==id);
        if(editedItem===undefined)
          return;
        else
        {
          editedItem.isEdit=false;
          editedItem.title=this.updateItem[0].title;
          this.updateItem=[];
        }

    }
}
