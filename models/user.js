const bcrypt = require('bcryptjs');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
	const user = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100],
				isString: function(value) {
					if (typeof value !== 'string') {
						throw new Error('Description must be a string');
					}
				}
			},
			set: function(value) {
				const salt = bcrypt.genSaltSync(10),
					hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		},
		classMethods: {
			authenticate: function(body) {
				return new Promise(function(resolve, reject) {
					if (!_.isString(body.email) || !_.isString(body.password)) {
						return reject();
					}

					user.findOne({ where: { email: body.email.toLowerCase() } })
						.then(function(user) {
							if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
								return reject();
							}

							resolve(user);
						})
						.catch(function(e) {
							reject();
						});
				});
			},
			findByToken: function(token) {
				return new Promise(function(resolve, reject) {
					try {
						const decodedJWT = jwt.verify(token, 'qwerty098'),
							bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#!'),
							tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

						user.findById(tokenData.id)
							.then(function(user) {
								if (!user) {
									reject();
								} else {
									resolve(user);
								}
							}, function(e) {
								reject();
							});
					} catch (e) {
						reject();
					}
				});
			}
		},
		instanceMethods: {
			toPublicJSON: function(toPublic) {
				const json = this.toJSON();
				return _.pick(json, toPublic);
			},
			generateToken: function(type) {
				if (!_.isString(type)) {
					return undefined;
				}

				try {

					const stringData = JSON.stringify({ id: this.get('id'), type: type });
					const encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();
					const token = jwt.sign({ token: encryptedData }, 'qwerty098');

					return token;

				} catch (e) {
					return undefined;
				}
			}
		}
	});

	return user;
};
