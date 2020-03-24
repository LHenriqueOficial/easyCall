import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioPagePage } from './relatorio-page.page';

describe('RelatorioPagePage', () => {
  let component: RelatorioPagePage;
  let fixture: ComponentFixture<RelatorioPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
