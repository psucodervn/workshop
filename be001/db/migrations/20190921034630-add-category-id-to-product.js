export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Products', 'categoryId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Categories',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }),
  down: queryInterface => queryInterface.removeColumn('Products', 'categoryId'),
};
