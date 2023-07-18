import {Component} from '@angular/core';
import {RouterService} from "../../../../../services/general/router.service";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../../../services/http/school/school.service";
import {SchoolEntity} from "../../../../../models/entity/school/school.entity";
import {AppRoute} from "../../../../../app.routes";
import {LocalStorageService} from "../../../../../services/general/local-storage.service";

@Component({
  selector: 'app-org-schools-view',
  templateUrl: './org-schools-view.component.html',
  styleUrls: ['./org-schools-view.component.css']
})
export class OrgSchoolsViewComponent {
  protected school?: SchoolEntity;
  protected readonly AppRoute = AppRoute;

  constructor(
    private _route: ActivatedRoute,
    private _routerService: RouterService,
    private _schoolService: SchoolService,
    private _localStorageService: LocalStorageService
  ) {
    this._routerService.route = _route;
    const schoolId = this._routerService.param<number>('id');
    this._schoolService.getById(schoolId).subscribe(res => this.school = res);
    this._localStorageService.set(`school_id`, schoolId);
    console.log(schoolId)
  }

  visitSchoolDashboardAction() {
    this._routerService.switchDashboard(`school`, true);
  }
}
