import { sql } from "../database/database.js";

const listOptions = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE ${questionId} = question_id`;
  
    return rows;
  };

const correctOrNot = async (id) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE ${id} = id`;

  return rows[0];
};

const addOption = async (questionId, option_text, correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${option_text}, ${correct})`;
  };

const removeOption = async (id) => {
  await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id}`
  await sql`DELETE FROM question_answer_options WHERE id = ${id}`
};

const answer = async (id) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${id} AND is_correct = true`

  return rows[0];
}

export {listOptions, correctOrNot, addOption, removeOption, answer}