/**
 * User
 * @typedef {Object} User
 * @property {string} id - user id
 * @property {string} email - user email
 * @property {number} phoneNum - user phone number
 * @property {string} name - user name
 */

/**
 * Room
 * @typedef {Object} Room
 * @property {string} id - room id
 * @property {User[]} users - participating users
 * @property {Date} createdAt - created time
 * @property {Date} updatedAt - updated time
 */

/**
 * Message
 * @typedef {Object} Message
 * @property {string} id - message id
 * @property {User} user - user who send this message
 * @property {Room} Room - where this message locates
 * @property {string} message - content of message
 * @property {Date} createdAt - created time
 * @property {Date} updatedAt - updated time
 */

/**
 * ChatList
 * @typedef {Object} ChatList
 * @property {string} id - chat id
 * @property {User} user - who owns this chat list
 * @property {Room[]} room - rooms inside of the chat list
 * @property {Date} createdAt - created time
 * @property {Date} updatedAt - updated time
 */

/**
 * Follows
 * @typedef {Object} Follows
 * @property {string} id - follow id
 * @property {User} userFrom - pub user
 * @property {User} userTo - sub user
 * @property {Date} createdAt - created time
 * @property {Date} updatedAt - updated time
 */

module.exports = {};
