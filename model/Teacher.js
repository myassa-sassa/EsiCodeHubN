
"use strict";

class Teacher {
  constructor({teacher_id,first_name,last_name, email, password,registration_date }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.teacher_id = teacher_id;
    this.email = email;
    this.password = password;
    this.registration_date=registration_date;


    //  Reset password
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
  }
}






module.exports = Teacher;