import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-class-add-form',
  templateUrl: './class-add-form.component.html',
  styleUrls: ['./class-add-form.component.css']
})
export class ClassAddFormComponent {
  title:string = 'Class Information'
  form:FormGroup

}
