export const clearErrors = (form: HTMLFormElement): void => {
  for (const errorMsg of form.querySelectorAll(".error-text")) {
    errorMsg.remove();
  }
};
