const yup = require("yup");

class Validators {
  checkStringIsNull(string) {
    return string === null || string === undefined || string === "" ? true : false;
  }

  validateUserData(formObject) {
    const schema = yup.object().shape({
      username: yup.string().required(),
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      password: yup.string().required(),
    });

    return schema.isValid(formObject);
  }

  validateUsernameAndPassword(formObject) {
    const schema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    });

    return schema.isValid(formObject);
  }
}

module.exports = new Validators();
