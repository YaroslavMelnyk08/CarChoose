const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Consumer = sequelize.define('Consumer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  first_name: {type: DataTypes.STRING,allowNull: false,},
  last_name: {type: DataTypes.STRING,allowNull: false,},
  patronymic: {type: DataTypes.STRING,allowNull: false,},
  email: {type: DataTypes.STRING,allowNull: false, unique: true},
  phone_number: {type: DataTypes.STRING,allowNull: false,},
  password: {type: DataTypes.STRING,allowNull: false,},
  role: {type: DataTypes.STRING,allowNull: false, defaultValue: 'USER'}
}, { timestamps: false });

const PaintCondition = sequelize.define('PaintCondition', {
  id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
  paint_condition_name: {type: DataTypes.STRING,allowNull: false,},
  paint_condition_description: {type: DataTypes.STRING(1000),allowNull: false,},

}, { timestamps: false });

const Car = sequelize.define('Car', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  make: {type: DataTypes.STRING},
  model: {type: DataTypes.STRING},
  generation: {type: DataTypes.STRING},
  year_from: {type: DataTypes.STRING},
  year_to: {type: DataTypes.STRING},
  series: {type: DataTypes.STRING},
  trim: {type: DataTypes.STRING},
  body_type: {type: DataTypes.STRING},
  number_of_seats: {type: DataTypes.STRING},
  engine_type: {type: DataTypes.STRING},
  capacity_cm3: {type: DataTypes.STRING},
  engine_hp: {type: DataTypes.STRING},
  drive_wheels: {type: DataTypes.STRING},
  number_of_gears: {type: DataTypes.STRING},
  transmission: {type: DataTypes.STRING}
}, { timestamps: false });

const Color = sequelize.define('Color', {
  id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
  color_name: {type: DataTypes.STRING,allowNull: false,},
}, { timestamps: false });

const Accident = sequelize.define('Accident', {
  id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
  accident_name: {type: DataTypes.STRING,allowNull: false,}
}, { timestamps: false });

const DrivenFrom = sequelize.define('DrivenFrom', {
  id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
  country_name: {type: DataTypes.STRING,allowNull: false,},
}, { timestamps: false });
  

const Ad = sequelize.define('Ad', {
  id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING(1000),allowNull: false,},
  description: {type: DataTypes.STRING(1000),allowNull: false,},
  year_of_manufacture: {type: DataTypes.STRING,allowNull: false,},
  mileage: {type: DataTypes.INTEGER,allowNull: false,},
  price: {type: DataTypes.INTEGER,allowNull: false,}
}, { timestamps: false });

const AdPhoto = sequelize.define('AdPhoto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file_name: { type: DataTypes.STRING, allowNull: false },
  AdId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Ads', key: 'id' } }
}, { timestamps: false });

Consumer.hasMany(Ad);
Ad.belongsTo(Consumer);

PaintCondition.hasMany(Ad);
Ad.belongsTo(PaintCondition);

Car.hasMany(Ad);
Ad.belongsTo(Car);

Color.hasMany(Ad);
Ad.belongsTo(Color);

Accident.hasMany(Ad);
Ad.belongsTo(Accident);

DrivenFrom.hasMany(Ad);
Ad.belongsTo(DrivenFrom);

Ad.hasMany(AdPhoto, { foreignKey: 'AdId', onDelete: 'CASCADE' });
AdPhoto.belongsTo(Ad, { foreignKey: 'AdId' });

module.exports = {Consumer, PaintCondition, Car, Color, Accident, DrivenFrom, Ad, AdPhoto};