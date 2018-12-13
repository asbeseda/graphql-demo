const book = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id:             {type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4},
        authorId:       {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        releaseDate:    {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        title:          {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
        description:    {type: DataTypes.TEXT},
    },{
        // Disable audit record fields
        timestamps: false, createdAt:  false, updatedAt:  false, deletedAt:  false
    });

    Book.associate = models => {
        Book.belongsTo(models.Author, {foreignKey: 'authorId'});
        Book.hasMany(models.Comment, {foreignKey: 'bookId', onDelete: 'cascade' });
    };

    return Book;
};
export default book;
