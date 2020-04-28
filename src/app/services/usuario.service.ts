import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuarios } from '../model/Usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioCollection: AngularFirestoreCollection<Usuarios>;
  public usuario: Usuarios= {};

  constructor(
    private afs: AngularFirestore,
    private fbAuth : AngularFireAuth,
    
    ) { 
    this.usuarioCollection = this.afs.collection<Usuarios>('Usuarios');
  }
  getUsuarios(){
    return this.usuarioCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ... data};
        });
      })
    )
  }
  
  getUser(id: string) {
    return this.usuarioCollection.doc<Usuarios>(id).valueChanges();
  }


}
