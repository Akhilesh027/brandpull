// migrations/XXXXXXXXXXXXXX-add-foreign-keys.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_order_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Carts', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_cart_product',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Orders', 'fk_order_user');
    await queryInterface.removeConstraint('Carts', 'fk_cart_product');
  },
};
