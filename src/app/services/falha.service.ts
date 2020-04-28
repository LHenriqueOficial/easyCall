import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Falhas } from '../model/falhas';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FalhaService {
  private falhasCollection: AngularFirestoreCollection<Falhas>;

  constructor(private afs: AngularFirestore) { 
    this.falhasCollection = this.afs.collection<Falhas>('Falhas');
  }

  getFalhas(){
    return this.falhasCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ... data};
        });
      })
    )
  }


}
