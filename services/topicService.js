import { sql } from "../database/database.js";

  const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;
  
    return rows;
  };

  const numOfTopics = async () => {
    const rows = await sql`SELECT COUNT(*) FROM topics`;
  
    return rows[0];
  };

  const addTopic = async (userId, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
  };

  const deleteTopic = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`
    await sql`DELETE FROM questions WHERE topic_id = ${id}`
    await sql`DELETE FROM topics WHERE id = ${id}`;
  };

export {listTopics, addTopic, deleteTopic, numOfTopics}