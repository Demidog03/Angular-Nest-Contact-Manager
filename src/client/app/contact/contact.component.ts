import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Contact} from "../contact-list/contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact
  @HostBinding('class') columnClass = "four wide column"
  constructor() { }

  ngOnInit() {
  }

}
