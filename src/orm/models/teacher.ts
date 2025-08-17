import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
/**
 * teacher Model
 * Auto-generated from table: teacher
 * Generated: 2025-08-17T07:17:42.650Z
 */
export interface teacherAttributes {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type teacherPk = "id";
export type teacherId = teacher[teacherPk];
export type teacherOptionalAttributes = "id" | "phone" | "createdAt" | "updatedAt";
export type teacherCreationAttributes = Optional<teacherAttributes, teacherOptionalAttributes>;
export class teacher extends Model<teacherAttributes, teacherCreationAttributes> implements teacherAttributes {
  id?: number;
  name!: string;
  email!: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Association methods will be added here
  // Example:
  // user!: User;
  // getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  // setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  // createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  static initModel(sequelize: Sequelize.Sequelize): typeof teacher {
    return teacher.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true
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
      tableName: 'teacher',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" }
          ]
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" }
          ]
        }
      ]
    });
  }
     static associate(models: any) {
     const Teacher: typeof teacher = models.teacher;
     
     // Define associations here
     // Example:
     // Teacher.belongsTo(models.User, { foreignKey: "userId" });
     // models.User.hasMany(teacher, { foreignKey: "userId" });
   }
 }
 
 export default teacher;