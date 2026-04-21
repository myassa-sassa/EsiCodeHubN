
"use strict";

class User {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;

    //  Reset password
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
  }
}






module.exports = User;