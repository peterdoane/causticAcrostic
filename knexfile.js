'use strict';

module.exports = {
 development: {
   client: 'pg',
   connection: 'postgres://localhost/caustic_dev'
 },

 production: {
   client: 'pg',
   connection: process.env.DATABASE_URL
 }
};
