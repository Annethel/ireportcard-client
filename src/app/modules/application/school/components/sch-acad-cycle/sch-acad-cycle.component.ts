import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dateToISO, today, todayYear} from "../../../../../utils/date.util";
import {AcademicCyclePayload} from "../../../../../models/payload/academic-cycle.payload";
import {AcademicCycleService} from "../../../../../services/http/academic-cycle/academic-cycle.service";
import {IsNotUndefined, IsUndefined} from "../../../../../utils/base.util";

@Component({
  selector: 'app-sch-acad-cycle',
  templateUrl: './sch-acad-cycle.component.html',
  styleUrls: ['./sch-acad-cycle.component.css']
})
export class SchAcadCycleComponent implements OnInit {
  form: FormGroup;
  academicCyclePayload?: AcademicCyclePayload;

  constructor(
    private _fb: FormBuilder,
    private _academicCycleService: AcademicCycleService
  ) {
    this.form = this._fb.group({
      startYear: [todayYear(), Validators.required],
      endYear: [{value: todayYear() + 1, disabled: true}, Validators.required],
      openingDate: [today(), Validators.required],
      closingDate: [],
    });
  }

  ngOnInit() {
    this._academicCycleService.currentCycle().subscribe(this.patch);
  }

  endYearValue = () => {
    const startYear = (this.form.get('startYear')?.value ?? 0);
    if (!isNaN(startYear)) {
      return parseInt(startYear) + 1;
    } else {
      return 0;
    }
  }

  submit() {
    const academicCyclePayload: AcademicCyclePayload = {
      year: {
        startYear: this.form.get('startYear')?.value,
        cycleInfo: {
          openingDate: this.form.get('openingDate')?.value,
          closingDate: this.form.get('closingDate')?.value,
        }
      }
    }
    this._academicCycleService.launch(academicCyclePayload).subscribe(() => {
      this._academicCycleService.currentCycle().subscribe(this.patch);
    });
  }

  cycleActionButton() {
    return {
      disabled:
        IsNotUndefined(this.academicCyclePayload) &&
        IsNotUndefined(this.academicCyclePayload?.year.cycleInfo.closingDate),
      text: IsUndefined(this.academicCyclePayload) ? $localize `Launch Cycle` : $localize `Close Cycle`,
      action: IsUndefined(this.academicCyclePayload) ?
        this.submit : () => {
        }
    }
  }

  private patch = (payload: AcademicCyclePayload) => {
    this.academicCyclePayload = payload;
    this.form.patchValue({
      startYear: payload.year.startYear,
      endYear: payload.year.endYear,
      openingDate: dateToISO(payload.year.cycleInfo.openingDate),
      closingDate: dateToISO(payload.year.cycleInfo.closingDate),
    });
  }
}
