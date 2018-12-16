import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFeedbackComponent } from './chat-feedback.component';

describe('ChatFeedbackComponent', () => {
  let component: ChatFeedbackComponent;
  let fixture: ComponentFixture<ChatFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
