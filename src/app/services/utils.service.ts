import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({ providedIn:'root'})

export class UtilsService {
  constructor(){}

  markFormGroupTouched(form: FormGroup): void {
    (Object as any).values(form.controls).forEach( (control: any) => {
      control.markAsTouched();
      if(control.controls) {
        this.markFormGroupTouched(control);
      }
    })
  }
}
