import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Equipamentos } from './../model/equipamentos';


@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  equipamentoCollection: AngularFirestoreCollection<Equipamentos>
 

  constructor( private afs: AngularFirestore) {
    this.equipamentoCollection =  this.afs.collection<Equipamentos>('Equipamentos')
   }


  getEquipamentos() {
    return this. equipamentoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addequipamento(equipamento: Equipamentos) {
    return this. equipamentoCollection.add(equipamento);
  }

  getequipamento(id: string) {
    return this. equipamentoCollection.doc<Equipamentos>(id).valueChanges();
  }

  updateEquipamento(id: string, equipamento: Equipamentos) {
    return this. equipamentoCollection.doc<Equipamentos>(id).update(equipamento);
  }

  deleteEquipamento(id: string) {
    return this. equipamentoCollection.doc(id).delete();
  }
}

