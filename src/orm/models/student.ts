import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
/**
 * student Model
 * Auto-generated from table: student
 * Generated: 2025-08-17T07:16:55.969Z
 */
export interface studentAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  addressId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type studentPk = "id";
export type studentId = student[studentPk];
export type studentOptionalAttributes = "id" | "profileImage" | "addressId" | "createdAt" | "updatedAt";
export type studentCreationAttributes = Optional<studentAttributes, studentOptionalAttributes>;
export class student extends Model<studentAttributes, studentCreationAttributes> implements studentAttributes {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
  profileImage?: string;
  addressId?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Association methods will be added here
  // Example:
  // user!: User;
  // getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  // setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  // createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  static initModel(sequelize: Sequelize.Sequelize): typeof student {
    return student.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'address',
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
      tableName: 'student',
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
        },
        {
          name: "address_id",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "address_id" }
          ]
        }
      ]
    });
  }
     static associate(models: any) {
     const Student: typeof student = models.student;
     
     // Define associations here
     // Example:
     // Student.belongsTo(models.User, { foreignKey: "userId" });
     // models.User.hasMany(student, { foreignKey: "userId" });
   }
 }
 
 export default student;