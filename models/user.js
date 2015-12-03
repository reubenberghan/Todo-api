module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [7, 100],
				isString: function(value) {
					if (typeof value !== 'string') {
						throw new Error('Description must be a string');
					}
				}
			}
		}
	});
};