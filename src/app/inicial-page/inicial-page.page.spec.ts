import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicialPagePage } from './inicial-page.page';

describe('InicialPagePage', () => {
  let component: InicialPagePage;
  let fixture: ComponentFixture<InicialPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicialPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicialPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
