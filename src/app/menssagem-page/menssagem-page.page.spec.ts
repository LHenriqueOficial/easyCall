import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenssagemPagePage } from './menssagem-page.page';

describe('MenssagemPagePage', () => {
  let component: MenssagemPagePage;
  let fixture: ComponentFixture<MenssagemPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenssagemPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenssagemPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
