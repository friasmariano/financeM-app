
export function formatErrorMessages(
    errorsObject: Record<string, string> | string | object,
    updateFunction: React.Dispatch<React.SetStateAction<string[]>>): void
{
    const messages = Object.values(errorsObject);
    updateFunction(messages);
}