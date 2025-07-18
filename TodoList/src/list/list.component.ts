import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditItem, TodoItem } from '../interface/todo-item';
import { CommonModule } from '@angular/common';

//type ReadonlyItem=Readonly<TodoItem>;

@Component({
  selector: 'app-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  todoList : ( TodoItem & EditItem) []=[];
  newTask : string ='';
  errorMsg : string ='';
  EditId : number = -1;
  updatedItem : ( TodoItem & EditItem)[]=[];

  addTask():void{
    if(this.newTask.trim() !== '')
    {
      
      const newTodoItem:(TodoItem & EditItem )={
        id:Date.now(),
        task:this.newTask,
        completed:false,
        isEdit:false
      }
      
     const existingItem =this.todoList.filter(item=>item.task.toLowerCase().trim()===newTodoItem.task.toLowerCase().trim());

     if(existingItem.length==0)
     {
      this.todoList.push(newTodoItem);
      this.errorMsg='';
      this.newTask='';
     }
     else
     {
       this.errorMsg="This task already exists";
     }
    }
    else
    {
      this.errorMsg="Enter Task";
    }
  }

  toggleCompleted(index:number):void{
    console.log(index);
    this.todoList[index].completed=!(this.todoList[index].completed==false?true:false);
    console.log(this.todoList[index]);
  }

  EditTask(index:number):void{
    //this.EditId=index;
    this.todoList[index].isEdit=true;
    this.updatedItem.push(Object.freeze({...this.todoList[index]}));
    console.log(this.updatedItem);
  }

  CancelEdit(index:number):void{
    //this.EditId=-1;
    this.todoList[index].isEdit=false;
    this.updatedItem=[];
    console.log(this.updatedItem);
  }

  SaveTask(id:number): void{
      const changedItem = this.todoList.filter(item=>item.id == id);

      console.log("changedItem");
      console.log(changedItem);
      console.log("updatedItem");
      console.log(this.updatedItem);
      if(changedItem.length> - 1 && changedItem[0].task.trim()!=='')
      {
         const presentItem =changedItem[0].task.toLowerCase().trim()===this.updatedItem[0].task.toLowerCase().trim();
         console.log(presentItem);
         if(presentItem==false)
         {
            //this.todoList[id].task=changedItem[0].task.trim();
            //console.log("updated");
            changedItem[0].isEdit=false;
            this.updatedItem=[];
         }
          else
            alert("This Task already exists.");
      }
      else
      {
        alert("Please enter task.");
      }
      
  }

  deleteTask(id:number):void{
    this.todoList=this.todoList.filter(item=>item.id!==id);
    // const val=this.todoList.findIndex(item=>item.id==id);
    // console.log(val);
    // this.todoList.splice(val,1);
  }
}
