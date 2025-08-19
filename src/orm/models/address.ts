import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
/**
 * address Model
 * Auto-generated from table: address
 * Generated: 2025-08-17T07:16:47.822Z
 */
export interface addressAttributes {
  id?: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type addressPk = "id";
export type addressId = address[addressPk];
export type addressOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type addressCreationAttributes = Optional<addressAttributes, addressOptionalAttributes>;
export class address extends Model<addressAttributes, addressCreationAttributes> implements addressAttributes {
  id?: number;
  street!: string;
  city!: string;
  state!: string;
  zipCode!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Association methods will be added here
  // Example:
  // user!: User;
  // getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  // setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  // createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      street: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING(50),
        allowNull: false
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
      tableName: 'address',
      timestamps: false,
    });
  }
     static associate(models: any) {
     const Address: typeof address = models.address;
     
     // Define associations here
     // Example:
     // Address.belongsTo(models.User, { foreignKey: "userId" });
     // models.User.hasMany(address, { foreignKey: "userId" });
   }
 }
 
 export default address;