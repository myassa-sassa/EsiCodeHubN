
"use strict";

class Admin {
  constructor({ first_name,last_name,admin_id, email, password }) {
    this.first_name = first_name;
        this.last_name = last_name;
this.admin_id=admin_id;
    this.email = email;
    this.password = password;

    //  Reset password
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
  }
}






module.exports = Admin;