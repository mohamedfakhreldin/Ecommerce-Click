import React from "react";
import axios from "axios";
import { data } from "jquery";

/*
Default Name = Form Key
Default Type = Text
Default Class = form-control
*/
const UsersFormData = () => {
  return {
    name: {
      label: "Name"
    },
    email: {
      label: "Email",
      type: "email"
    },
    password: {
      label: "Password",
      type: "password"
    },
    passwordConfirm: {
      label: "Confirm Password",
      type: "password",
      name: "password_confirmation"
    }
  };
};
const AdminsFormData = () => {
  return {
    name: {
      label: "Name",

      class: "form-control"
    },
    email: {
      label: "Email",
      type: "email"
    },
    password: {
      label: "Password",
      type: "password",
      name: "password",
      class: "form-control"
    },
    passwordConfirm: {
      label: "Confirm Password",
      type: "password",
      name: "password_confirmation",
      class: "form-control"
    }
  };
};
const TrademarksFormData = () => {
  return {
    name: {
      label: "Name",

      class: "form-control"
    }
  };
};

const ColorsFormData = () => {
  return {
    color_name: {
      label: "Name",

      class: "form-control"
    },

    color_code: {
      label: "Color",
      type: "color"
    }
  };
};
const StoresFormData = () => {
  return {
    store_name: {
      label: "Store Name",

      class: "form-control"
    },
    location: {
      label: "Location"
    },
    phone_number: {
      label: "Phone Number"
    }
  };
};
const CategoriesFormData = () => {
  return {
    category_name: {
      label: "Category Name",

      class: "form-control"
    },
    category_id: {
      label: "Parent Category",
      name: "parent",
      type: "select",
      options: "parentOptions"
    },
    icon: {
      label: "icon",
      type: "file"
    }
  };
};
export {
  UsersFormData,
  AdminsFormData,
  TrademarksFormData,
  ColorsFormData,
  StoresFormData,
  CategoriesFormData
};
