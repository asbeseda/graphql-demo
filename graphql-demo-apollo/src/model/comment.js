const comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id:         {type: DataTypes.STRING, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4},
        bookId:     {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        userId:     {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        content:    {type: DataTypes.TEXT},

        createdAt:  {type: DataTypes.DATE},
        updatedAt:  {type: DataTypes.DATE},
    },{
        // Disable audit record fields
        timestamps: false, createdAt:  false, updatedAt:  false, deletedAt:  false
    });

    Comment.associate = models => {
        Comment.belongsTo(models.Book, {foreignKey: 'bookId'});
        Comment.belongsTo(models.User, {foreignKey: 'userId'});
    };
    return Comment;
};
export default comment;
