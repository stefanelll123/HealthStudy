import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const dateFormat = (format: string): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    const date = moment(control.value, format, true);

    if (date.isValid() || !control.value) {
      return null;
    }

    return { dateFormat: { value: control.value } };
  };
};
