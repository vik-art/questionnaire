import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;

  technologies = [
    { name: "Angular" },
    { name: "React" },
    { name: "Vue" }
  ]

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
      framework: new FormControl("", [Validators.required])
    })
    this.form.valueChanges.subscribe(() => {})
  }

  submit() {
    console.log(this.form.value)
  }

}
