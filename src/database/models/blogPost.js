const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define("BlogPost", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, {
        timestamps: true,
        createdAt: "published",
        updatedAt: "updated",
    });

    BlogPost.associate = (models) => {
        BlogPost.hasMany(models.PostCategory,
            {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
                hooks: true
            });
        BlogPost.belongsTo(models.User,
            { as: 'user', foreignKey: 'userId' });
    };

    return BlogPost;
};

module.exports = BlogPost;