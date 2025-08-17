// ORM Migrations and Relations Solutions
// Task 1: Student-Address Management (One-to-One)
student.hasOne(address, {
  foreignKey: 'student_id',
  as: 'address',
  onDelete: 'CASCADE'
});
address.belongsTo(student, {
  foreignKey: 'student_id',
  as: 'student'
});
// ==========================
// Task 2: Course Management (One-to-Many)
// ==========================
// Migration: Add teacher_id to course table
await queryInterface.addColumn('course', 'teacher_id', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'teacher',
    key: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
// Model Relations:
teacher.hasMany(course, {
  foreignKey: 'teacher_id',
  as: 'courses'
});
course.belongsTo(teacher, {
  foreignKey: 'teacher_id',
  as: 'teacher'
});
// ==========================
// Task 3: Enrollment Management (Explicit Many-to-Many)
// ==========================
// Migration: Create enrollment table
// Model Relations:
student.belongsToMany(course, {
  through: 'enrollment',
  foreignKey: 'student_id',
  otherKey: 'course_id',
  as: 'enrolledCourses'
});
course.belongsToMany(student, {
  through: 'enrollment',
  foreignKey: 'course_id',
  otherKey: 'student_id',
  as: 'enrolledStudents'
});
enrollment.belongsTo(student, { foreignKey: 'student_id' });
enrollment.belongsTo(course, { foreignKey: 'course_id' });
student.hasMany(enrollment, { foreignKey: 'student_id' });
course.hasMany(enrollment, { foreignKey: 'course_id' });
// ==========================
// Task 4: Course-Teacher Management (Implicit Many-to-Many)
// ==========================
// Model Relations:
teacher.belongsToMany(course, {
  through: 'courseTeacher',
  foreignKey: 'teacher_id',
  otherKey: 'course_id',
  as: 'courses'
});
course.belongsToMany(teacher, {
  through: 'courseTeacher',
  foreignKey: 'course_id',
  otherKey: 'teacher_id',
  as: 'teachers'
});
// ==========================
// Task 5: Database Constraints & Validations
// ==========================
// Email in User (Student & Teacher) must be unique
// (Already handled in migrations for student and teacher tables)
await queryInterface.addIndex('student', ['email'], {
  unique: true,
  name: 'student_email_unique'
});
await queryInterface.addIndex('teacher', ['email'], {
  unique: true,
  name: 'teacher_email_unique'
});
// Course fee cannot be less than 0
// (Add check constraint in course migration)
await queryInterface.sequelize.query(
  'ALTER TABLE "course" ADD CONSTRAINT course_fee_nonnegative CHECK (fee >= 0);'
);
// Enrollment date should be automatically set during enrollment
// (Handled by defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') in enrollment table)
// The same student cannot enroll in the same course more than once
// (Handled by unique constraint on ['student_id', 'course_id'] in enrollment table)
// ==========================
// Task 6: Hooks and Middleware
// ==========================
// Sequelize Hooks (in model definitions):
// 1. Auto-set enrollmentDate for Enrollment records (if not set)
enrollment.beforeCreate((enroll, options) => {
  if (!enroll.enrollment_date) {
    enroll.enrollment_date = new Date();
  }
});
// 2. Hash user password before saving (for student and teacher)
const bcrypt = require('bcrypt');
student.beforeCreate(async (user, options) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
student.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
teacher.beforeCreate(async (user, options) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
teacher.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
// Express Middleware (in your Express app):
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});
// Validation middleware example (using express-validator or custom)
const { body, validationResult } = require('express-validator');
app.post('/students', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  // ...other validations
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});