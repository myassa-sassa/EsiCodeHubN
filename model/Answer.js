
"use strict";

class Answer {
  constructor({ answer_id,question_id,esi_id,body,is_accepted}) {
    this.answer_id = answer_id;
   this.question_id = question_id;
this.esi_id=esi_id;
this.id_student_answered=id_student_answered;
this.title= title;
this.module_name=module_name;
this.language=language;
this.body=body;
this.is_accepted=is_accepted;
  }}


module.exports = Answer;