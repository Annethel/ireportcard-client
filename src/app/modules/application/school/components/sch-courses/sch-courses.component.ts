import {Component, OnInit} from '@angular/core';
import {FilterComponent} from "../../../../library/component/filter.component";
import {SubjectFilter} from "../../../../../models/filter/subject/subject.filter";
import {FormModel} from "../../../../library/form/models/form/form.model";
import {TableModel} from "../../../../library/crud/models/table.model";
import {SubjectService} from "../../../../../services/http/subject/subject.service";
import {SubjectUtil} from "../../../../../utils/subject.util";
import {DepartmentService} from "../../../../../services/http/subject/department.service";
import {FormControlModel, FormControlValue} from "../../../../library/form/models/form/form-control.model";
import {SchoolBaseFilter} from "../../../../../models/filter/base.filter";
import {DepartmentPayload} from "../../../../../models/payload/department.payload";

@Component({
  selector: 'app-sch-courses',
  styleUrls: ['./sch-courses.component.css'],
  template: `
    <app-data-filter [formModel]="filterForm" (submitEvent)="filterAction($event)"></app-data-filter>
    <app-datatable *ngIf="table" [table]="table"></app-datatable>
  `
})
export class SchCoursesComponent implements OnInit, FilterComponent {
  filter: SubjectFilter = new SubjectFilter({});
  filterForm: FormModel = SubjectFilterFormModel;
  table?: TableModel;

  constructor(
    private _subjectService: SubjectService,
    private _departmentService: DepartmentService
  ) {
  }

  ngOnInit(): void {
    this._departmentService.list(SchoolBaseFilter.simple()).subscribe(res => {
      this.filterForm.attribs.formControls[1].attribs.values =
        FormControlValue.ofArray(res, (d: DepartmentPayload) => d.department);
    });
    this.refresh();
  }

  filterAction($event: any): void {
    this.filter.update($event);
    this.refresh();
  }

  refresh = () => {
    this._subjectService.list(this.filter).subscribe(res => {
      this.table = SubjectUtil.createSubjectTable(res);
    });
  }
}

const SubjectFilterFormModel = new FormModel({
  formControls: [
    new FormControlModel({
      label:$localize `Name`,
      name: "name"
    }),
    new FormControlModel({
      label:$localize `Department`,
      name: "departmentId",
      type: "select",
      values: []
    }),
  ]
});
