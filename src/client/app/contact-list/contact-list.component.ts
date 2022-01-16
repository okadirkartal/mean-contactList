import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact-list',
  template: `<div class="ui container">
  <div class="ui grid">
    <app-contact *ngFor="let contact of contacts" [contact]="contact"></app-contact>
  </div>
</div>`,
  styles: [`.container {
    margin-top: 50px;
  }`]
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('contacts')
      .subscribe(data => this.contacts = data);
  }

}
