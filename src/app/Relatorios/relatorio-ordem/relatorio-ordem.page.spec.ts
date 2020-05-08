import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioOrdemPage } from './relatorio-ordem.page';

describe('RelatorioOrdemPage', () => {
  let component: RelatorioOrdemPage;
  let fixture: ComponentFixture<RelatorioOrdemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioOrdemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioOrdemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
