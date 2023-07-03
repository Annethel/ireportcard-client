import {Component, OnInit} from '@angular/core';
import {FilterComponent} from "../../../../library/component/filter.component";
import {FormModel} from "../../../../library/form/models/form/form.model";
import {TableModel} from "../../../../library/crud/models/table.model";
import {ClassLevelFilter} from "../../../../../filter/class/class-level.filter";
import {OrganisationId, SchoolId} from "../../../../../services/general/local-storage.service";
import {FormControlModel, FormControlValue} from "../../../../library/form/models/form/form-control.model";
import {ClassLevelService} from "../../../../../services/class-level/class-level.service";
import {ClassLevelUtil} from "../../../../../utils/class-level.util";
import {SectionService} from "../../../../../services/school/section.service";
import {SchoolBaseFilter} from "../../../../../filter/base.filter";

@Component({
  selector: 'app-sch-classes',
  styleUrls: ['./sch-classes.component.css'],
  template: `
    <app-data-filter [formModel]="filterForm" (submitEvent)="filterAction($event)"></app-data-filter>
    <app-datatable *ngIf="table" [table]="table"></app-datatable>
  `
})
export class SchClassesComponent implements OnInit, FilterComponent {
  filterForm: FormModel = ClassesFilterFormModel;
  table?: TableModel;
  filter: ClassLevelFilter;

  private readonly sections: any[] = [];

  constructor(
    private _classLevelService: ClassLevelService,
    private _sectionService: SectionService,
  ) {
    this.filter = new ClassLevelFilter({
      schoolId: SchoolId!!,
      organisationId: OrganisationId
    });
    this.refresh();
  }

  ngOnInit() {
    this._sectionService.list(SchoolBaseFilter.simple()).subscribe(res => {
      this.sections.push(...res);
      this.filterForm.attribs.formControls[1].attribs.values = res.map(r => FormControlValue.of(r.section));
      console.log(this.sections);
    });
  }

  filterAction($event: any): void {
    this.filter.update($event);
    this.refresh();
  }

  refresh = () => {
    this._classLevelService.get(this.filter).subscribe(res => {
      this.table = ClassLevelUtil.createClassLevelTable(res);
    });
  }
}

const ClassesFilterFormModel = new FormModel(
  {
    formControls: [
      new FormControlModel({
        label: "Name",
        name: "name"
      }),
      new FormControlModel({
        label: "Section",
        name: "sectionId",
        type: "select",
        values: []
      }),
    ]
  }
);
