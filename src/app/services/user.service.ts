import { Injectable } from "@angular/core";
import { User } from "../common/user.interface";

@Injectable()

export class UserService {
    users: Array<User> = [];

    setUser(user: User) {
        this.users.push(user);
        return this.users;
    } 

    getUsersEmails() {
        if (this.users.length) {
            const emails: Array<string> = [];
            this.users.map((user) => {
                emails.push(user.email)
            })
            return emails;
        } else {
            return null;
        }
    }
}