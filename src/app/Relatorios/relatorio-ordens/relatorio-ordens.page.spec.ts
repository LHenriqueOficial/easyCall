import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioOrdensPage } from './relatorio-ordens.page';

describe('RelatorioOrdensPage', () => {
  let component: RelatorioOrdensPage;
  let fixture: ComponentFixture<RelatorioOrdensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioOrdensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioOrdensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
