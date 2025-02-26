export const validationObj = {
  fullName: {
    isString: {
      errorMessage: "Full Name Must Be A String"
    },
    isLength: {
      options: {
        min: 3
      },
      errorMessage: "Full Name Must Be Of At Least 3 Characters"
    }
  },
  email: {
    isEmail: {
      errorMessage: "Enter a valid email",
    },
    notEmpty: {
      errorMessage: "Email Must Not Be Empty",
    },
  },
  password: {
    isString: {
      errorMessage: "Password Must Be A String",
    },
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "Password Must Be At Least Of 6 characters",
    },
    notEmpty: {
      errorMessage: "Email Must Not Be Empty",
    },
  },
};
export const validationObj2 = {
  email: {
    isEmail: {
      errorMessage: "Enter a valid email",
    },
    notEmpty: {
      errorMessage: "Email Must Not Be Empty",
    },
  },
  password: {
    isString: {
      errorMessage: "Password Must Be A String",
    },
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "Password Must Be At Least Of 6 characters",
    },
    notEmpty: {
      errorMessage: "Email Must Not Be Empty",
    },
  },
};
