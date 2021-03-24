import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import {ItemService} from '../../services/item.service'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items:Item[];
  editState:boolean=false;
  itemToEdit:Item;

  constructor(public itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items=>{
      console.log(items);
      this.items=items;
    })
  }

  deleteItem(event,item){
    this.itemService.deleteItem(item);
  }

  editItem(event,item){
    this.editState=true;
    this.itemToEdit=item;
  }

  updateItem(item){
    this.itemService.updateItem(item);
    this.editState=false;
    this.itemToEdit=null;
  }

}
