import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items:Observable<Item[]>;
  
  itemDoc:AngularFirestoreDocument<Item>;

  constructor(private store:AngularFirestore) {
    //this.items=this.store.collection('item').valueChanges();
    this.itemsCollection=this.store.collection('item',ref=>ref.orderBy('title','asc'));

    this.items=this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getItems(){
    return this.items;
  }
  addItem(item:Item){
    this.itemsCollection.add(item);
  }
  deleteItem(item:Item){
    this.itemDoc=this.store.doc(`item/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item:Item){
    this.itemDoc=this.store.doc(`item/${item.id}`);
    this.itemDoc.update(item);
  }
}


