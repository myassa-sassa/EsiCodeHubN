// test-upload.js
const { Submission } = require('./db/models');

async function test() {
  try {
    const submission = await Submission.create({
      student_id: 1,
      module_id: 1,
      content: "Test content",
      submission_type: "educational_sharing",
      status: "pending"
    });
    console.log("✅ Test réussi! ID:", submission.id);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
  process.exit();
}

test();