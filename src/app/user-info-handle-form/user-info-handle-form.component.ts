import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-handle-form',
  templateUrl: './user-info-handle-form.component.html',
  styleUrls: ['./user-info-handle-form.component.scss']
})
export class UserInfoHandleFormComponent {
  @Input() type: string = ''
  @Input() visible: boolean = false
}
