import {Component} from '@angular/core';
import {DataComponent} from "../../../component/data.component";
import {ClassLevelPayload} from "../../../../../models/payload/class-level.payload";
import {FilterComponent} from "../../../component/filter.component";
import {FormModel} from "../../../form/models/form/form.model";
import {ClassLevelFilter} from "../../../../../models/filter/class/class-level.filter";
import {FormControlModel, FormControlValue} from "../../../form/models/form/form-control.model";
import {OrganisationId, SchoolId} from "../../../../../services/general/local-storage.service";
import {ClassLevelService} from "../../../../../services/http/class-level/class-level.service";
import {SectionService} from "../../../../../services/http/school/section.service";
import {SchoolBaseFilter} from "../../../../../models/filter/base.filter";
import {SectionPayload} from "../../../../../models/payload/section.payload";

@Component({
  selector: 'app-table-list-classes',
  templateUrl: './table-list-classes.component.html',
  styleUrls: ['./table-list-classes.component.css']
})
export class TableListClassesComponent implements DataComponent<ClassLevelPayload[]>, FilterComponent {
  title = $localize `Classes`;
  data: ClassLevelPayload[] = [];
  filterForm: FormModel = ClassesFilterFormModel;
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
    this._classLevelService.get(this.filter).subscribe(res => this.data = res);
  }
}

const ClassesFilterFormModel = new FormModel(
  {
    formControls: [
      new FormControlModel({
        label:$localize `Name`,
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
