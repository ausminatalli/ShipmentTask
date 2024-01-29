
interface InputError {
  error: {
    message: string;
  };
}

export const isFormInvalid = (err: InputError) => {
  if (err && err.error) {
    return true;
  }
  return false;
};
