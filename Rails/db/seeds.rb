# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

#used in appointments table to reference a deleted employee/car/service and cannot be deleted if referenced by appointments
Employee.create({ id: '0', last_name: 'DEFAULT', first_name: 'DEFAULT', email: 'DEFAULT', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFUALT', postal_code: 'A0A 0A0'})
Client.create({ id: '0', last_name: 'DEFAULT', first_name: 'DEFAULT', email: 'DEFAULT', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFUALT', postal_code: 'A0A 0A0'})
Car.create({ id: '0', make: 'DEFAULT', model: 'DEFAULT', size: 'small', interior: 'DEFAULT', colour: 'DEFAULT', client_id: '0'})
Service.create({id: '0', name: 'DEFAULT'})