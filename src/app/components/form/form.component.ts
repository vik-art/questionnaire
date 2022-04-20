import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

  form!: FormGroup;
  versions!: Array<string>;

  technologies = ["Angular", "React", "Vue"];

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl(),
      technology: new FormGroup({
        framework: new FormControl("", Validators.required),
        frameworkVersion: new FormControl("", Validators.required)
      }),
      email: new FormControl("", [Validators.email, Validators.required]),
      hobbies: new FormArray([], [Validators.required, Validators.minLength(1)])
    })
    this.form.valueChanges.subscribe(() => {})
  }

  submit() {
    const { firstName, lastName, dateOfBirth, email, hobbies } = this.form.value;
    const { framework, frameworkVersion } = this.form.value.technology;
    const user = {
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString().replace(/\./g, '-'),
      framework,
      frameworkVersion,
      email,
      hobbies
    }
    console.log(user);
    this.form.reset();
    return user;
  }

  setVersion() {
    const frameworkVersion: {[key: string]: Array<string>} = {
      'Angular': ['1.1.1', '1.2.1', '1.3.3'],
      'React': ['2.1.2', '3.2.4', '4.3.1'],
      'Vue': ['3.3.1', '5.2.1', '5.1.3']
    }
    const framework = this.form.get("technology")?.get("framework")?.value;
    this.versions = frameworkVersion[framework];
  }
  addHobbie() {
    const control = new FormControl("", [Validators.required]);
    (this.form.get("hobbies") as FormArray).push(control)
  }
  initControls() {
   return (this.form.get('hobbies') as FormArray).controls
  }
}
