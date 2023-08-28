const { CreateUser } = require('./src/mongodb/Controllers/user')
require('./src/mongodb/mongoose')
require('./src/express/express')


CreateUser('admin', 'admin', false, '091899084', 'Avenida Pablo Rios N47', 'Manera', 'Carlos', 'no tiene aun', null)