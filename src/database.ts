import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    // Associations
    public readonly accesses?: Access[];

    public static associations: {
        accesses: Association<User, Access>;
    };

    public static initialize(sequelize: Sequelize): void {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "users",
            timestamps: false,
        });
    }

    public static associate(models: any): void {
        User.hasMany(models.Access, {
            foreignKey: "id_user",
            as: "accesses",
        });
    }
}

interface UrlAttributes {
    id: number;
    url: string;
    url_horted: string;
    access_times: number;
    created_at: Date;
}

interface UrlCreationAttributes
    extends Optional<UrlAttributes, "id" | "access_times" | "created_at"> {}

export class Url extends Model<UrlAttributes, UrlCreationAttributes>
    implements UrlAttributes {
    public id!: number;
    public url!: string;
    public url_horted!: string;
    public access_times!: number;
    public created_at!: Date;

    // Associations
    public readonly accesses?: Access[];

    public static associations: {
        accesses: Association<Url, Access>;
    };

    public static initialize(sequelize: Sequelize): void {
        Url.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            url: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            url_horted: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            access_times: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        }, {
            sequelize,
            tableName: "urls",
            timestamps: false,
        });
    }

    public static associate(models: any): void {
        Url.hasMany(models.Access, {
            foreignKey: "id_url",
            as: "accesses",
        });
    }
}

interface AccessAttributes {
    id: number;
    id_url: number;
    id_user: number;
    timestamp: Date;
    location: string | null;
}

interface AccessCreationAttributes
    extends Optional<AccessAttributes, "id" | "timestamp" | "location"> {}

export class Access extends Model<AccessAttributes, AccessCreationAttributes>
    implements AccessAttributes {
    public id!: number;
    public id_url!: number;
    public id_user!: number;
    public timestamp!: Date;
    public location!: string | null;

    // Associations
    public readonly url?: Url;
    public readonly user?: User;

    public static associations: {
        url: Association<Access, Url>;
        user: Association<Access, User>;
    };

    public static initialize(sequelize: Sequelize): void {
        Access.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_url: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "urls",
                    key: "id",
                },
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            timestamp: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: "access",
            timestamps: false,
        });
    }

    public static associate(models: any): void {
        Access.belongsTo(models.Url, {
            foreignKey: "id_url",
            as: "url",
        });
        Access.belongsTo(models.User, {
            foreignKey: "id_user",
            as: "user",
        });
    }
}

interface Config {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
    [key: string]: any;
}

interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    User: typeof User;
    Url: typeof Url;
    Access: typeof Access;
}

const env: string = process.env.NODE_ENV || "development";

const db: DB = {
    sequelize: new Sequelize({
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
    }),
    Sequelize,
    User,
    Url,
    Access,
};

User.initialize(db.sequelize);
Url.initialize(db.sequelize);
Access.initialize(db.sequelize);

User.associate(db);
Url.associate(db);
Access.associate(db);

export default db;
