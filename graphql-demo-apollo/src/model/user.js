import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:       {type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4},
        name:     {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
        login:    {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
        password: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        roles:    {type: DataTypes.STRING},
    },{
        // Disable audit record fields
        timestamps: false, createdAt:  false, updatedAt:  false, deletedAt:  false
    });

    User.beforeCreate(async user => {
        user.password = await user.generatePasswordHash();
    });

    User.prototype.generatePasswordHash = async function() {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    };

    User.prototype.validatePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
export default user;
