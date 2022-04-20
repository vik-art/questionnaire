import { FormControl } from "@angular/forms";
import { UserService } from "./services/user.service";

export class UserValidator {
    static userService: UserService;
    constructor(
    ) { }
   
    static existingEmail(control: FormControl): { [key: string]: boolean } {
        const emails = this.userService.getUsersEmails();
        if (emails!.includes(control.value)) {
            return {existingEmail: true};
        } else {
            return { existingEmail: false};
    }
    }
}
