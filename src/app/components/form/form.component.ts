import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user.interface';
import { UserService } from 'src/app/services/user.service';
import  { UserValidator } from 'src/app/user-validator';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  versions!: Array<string>;
  showVersions: boolean = false;
  hobbie!: FormGroup;
  showHobbieField: boolean = false;

  technologies = ["Angular", "React", "Vue"];

  unSubscriber = new Subscription();

  constructor(
    private userService: UserService,
  ) { }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl("",
        [Validators.required
        ]),
      lastName: new FormControl("",
        [Validators.required
        ]),
      dateOfBirth: new FormControl(),
      technology: new FormGroup({
        framework: new FormControl("",
          Validators.required),
        frameworkVersion: new FormControl("",
          Validators.required)
      }),
      email: new FormControl("", [
        Validators.email,
        Validators.required
      ], [UserValidator.uniqueEmail]),
      hobbies: new FormArray([],
        [Validators.required,
        Validators.minLength(1)])
    })
    this.unSubscriber.add(
    this.form.valueChanges.subscribe(() => {}))
  }

  submit() {
    const { firstName, lastName, dateOfBirth, email, hobbies } = this.form.value;
    const { framework, frameworkVersion } = this.form.value.technology;
    const user: User = {
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString().replace(/\./g, '-'),
      framework,
      frameworkVersion,
      email,
      hobbies
    }
    this.userService.setUser(user);
    console.log(user)
    this.form.reset();
    this.versions = [];
    this.showVersions = false;
    this.showHobbieField = false;
  }

  setVersion() {
    this.showVersions = true;
    const frameworkVersion: {[key: string]: Array<string>} = {
      'Angular': ['1.1.1', '1.2.1', '1.3.3'],
      'React': ['2.1.2', '3.2.4', '4.3.1'],
      'Vue': ['3.3.1', '5.2.1', '5.1.3']
    }
    const framework = this.form.get("technology")?.get("framework")?.value;
    this.versions = frameworkVersion[framework];
  }


  addHobbie() {
    this.showHobbieField = true;
    this.hobbie = new FormGroup({
      name: new FormControl("", [Validators.required]),
      duration: new FormControl("", [Validators.required])
    });
    (this.form.get("hobbies") as FormArray).push(this.hobbie)
  }


  initControls() {
   return (this.form.get('hobbies') as FormArray).controls
  }

  removeContol(idx: number) {
    return (this.form.get("hobbies") as FormArray).removeAt(idx)
   }
}
