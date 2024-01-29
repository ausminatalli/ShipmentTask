import { FieldErrors } from "react-hook-form";

interface InputError {
  error: {
    message: string;
  };
}
export function findInputError(errors: FieldErrors, name: string): InputError {
  const keys = Object.keys(errors);
  const filteredKeys = keys.filter((key) => key.includes(name));
  const filtered = filteredKeys.reduce((cur, key) => {
    return Object.assign(cur, { error: errors[key] });
  }, {} as InputError);

  return filtered;
}
