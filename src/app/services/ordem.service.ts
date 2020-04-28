import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Ordem } from '../model/ordem';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdemService {
private ordemCollection : AngularFirestoreCollection<Ordem>;
  constructor(private afs: AngularFirestore) { 
    this.ordemCollection = this.afs.collection<Ordem>('Ordem');
  }

  getOrdens(){
    return this.ordemCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id =a.payload.doc.id;

        return {id, ...data}
      })
    }))
  };
  getOrdem(id: string) {
    return this.ordemCollection.doc<Ordem>(id).valueChanges();
  }

  addOrdem(ordem: Ordem){
    return this.ordemCollection.add(ordem);
  }

  updateOrdem(id: string, product: Ordem) {
    return this.ordemCollection.doc<Ordem>(id).update(product);
  }

}
