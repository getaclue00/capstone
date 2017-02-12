# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#used in appointments table to reference a deleted employee/car/service and cannot be deleted if referenced by appointments
Employee.create({ id: '0', last_name: 'DEFAULT', first_name: 'DEFAULT', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFAULT', postal_code: 'A0A 0A0'})
Client.create({ id: '0', last_name: 'DEFAULT', first_name: 'DEFAULT', email: 'DEFAULT', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFAULT', postal_code: 'A0A 0A0'})
Car.create({ id: '0', make: 'DEFAULT', model: 'DEFAULT', size: 'small', interior: 'DEFAULT', colour: 'DEFAULT', client_id: '0'})
Service.create({id: '0', name: 'DEFAULT', active: false, displayable: false})

Appointment.create({title: 'Batman Appointment', car_id: '0', service_id: '0'}) #employee_id can be null
Appointment.create({title: 'Someother Appointment', notes: 'Extra notes go here.', car_id: '0', service_id: '0'})
Appointment.create({title: 'Wash Joes Car', notes: 'Car is super new. Needs special buffer compound. Window is tinted.', car_id: '0', service_id: '0'})
Appointment.create({title: 'Appointment With Employee, Car, and Service', notes: 'Car is super new. Needs special buffer compound. Window is tinted.', car_id: 0, service_id: 0, employee_id: 0})

Employee.create({ id: '1', last_name: 'Testing', first_name: 'Tester', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFAULT', postal_code: 'A0A 0A0'})
Employee.create({ id: '2', last_name: 'Wayne', first_name: 'Bruce', phone_number: '000-000-0000', street_number: '0', street_name: 'DEFAULT', postal_code: 'A0A 0A0'})

User.create({email: 'test@test.com', password: 'password', admin: true, employee_id: '1'})
User.create({email: 'batman@batman.com', password: 'password', admin: false, employee_id: '2'})

Service.create({name: 'Engine Degreasing', price: '99', vehicle_size: 'Small', duration: '90', description: '...', active: true, displayable: true})
Service.create({name: 'Platinum', price: '159', vehicle_size: 'Small', duration: '150', description: '...', active: true, displayable: true})
Service.create({name: 'Silver', price: '90', vehicle_size: 'Small', duration: '99', description: '...', active: true, displayable: true})
Service.create({name: 'Shampoo for Tough Stains and Spills', price: '100', vehicle_size: 'Small', duration: '90', description: '...', active: true, displayable: true})

Service.create({name: 'Engine Degreasing', price: '99', vehicle_size: 'Large', duration: '90', description: '...', active: true, displayable: true})
Service.create({name: 'Platinum', price: '179', vehicle_size: 'Large', duration: '150', description: '...', active: true, displayable: true})
Service.create({name: 'Silver', price: '79', vehicle_size: 'Large', description: '...', active: true, displayable: true})
Service.create({name: 'Shampoo for Tough Stains and Spills', price: '130', vehicle_size: 'Large', duration: '90', description: '...', active: true, displayable: true})
