const author = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        id:         {type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4},
        name:       {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
        biography:  {type: DataTypes.TEXT},
    },{
        // Disable audit record fields
        timestamps: false, createdAt:  false, updatedAt:  false, deletedAt:  false
    });

    Author.associate = models => {
        Author.hasMany(models.Book, {foreignKey: 'authorId', onDelete: 'cascade' });
    };
    return Author;
};
export default author;
