import Person from "@/types/Person";

export default interface User {
    id: number;
    username: string;
    person: Person | null;
}