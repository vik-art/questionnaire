import { Injectable } from "@angular/core";
import { User } from "../common/user.interface";

@Injectable()

export class UserService {
    users: Array<User> = [];

    setUser(user: User) {
        this.users.push(user);
        return this.users;
    }

}