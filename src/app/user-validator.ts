import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export class UserValidator {
 static uniqueEmail( control: AbstractControl ): Promise<any> | Observable<any> {
   return new Promise(resolve => {     
       setTimeout(() => {
         if (control.value === 'test@test.test') {
           resolve({
             repeatedEmail: true
           })
         } else {
           resolve(null)
         }
       }, 2000)
     }
   )
  }
}