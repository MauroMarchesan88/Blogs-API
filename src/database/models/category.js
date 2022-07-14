const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
    });

    Category.associate = (models) => {
        Category.hasOne(models.BlogPost,
            { foreignKey: 'categoryId' });
    };

    return Category;
};


module.exports = Category;