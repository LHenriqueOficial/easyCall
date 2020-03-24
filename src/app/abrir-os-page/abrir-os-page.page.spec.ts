import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbrirOsPagePage } from './abrir-os-page.page';

describe('AbrirOsPagePage', () => {
  let component: AbrirOsPagePage;
  let fixture: ComponentFixture<AbrirOsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirOsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbrirOsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
