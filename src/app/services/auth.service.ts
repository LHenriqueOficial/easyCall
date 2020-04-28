import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Usuarios } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afa: AngularFireAuth) { }

  login(user: Usuarios) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  register(user: Usuarios) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}