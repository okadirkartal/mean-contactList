import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-contact',
  template: `<div class="add-form-container">
  <div class="ui icon message" *ngIf="newContact">
    <i class="notched check green icon"></i>
    <i class="close icon" (click)="newContact = null"></i>
    <div class="content">
      <div class="header">
        New contact added!
      </div>
      <p>Name: {{newContact.name}}</p>
    </div>
  </div>
  <form class="ui big form" #contactForm="ngForm" (submit)="onSubmit(contactForm)" [class.loading]="loading">
    <div class="fields">
      <div class="eight wide field">
        <label>First Name</label>
        <input type="text" placeholder="First Name" name="firstName" ngModel>
      </div>
      <div class="eight wide field">
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" name="lastName" ngModel>
      </div>
    </div>
    <div class="field">
      <label>Address</label>
      <input type="text" placeholder="Address" name="address" ngModel>
    </div>
    <div class="equal width fields">
      <div class="field">
        <label>Phone</label>
        <input type="text" maxlength="5" placeholder="(###)" name="areaCode" ngModel>
      </div>
      <div class="field">
        <label>&nbsp;</label>
        <input type="text" maxlength="3" placeholder="###" name="prefix" ngModel>
      </div>
      <div class="field">
        <label>&nbsp;</label>
        <input type="text" maxlength="4" placeholder="####" name="lineNumber" ngModel>
      </div>
    </div>
    <div class="field">
      <label>Photo URL</label>
      <input type="text" placeholder="http://cdn.com/profile.jpg" name="photo" ngModel>
    </div>
    <button type="submit" class="ui submit large grey button right floated">Submit</button>
  </form>
</div>
`,
  styles: [`.add-form-container {
    max-width: 960px;
    margin: 50px auto;
  }`]
})
export class AddContactComponent implements OnInit {

  loading: Boolean = false;
  newContact: Contact;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
      photoUrl: formValues.photo
    };

    this.api.post('contacts', contact)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newContact = data;
      });
  }

}
