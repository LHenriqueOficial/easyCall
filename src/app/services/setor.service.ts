import { Injectable } from '@angular/core';
import { Setor } from './../model/setor';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  setorCollection: AngularFirestoreCollection<Setor>
 

  constructor( private afs: AngularFirestore) {
    this.setorCollection =  this.afs.collection<Setor>('Setor')
   }


  getSetores() {
    return this.setorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addSetor(setor: Setor) {
    return this.setorCollection.add(setor);
  }

  getSetor(id: string) {
    return this. setorCollection.doc<Setor>(id).valueChanges();
  }

  updateSetor(id: string, equipamento: Setor) {
    return this. setorCollection.doc<Setor>(id).update(equipamento);
  }

  deleteSetor(id: string) {
    return this. setorCollection.doc(id).delete();
  }


}
