import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
/**
 * courseTeacher Model
 * Auto-generated from table: courseTeacher
 * Generated: 2025-08-17T07:18:30.187Z
 */
export interface courseTeacherAttributes {
  id?: number;
  courseId: number;
  teacherId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type courseTeacherPk = "id";
export type courseTeacherId = courseTeacher[courseTeacherPk];
export type courseTeacherOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type courseTeacherCreationAttributes = Optional<courseTeacherAttributes, courseTeacherOptionalAttributes>;
export class courseTeacher extends Model<courseTeacherAttributes, courseTeacherCreationAttributes> implements courseTeacherAttributes {
  id?: number;
  courseId!: number;
  teacherId!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Association methods will be added here
  // Example:
  // user!: User;
  // getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  // setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  // createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  static initModel(sequelize: Sequelize.Sequelize): typeof courseTeacher {
    return courseTeacher.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teacher',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize,
      tableName: 'courseTeacher',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" }
          ]
        }
      ]
    });
  }
     static associate(models: any) {
     const CourseTeacher: typeof courseTeacher = models.courseTeacher;
     
     // Define associations here
     // Example:
     // CourseTeacher.belongsTo(models.User, { foreignKey: "userId" });
     // models.User.hasMany(courseTeacher, { foreignKey: "userId" });
   }
 }
 
 export default courseTeacher;