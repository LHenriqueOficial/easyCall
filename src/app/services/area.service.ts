import { Injectable } from '@angular/core';
import { Area } from './../model/area';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
 areaCollection: AngularFirestoreCollection<Area>

  constructor(
    private afs: AngularFirestore,
  ) {
    this.areaCollection =  this.afs.collection<Area>('Area')
   }


  getAreas() {
    return this.areaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addArea(setor:Area) {
    return this.areaCollection.add(setor);
  }

  getArea(id: string) {
    return this.areaCollection.doc<Area>(id).valueChanges();
  }

  updateArea(id: string, area: Area) {
    return this.areaCollection.doc<Area>(id).update(area);
  }

  deleteArea(id: string) {
    return this.areaCollection.doc(id).delete();
  }

}
