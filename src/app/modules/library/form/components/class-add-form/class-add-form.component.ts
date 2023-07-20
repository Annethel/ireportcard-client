import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassLevelEntity } from 'src/app/models/entity/class-level/class-level.entity';
import { SubmitForm } from '../form/submit.form';

@Component({
  selector: 'app-class-add-form',
  templateUrl: './class-add-form.component.html',
  styleUrls: ['./class-add-form.component.css']
})
export class ClassAddFormComponent implements SubmitForm {
  title:string = $localize `Class Information`
  form:FormGroup
  @Input()
  editing: boolean = false;
  @Input()
  class?: ClassLevelEntity;
  
  @Output()
  submitEvent = new EventEmitter<ClassLevelEntity>();
  loading: boolean = false;

  
  constructor(private _fb: FormBuilder){
    this.form = this._fb.group({
      name: [this.class?.name ?? '', Validators.required],
      order: [this.class?.order ?? '', Validators.required],
      sectionId: [this.class?.sectionId]

     
    })
  }
 
  submit(): void {
    this.loading = true
    // this.submitEvent.emit(new ClassLevelEntity(this.form.value))
  }

  get buttonProperty() {
    return this.editing ? {label: 'Add Class', icon: 'pi pi-pencil'} : {label: 'Add Class', icon: 'pi pi-plus'}
  }
}
