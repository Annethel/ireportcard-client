import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormModel} from "../../../form/models/form/form.model";
import {FormControlAttributes} from "../../../form/models/form/form-control.model";
import {ObjectUtil} from "../../../../../utils/object.util";
import {SubmitForm} from "../../../form/components/form/submit.form";

@Component({
  selector: 'app-data-filter',
  styleUrls: ['./datafilter.component.css'],
  template: `
    <div class="p-2">
      <p-toggleButton
        [(ngModel)]="filterHidden"
        class="p-button-sm p-button-raised"
        onLabel="Filter"
        offLabel="Filter"
        iconPos="right"
        onIcon="fas fa-light fa-chevron-up"
        offIcon="fas fa-light fa-chevron-down">
      </p-toggleButton>
      <div *ngIf="filterHidden" class="py-4">
        <form class="formgrid grid" [formGroup]="form">
          <div *ngFor="let control of formControlModels" class="col-12 md:col-4 field">
            <input
              *ngIf="control.type == 'text' || control.type == undefined"
              pInputText
              [placeholder]="control.label"
              (change)="submit()"
              formControlName="{{control.name}}"
              id="{{control.name}}"
              class="w-full p-inputtext-sm">
            <p-dropdown
              *ngIf="control.type == 'select'"
              formControlName="{{control.name}}"
              id="{{control.name}}"
              styleClass="w-full p-inputtext-sm"
              (onChange)="submit()"
              [placeholder]="control.label"
              [options]="controlOptions(control)"
              [optionValue]="'id'"
              [optionLabel]="'name'">
            </p-dropdown>
          </div>
          <div class="text-center gap-2 col-12">
            <button type="submit" class="btn btn-primary" (click)="submit()" i18n>Filter</button>&nbsp;
            <button type="reset" class="btn btn-secondary" (click)="form.reset()" i18n>Reset</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class DatafilterComponent implements OnInit, SubmitForm {
  @Input()
  formModel: FormModel = FormModel.empty();

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter<any>();

  formControlModels: FormControlAttributes[] = [];
  form: FormGroup = this._fb.group({});
  filterHidden: boolean = false;
  private controls: [string, any][] = [];

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.formControlModels = this.formModel.attribs.formControls.map(v => v.attribs) ?? [];
    this.controls = this.formControlModels.map(value => [value.name, []]);
    this.form = this._fb.group(ObjectUtil.from(this.controls));
  }

  submit() {
    this.submitEvent.emit(this.form.value);
  }

  controlOptions = (control: FormControlAttributes) => control.values?.map(v => {
    return {id: v.id, name: v.name}
  });
}


