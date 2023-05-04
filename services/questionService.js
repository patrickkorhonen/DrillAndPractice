import { sql } from "../database/database.js";

const listQuestions = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE ${topicId} = topic_id`;
  
    return rows;
  };

  const numOfQuestions = async () => {
    const rows = await sql`SELECT COUNT(*) FROM questions`;
  
    return rows[0];
  };

  const numOfAnswers = async () => {
    const rows = await sql`SELECT COUNT(*) FROM question_answers`;
  
    return rows[0];
  };

  const showQuestion = async (questionId) => {
    const rows = await sql`SELECT * FROM questions WHERE ${questionId} = id`;
  
    return rows[0];
  };

  const randomQuestion = async () => {
    const rows = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
  
    return rows[0];
  };

  const addQuestion = async (userId, topicId, question) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${question})`;
  };

  const storeAnswer = async (userId, questionId, optionId) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${optionId})`;
  };

  const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id}`
  };




export {numOfAnswers, numOfQuestions, listQuestions, addQuestion, showQuestion, deleteQuestion, storeAnswer, randomQuestion}