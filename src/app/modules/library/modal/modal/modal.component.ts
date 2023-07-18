import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.css'],
  template: `
    <div #modalDiv class="modal fade {{toggle ? 'modal':''}}" tabindex="-1" role="dialog" [attr.aria-hidden]="toggle">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" i18n>{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" i18n>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div *ngIf="content" [innerHTML]="content"></div>
          </div>
          <div class="modal-footer">
            <button *ngIf="cancelButton" (click)="cancelAction()" type="button" class="btn btn-secondary" data-dismiss="modal" i18n>{{cancelButton}}</button>
            <button *ngIf="okButton" (click)="okAction()" type="button" class="btn btn-primary" i18n>{{okButton}}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() content?: HTMLElement;
  @Input() okButton?: string;
  @Input() cancelButton?: string;
  @Input() toggle: boolean = false;
  @ViewChild("modalDiv") modal!: HTMLDivElement;

  ngOnInit() {
    console.log(this.modal)
    console.log(this.content)
  }

  okAction() {
    this.toggle = false;
  }

  cancelAction() {
    this.toggle = false;
  }
}
