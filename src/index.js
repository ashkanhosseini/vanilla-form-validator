import "./styles.css";

const form = document.getElementById("my-form");

const validate = () => {
  let isValid = true;
  const isDirty = (element) => {
    return form.dataset.isDirty || element.dataset.isDirty;
  };

  const required = [...form.querySelectorAll("[required]")];

  required.forEach((element) => {
    if (!element.value) {
      isValid = false;
      if (isDirty(element)) {
        element.classList.add("invalid-required");
      }
    } else {
      element.classList.remove("invalid-required");
    }
  });
  // if (!isValid) return event.preventDefault();

  const email = form.querySelector('[name="email"]');
  if (/.+@.+\..+/.test(email.value)) {
    email.classList.remove("invalid");
    email.classList.remove("invalid-email");
  } else {
    isValid = false;
    if (isDirty(email)) {
      email.classList.add("invalid");
      email.classList.add("invalid-email");
    }
  }

  const pass = form.querySelector('[name="password"]');
  if (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm.test(
      pass.value
    )
  ) {
    pass.classList.remove("invalid");
    pass.classList.remove("invalid-password");
  } else {
    isValid = false;
    if (isDirty(pass)) {
      pass.classList.add("invalid");
      pass.classList.add("invalid-password");
    }
  }

  const repeat = form.querySelector('[name="repeatPassword"]');
  if (repeat.value !== pass.value) {
    isValid = false;
    if (isDirty(repeat)) {
      repeat.classList.add("invalid");
      repeat.classList.add("invalid-password");
    }
  } else {
    repeat.classList.remove("invalid");
    repeat.classList.remove("invalid-password");
  }

  return isValid;
};

form.onsubmit = function (event) {
  event.preventDefault();
  let isValid;
  form.isDirty = true;

  try {
    isValid = validate();
  } catch (error) {
    event.preventDefault();
    throw error;
  }

  if (!isValid) {
    event.preventDefault();
  }
  // return false;
};

form.addEventListener("change", (event) => {
  event.target.dataset["isDirty"] = true;
  console.log("on input xhang");
  validate(event);
});
