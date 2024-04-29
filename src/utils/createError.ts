export const createError = (
  input: React.RefObject<HTMLInputElement>,
  message: string
): void => {
  const div = document.createElement("div");
  div.innerHTML = message;
  div.style.color = "red";
  div.classList.add("error-text");
  input.current?.insertAdjacentElement("afterend", div);
};
