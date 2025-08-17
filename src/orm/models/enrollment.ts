import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
/**
 * enrollment Model
 * Auto-generated from table: enrollment
 * Generated: 2025-08-17T07:17:21.420Z
 */
export interface enrollmentAttributes {
  id?: number;
  studentId: number;
  courseId: number;
  enrollmentDate?: Date;
  status?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
export type enrollmentPk = "id";
export type enrollmentId = enrollment[enrollmentPk];
export type enrollmentOptionalAttributes = "id" | "enrollmentDate" | "status" | "createdAt" | "updatedAt";
export type enrollmentCreationAttributes = Optional<enrollmentAttributes, enrollmentOptionalAttributes>;
export class enrollment extends Model<enrollmentAttributes, enrollmentCreationAttributes> implements enrollmentAttributes {
  id?: number;
  studentId!: number;
  courseId!: number;
  enrollmentDate?: Date;
  status?: any;
  createdAt?: Date;
  updatedAt?: Date;

  // Association methods will be added here
  // Example:
  // user!: User;
  // getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  // setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  // createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  static initModel(sequelize: Sequelize.Sequelize): typeof enrollment {
    return enrollment.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'student',
          key: 'id'
        }
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Active::enum_enrollment_status"
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
      tableName: 'enrollment',
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
     const Enrollment: typeof enrollment = models.enrollment;
     
     // Define associations here
     // Example:
     // Enrollment.belongsTo(models.User, { foreignKey: "userId" });
     // models.User.hasMany(enrollment, { foreignKey: "userId" });
   }
 }
 
 export default enrollment;