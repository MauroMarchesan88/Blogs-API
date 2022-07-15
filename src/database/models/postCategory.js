const PostCategory = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define("PostCategory", {
        postId: { type: DataTypes.INTEGER, foreignKey: true },
        categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    }, {
        timestamps: false,
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            through: PostCategory,
            foreignKey: 'postId'
        });
        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: 'categoryId'
        });
    };

    return PostCategory;
};

module.exports = PostCategory;