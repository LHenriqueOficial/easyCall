import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

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
  {path: 'inicial-page',loadChildren: () => import('./inicial-page/inicial-page.module').then( m => m.InicialPagePageModule)
  },
  {path: 'cadastro-page', loadChildren: () => import('./cadastro-page/cadastro-page.module').then( m => m.CadastroPagePageModule)
  },
  {path: 'login-page',canActivate: [LoggedGuard] , loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {path: 'home-page',canActivate: [AuthGuard],loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {path: 'home-page/:id',canActivate: [AuthGuard],loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {path: 'usuarios-page',loadChildren: () => import('./usuarios-page/usuarios-page.module').then( m => m.UsuariosPagePageModule)
  },
  {path: 'abrir-os-page',canActivate: [AuthGuard],loadChildren: () => import('./abrir-os-page/abrir-os-page.module').then( m => m.AbrirOsPagePageModule)
  },
  {path: 'menssagem-page/:id',loadChildren: () => import('./menssagem-page/menssagem-page.module').then( m => m.MenssagemPagePageModule)
  },
  // {path: 'status-os-page/:Aguardando',loadChildren: () => import('./status-os-page/status-os-page.module').then( m => m.StatusOsPagePageModule)
  // },
  {path: 'status-os-page/:valor',loadChildren: () => import('./status-os-page/status-os-page.module').then( m => m.StatusOsPagePageModule)
  },
  {path: 'status-os-page',loadChildren: () => import('./status-os-page/status-os-page.module').then( m => m.StatusOsPagePageModule)
  },
  {path: 'status-os-page/:equipamento',loadChildren: () => import('./status-os-page/status-os-page.module').then( m => m.StatusOsPagePageModule)
  },
  {path: 'os-manutencaopage',loadChildren: () => import('./os-manutencaopage/os-manutencaopage.module').then( m => m.OsManutencaopagePageModule)
  },
  {path: 'relatorio-page',loadChildren: () => import('./relatorio-page/relatorio-page.module').then( m => m.RelatorioPagePageModule)
  },
  {path: 'detalhes',loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {path: 'detalhes/:id',loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {path: 'detalhes/:id/:equipamento',loadChildren: () => import('./detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'equipamentos-page',
    loadChildren: () => import('./equipamentos-page/equipamentos-page.module').then( m => m.EquipamentosPagePageModule)
  },
  {
    path: 'setor-page',
    loadChildren: () => import('./setor-page/setor-page.module').then( m => m.SetorPagePageModule)
  },
  {
    path: 'relatorio-equipamentos',
    loadChildren: () => import('./Relatorios/relatorio-equipamentos/relatorio-equipamentos.module').then( m => m.RelatorioEquipamentosPageModule)
  },
  {
    path: 'relatorio-ordem',
    loadChildren: () => import('./Relatorios/relatorio-ordem/relatorio-ordem.module').then( m => m.RelatorioOrdemPageModule)
  },
  {
    path: 'relatorio-ordens',
    loadChildren: () => import('./Relatorios/relatorio-ordens/relatorio-ordens.module').then( m => m.RelatorioOrdensPageModule)
  },
  {
    path: 'manutencao',
    loadChildren: () => import('./Pages/manutencao/manutencao.module').then( m => m.ManutencaoPageModule)
  },
  {
    path: 'disponibilidade',
    loadChildren: () => import('./pages/disponibilidade/disponibilidade.module').then( m => m.DisponibilidadePageModule)
  },
  {
    path: 'area',
    loadChildren: () => import('./pages/area/area.module').then( m => m.AreaPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
