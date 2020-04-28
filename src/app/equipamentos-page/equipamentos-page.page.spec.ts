import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipamentosPagePage } from './equipamentos-page.page';

describe('EquipamentosPagePage', () => {
  let component: EquipamentosPagePage;
  let fixture: ComponentFixture<EquipamentosPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentosPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipamentosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
