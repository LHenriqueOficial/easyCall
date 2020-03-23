import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroPagePage } from './cadastro-page.page';

describe('CadastroPagePage', () => {
  let component: CadastroPagePage;
  let fixture: ComponentFixture<CadastroPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
