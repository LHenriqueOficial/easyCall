import { Injectable } from '@angular/core';
import { Funcao } from './../model/funcao';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  funcaoCollection: AngularFirestoreCollection<Funcao>



  constructor(
    private afs: AngularFirestore,
  ) { 
    this.funcaoCollection =  this.afs.collection<Funcao>('Funcao')
  }

  getSetores() {
    return this.funcaoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addFuncao(setor: Funcao) {
    return this.funcaoCollection.add(setor);
  }

  getFuncao(id: string) {
    return this. funcaoCollection.doc<Funcao>(id).valueChanges();
  }

  getFuncoes(){
    return this.funcaoCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id =a.payload.doc.id;

        return {id, ...data}
      })
    }))
  };

  updateFuncao(id: string, funcao: Funcao) {
    return this. funcaoCollection.doc<Funcao>(id).update(funcao);
  }

  deleteFuncao(id: string) {
    return this. funcaoCollection.doc(id).delete();
  }

}
