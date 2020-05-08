import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioEquipamentosPage } from './relatorio-equipamentos.page';

describe('RelatorioEquipamentosPage', () => {
  let component: RelatorioEquipamentosPage;
  let fixture: ComponentFixture<RelatorioEquipamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioEquipamentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioEquipamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
