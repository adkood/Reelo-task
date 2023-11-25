const db = require("../db");

class Ques {
  constructor(question_text, subject, topic, difficulty, marks) {
    this.question_text = question_text;
    this.subject = subject;
    this.topic = topic;
    this.difficulty = difficulty;
    this.marks = marks;
  }

  async save() {
    try {
      let sql = `insert into ques (question_text,subject,topic,difficulty,marks) 
          values('${this.question_text}','${this.subject}','${this.topic}','${this.difficulty}','${this.marks}')`;
      const [res, fields] = await db.query(sql);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async findAll(difficulty, selectedSub) {
    try {
      let sql = `SELECT * FROM ques where LOWER(difficulty) = LOWER('${difficulty}') AND LOWER(subject) = LOWER('${selectedSub}')`;
      const [res, fields] = await db.query(sql);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = Ques;
