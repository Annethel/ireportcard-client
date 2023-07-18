import {Component, OnInit} from '@angular/core';
import {FilterComponent} from "../../../../library/component/filter.component";
import {FormModel} from "../../../../library/form/models/form/form.model";
import {TableModel} from "../../../../library/crud/models/table.model";
import {ClassLevelFilter} from "../../../../../models/filter/class/class-level.filter";
import {OrganisationId, SchoolId} from "../../../../../services/general/local-storage.service";
import {FormControlModel, FormControlValue} from "../../../../library/form/models/form/form-control.model";
import {ClassLevelService} from "../../../../../services/http/class-level/class-level.service";
import {ClassLevelUtil} from "../../../../../utils/class-level.util";
import {SectionService} from "../../../../../services/http/school/section.service";
import {SchoolBaseFilter} from "../../../../../models/filter/base.filter";
import {SectionPayload} from "../../../../../models/payload/section.payload";

@Component({
  selector: 'app-sch-classes',
  styleUrls: ['./sch-classes.component.css'],
  template: `
    <app-table-list-classes></app-table-list-classes>
  `
})
export class SchClassesComponent implements OnInit, FilterComponent {
  filterForm: FormModel = ClassesFilterFormModel;
  table?: TableModel;
  filter: ClassLevelFilter;

  constructor(
    private _classLevelService: ClassLevelService,
    private _sectionService: SectionService,
  ) {
    this.filter = new ClassLevelFilter({
      schoolId: SchoolId()!!,
      organisationId: OrganisationId()
    });
    this.refresh();
  }

  ngOnInit() {
    this._sectionService.list(SchoolBaseFilter.simple()).subscribe(res => {
      this.filterForm.attribs.formControls[1].attribs.values =
        FormControlValue.ofArray(res, (s: SectionPayload) => s.section);
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
        label: $localize `Name`,
        name: "name"
      }),
      new FormControlModel({
        label:$localize `Section`,
        name: "sectionId",
        type: "select",
        values: []
      }),
    ]
  }
);
