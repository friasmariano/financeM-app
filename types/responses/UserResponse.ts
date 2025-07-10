import Person from "../Person";

export default interface UserResponse {
    id: number,
    username: string,
    person: Person
}