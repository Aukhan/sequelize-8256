const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'test', 'postgres', 'password', {
    host: 'c_postgres',
    dialect: 'postgres',
    port: 5432,
  })

sequelize.authenticate()
  .then(() => console.log('successfully connected to postgres database'))




//define the user model
const User = sequelize.define('user', {
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, Infinity],
        msg: "Password must be at least 8 characters."
      },
      not: {
        args: [/\s+/ig],
        msg: "Password must not have blank spaces."
      }
    }
  }
}, {
  paranoid: true
});

sequelize
  .sync({ force: true })
  .then(() => {
    return User.create({
      password: 'fundsAreSafe'
    });
  })
  .then(() => {
    return User.findOne();
  })
  .then(user => {
    return user.update({
      password: 'ds'
    });
  })
  .catch(e => {
    console.log(JSON.stringify(e, null, 2));
  });
