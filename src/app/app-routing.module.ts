import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicial-page',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'inicial-page',
    loadChildren: () => import('./inicial-page/inicial-page.module').then( m => m.InicialPagePageModule)
  },
  {
    path: 'cadastro-page',
    loadChildren: () => import('./cadastro-page/cadastro-page.module').then( m => m.CadastroPagePageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'usuarios-page',
    loadChildren: () => import('./usuarios-page/usuarios-page.module').then( m => m.UsuariosPagePageModule)
  },
  {
    path: 'abrir-os-page',
    loadChildren: () => import('./abrir-os-page/abrir-os-page.module').then( m => m.AbrirOsPagePageModule)
  },
  {
    path: 'menssagem-page/:id',
    loadChildren: () => import('./menssagem-page/menssagem-page.module').then( m => m.MenssagemPagePageModule)
  },
  {
    path: 'status-os-page',
    loadChildren: () => import('./status-os-page/status-os-page.module').then( m => m.StatusOsPagePageModule)
  },
  {
    path: 'os-manutencaopage',
    loadChildren: () => import('./os-manutencaopage/os-manutencaopage.module').then( m => m.OsManutencaopagePageModule)
  },
  {
    path: 'relatorio-page',
    loadChildren: () => import('./relatorio-page/relatorio-page.module').then( m => m.RelatorioPagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
