import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Contact {
  name: string;
}

/**
 * @title Autocomplete validation example.
 */
@Component({
  selector: 'autocomplete-validation-example',
  templateUrl: 'autocomplete-validation-example.html',
  styleUrls: ['autocomplete-validation-example.css'],
})
export class AutocompleteValidationExample implements OnInit {
  phoneLabelOptions: string[] = [
    'Lakshay',
    'Kabir',
    'Mikin',
    'Umang',
    'Devesh',
  ];
  filteredPhoneLabelOptions: Observable<string[]>;
  phoneLabelAutocompleteControl: FormControl;

  validation_msgs = {
    phoneLabelAutocompleteControl: [
      {
        type: 'invalidAutocompleteString',
        message: 'name not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'Phone label is required.' },
    ],
  };

  ngOnInit() {
    this.phoneLabelAutocompleteControl = new FormControl('', {
      validators: [
        this.autocompleteStringValidator(this.phoneLabelOptions),
        Validators.required,
      ],
    });
    this.filteredPhoneLabelOptions =
      this.phoneLabelAutocompleteControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterPhoneLabels(value))
      );
  }

  private _filterPhoneLabels(label: string): string[] {
    if (label === '') {
      return this.phoneLabelOptions.slice();
    }
    const filterValue = label.toLowerCase();
    return this.phoneLabelOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (validOptions.indexOf(control.value) !== -1) {
        return null; /* valid option selected */
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
