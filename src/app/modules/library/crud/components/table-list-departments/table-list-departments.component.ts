import {Component, OnInit} from '@angular/core';
import {DataComponent} from "../../../component/data.component";
import {DepartmentPayload} from "../../../../../models/payload/department.payload";
import {FilterComponent} from "../../../component/filter.component";
import {FormModel} from "../../../form/models/form/form.model";
import {DepartmentFilter} from "../../../../../models/filter/subject/department.filter";
import {FormControlModel} from "../../../form/models/form/form-control.model";
import {DepartmentService} from "../../../../../services/http/subject/department.service";
import {UserService} from "../../../../../services/http/user/user.service";

@Component({
  selector: 'app-table-list-departments',
  templateUrl: './table-list-departments.component.html',
  styleUrls: ['./table-list-departments.component.css']
})
export class TableListDepartmentsComponent
  implements DataComponent<DepartmentPayload[]>, FilterComponent, OnInit {
  data: DepartmentPayload[] = [];
  filter: DepartmentFilter = new DepartmentFilter({});
  filterForm: FormModel = DepartmentFilterFormModel;
  title: string =$localize `Departments`;

  constructor(
    private _departmentService: DepartmentService,
    private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  filterAction($event: any): void {
    this.filter.update($event);
    this.refresh();
  }

  refresh = () => {
    this._departmentService.list(this.filter).subscribe(res => this.data = res);
  }

  getUser(userId: number | null) {
    if (userId != null) {
      return this._userService.getById(userId)
    }
    return undefined;
  }
}

const DepartmentFilterFormModel = new FormModel(
  {
    formControls: [
      new FormControlModel({
        label:$localize `Name`,
        name: "name"
      }),
    ]
  }
);
