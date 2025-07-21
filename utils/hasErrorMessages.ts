
export default function hasErrorMessages(obj: Record<string, any>): boolean {
    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'number' && value == 0) {
            continue;
        }

        if (typeof value === 'string' && value.trim().length > 0) {
            return true;
        }
    }

    return false;
}