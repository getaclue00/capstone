# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

Appointment.create({title: 'Batman Appointment'})
Appointment.create({title: 'Someother Appointment', notes: 'Extra notes go here.'})
Appointment.create({title: 'Wash Joes Car', notes: 'Car is super new. Needs special buffer compound. Window is tinted.'})
