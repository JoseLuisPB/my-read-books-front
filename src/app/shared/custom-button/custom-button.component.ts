import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {

  @Input() icon!: IconDefinition;
  @Input() buttonClass!: 'edit' | 'delete' | 'new';
  @Input() title = '';
  @Input() disableButton = false;

  constructor() { }

  ngOnInit(): void {

  }
}
