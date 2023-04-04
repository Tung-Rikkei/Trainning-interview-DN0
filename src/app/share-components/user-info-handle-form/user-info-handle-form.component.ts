import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-user-info-handle-form',
  templateUrl: './user-info-handle-form.component.html',
  styleUrls: ['./user-info-handle-form.component.scss']
})
export class UserInfoHandleFormComponent implements OnChanges {
  constructor(
    private fb: FormBuilder,
  ) { }

  @Input() type: string = ''
  @Input() formValue: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: new Date(),
    id: 0,
  }
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();

  loadingModal = false

  closeModal() {
    this.visible = false
    this.visibleChange.emit(false)
    this.userForm.reset();
  }

  submitForm() {

  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, new Date()) > 0;

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    password: ['', Validators.required,],
    firstName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    lastName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])],
    dob: new Date(),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.userForm.patchValue({
      username: changes['formValue'].currentValue?.username,
      password: changes['formValue'].currentValue?.password,
      firstName: changes['formValue'].currentValue?.firstName,
      lastName: changes['formValue'].currentValue?.lastName,
      email: changes['formValue'].currentValue?.email,
      dob: changes['formValue'].currentValue?.dob,
      id: changes['formValue'].currentValue?.id
    });
  }
}
