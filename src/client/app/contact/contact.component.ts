import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contact',
  template: `<div class="ui card">
  <div class="image">
    <img src="{{contact?.photoUrl}}">
  </div>
  <div class="content">
    <a class="header">{{contact.name}}</a>
    <div class="description">
      {{contact.address}}
    </div>
  </div>
  <div class="extra content">
    <span>
      <i class="call icon"></i>
      {{contact.phone}}
    </span>
  </div>
</div>
`
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;

  @HostBinding('class') columnClass = 'four wide column';

  constructor() { }

  ngOnInit() {
  }

}
