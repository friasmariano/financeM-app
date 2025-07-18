
export class DefaultFactory{
    static cloneOf<T>(defaultObject: T): T {
        return {...defaultObject }
    }
}