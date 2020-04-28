import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StatusOs } from '../model/status-os';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusOsService {
  statusOsCollection: AngularFirestoreCollection<StatusOs>

  constructor(private afs: AngularFirestore) {
    this.statusOsCollection = this.afs.collection<StatusOs>('StatusOs');
  }

  getStatus(){

    return this.statusOsCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return{id, ...data};
      })
    }))
  }

  addStatus(status: StatusOs){
    return this.statusOsCollection.add(status)
  }

  deleteStatus(id: string){
    return this.statusOsCollection.doc(id).delete();
  }

}
