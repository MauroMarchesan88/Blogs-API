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
            foreignKey: 'postId',
            otherkey: 'categoryId',
            as: 'categories'
        });
        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: 'categoryId',
            otherkey: 'BlogPost',
            onDelte: 'CASCADE',
            hooks: true
        });
    };

    return PostCategory;
};

module.exports = PostCategory;