# ORM Migrations and Relations Solutions
## TASK 1: Student-Address Management (One-to-One)
// One-to-One relationship between Student and Address
student.hasOne(address, {
  foreignKey: 'student_id',
  as: 'address',
  onDelete: 'CASCADE',
});
address.belongsTo(student, {
  foreignKey: 'student_id',
  as: 'student',
});
## TASK 2: Course Management (One-to-Many)
// Allow teachers to create and manage courses.
await queryInterface.addColumn('course', 'teacher_id', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'teacher',
    key: 'id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
// One-to-Many relationship between Teacher and Course
teacher.hasMany(course, {
  foreignKey: 'teacher_id',
  as: 'courses',
});
course.belongsTo(teacher, {
  foreignKey: 'teacher_id',
  as: 'teacher',
});
## TASK 3: Enrollment Management (Explicit Many-to-Many)
// Many-to-Many relationship between Student and Course
student.belongsToMany(course, {
  through: 'enrollment',
  foreignKey: 'student_id',
  otherKey: 'course_id',
  as: 'enrolled_courses',
});
course.belongsToMany(student, {
  through: 'enrollment',
  foreignKey: 'course_id',
  otherKey: 'student_id',
  as: 'enrolled_students',
});
## TASK 4: Course-Teacher Management (Implicit Many-to-Many)
// Many-to-Many relationship between Teacher and Course
teacher.belongsToMany(course, {
  through: 'courseTeacher',
  foreignKey: 'teacher_id',
  otherKey: 'course_id',
  as: 'courses',
});
course.belongsToMany(teacher, {
  through: 'courseTeacher',
  foreignKey: 'course_id',
  otherKey: 'teacher_id',
  as: 'teachers',
});
TASK 5: Database Constraints & Validations
// Email in User (Student & Teacher) must be unique.
await queryInterface.addIndex('student', ['email'], {
  unique: true,
  name: 'student_email_unique',
});
await queryInterface.addIndex('teacher', ['email'], {
  unique: true,
  name: 'teacher_email_unique',
});
// Course fee cannot be less than 0.
await queryInterface.addConstraint('course', {
  fields: ['fee'],
  type: 'check',
  where: {
    fee: { [Sequelize.Op.gte]: 0 },
  }
});
// Enrollment date should be automatically set during enrollment.
enrollment_date: {
  type: Sequelize.DATE,
  allowNull: false,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  comment: 'Enrollment date, auto-set on creation',
}
// The same student cannot enroll in the same course more than once.
await queryInterface.addConstraint('enrollment', {
  fields: ['student_id', 'course_id'],
  type: 'unique',
  name: 'unique_student_course_enrollment',
});
## TASK 6: Hooks and Middleware
// Sequelize Hooks
// 1. Auto-set enrollmentDate for Enrollment records.
enrollment.beforeCreate((enroll, options) => {
  if (!enroll.enrollment_date) {
    enroll.enrollment_date = new Date();
  }
});
// 2. Hash user password before saving.
const bcrypt = require('bcrypt');
student.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
teacher.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
// Use Express Middleware for: Error handling and validation.
const Student = sequelize.define('Student', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (student, options) => {
      const existingStudent = await Student.findOne({ where: { email: student.email } });
      if (existingStudent) throw new Error('Student email already exists');
    },
  },
});
