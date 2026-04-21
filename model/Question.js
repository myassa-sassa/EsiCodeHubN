
"use strict";

class Question{
  constructor({question_id,esi_id,course_id,module_name,title,body,is_resolved,question_date}) {
    this.question_id = question_id;
        this.esi_id = esi_id;
this.course_id=course_id;
this.module_name=module_name;
    this.title =title;
    this.body = body;
    this.language = language;
this.is_resolved=is_resolved;
this.question_date=question_date;
 
  }
}






module.exports = Question;