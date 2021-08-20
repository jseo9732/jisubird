const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Like',
      tableName: 'Likes',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.User.belongsToMany(db.Post,{
        foreignKey : 'likerId',
        as: 'LikedPosts',
        through : 'Like',
    });
    db.Post.belongsToMany(db.User,{
        foreignKey: 'likedPostId',
        as : 'Likers',
        through : 'Like',
    });
  }
};
