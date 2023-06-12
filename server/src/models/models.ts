import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

interface IUser extends Model {
    id: number;
    email: string;
    password: string;
    role: string;
    isActivated: boolean;
    activationLink: string;
}

interface IRefreshToken extends Model {
    id: number;
    userId: number;
    refreshToken: string;
    ip: string;
    role: string;
}

interface IBasket extends Model {
    id: number;
}

interface IBasketDevice extends Model {
    id: number;
    basketId: number;
    deviceId: number;
}

interface IDevice extends Model {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
}

interface IType extends Model {
    id: number;
    name: string;
}

interface IBrand extends Model {
    id: number;
    name: string;
}
interface IRating extends Model {
    id: number;
    rate: number;
}
interface IDeviceInfo extends Model {
    id: number;
    titile: string;
}
interface ITypeBrand extends Model {
    id: number;
}

const User = sequelize.define<IUser>("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING, defaultValue: "USER" },
});

const RefreshToken = sequelize.define<IRefreshToken>("refresh_tokens", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING, unique: true },
    ip: { type: DataTypes.STRING, allowNull: false },
});

const Basket = sequelize.define<IBasket>("baskets", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define<IBasketDevice>("basket_devices", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define<IDevice>("devices", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define<IType>("types", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define<IBrand>("brands", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define<IRating>("ratings", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, unique: true, allowNull: false },
});

const DeviceInfo = sequelize.define<IDeviceInfo>("device_infos", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titile: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const TypeBrand = sequelize.define<ITypeBrand>("type_brands", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(RefreshToken);
RefreshToken.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export default {
    User,
    RefreshToken,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand,
};