const PostCategories = (sequelize, DataTypes) => {
    const PostCategories = sequelize.define("PostCategories", {
        postId: { type: DataTypes.INTEGER, foreignKey: true },
        categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    });

    PostCategories.associate = (models) => {
        PostCategories.belongsTo(models.BlogPost,
            { foreignKey: 'postId' });
        PostCategories.belongsTo(models.Category,
            { foreignKey: 'categoryId' });
    };

    return PostCategories;
};

module.exports = PostCategories;