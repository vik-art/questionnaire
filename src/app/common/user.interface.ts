export interface User {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    framework: string,
    frameworkVersion: string,
    email: string,
    hobbies: Array<Hobbie>
}

export interface Hobbie {
    name: string,
    duration: string
}