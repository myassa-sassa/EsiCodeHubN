
"use strict";

class Student {
  constructor({student_id,first_name,last_name,esi_id, email, password,registration_date,academic_year}) {
    this.student_id = student_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.esi_id=esi_id;
    this.email = email;
    this.password = password;
    this.registration_date=registration_date;
    //  Reset password
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
    this.academic_year = academic_year
  }
}






module.exports = Student;