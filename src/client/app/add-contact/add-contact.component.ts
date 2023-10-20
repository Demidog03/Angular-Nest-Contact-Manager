import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact-list/contact.model";
import {NgForm} from "@angular/forms";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  loading: boolean = false
  newContact: Contact

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true

    const formValue = Object.assign({}, form.value)
    const contact: Contact = {
      name: `${formValue.firstName} ${formValue.lastName}`,
      address: formValue.address,
      phone: `${formValue.areaCode} ${formValue.prefix} ${formValue.lineNumber}`,
      photoUrl: formValue.photo
    }

    this.apiService.post('/contacts', contact)
      .subscribe(data => {
        form.reset()
        this.loading = false
        this.newContact = data
      }, () => { this.loading = false },
        () => { this.loading = false })
  }
}
