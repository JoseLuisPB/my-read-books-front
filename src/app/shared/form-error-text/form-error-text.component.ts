import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-error-text',
  templateUrl: './form-error-text.component.html',
  styleUrls: ['./form-error-text.component.scss']
})
export class FormErrorTextComponent implements OnInit {

  @Input() message = '';
  constructor() { }

  ngOnInit(): void {
  }

}
