# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

Service.create({name: 'Engine Degreasing', price_small: '99', price_large: '99', duration: '90', description: '...'})
Service.create({name: 'Platinum', price_small: '159', price_large: '179', duration: '150', description: '...'})
Service.create({name: 'Silver', price_small: '90', price_large: '79', duration: '99', description: '...'})
Service.create({name: 'Shampoo for Tough Stains and Spills', price_small: '100', price_large: '130', duration: '90', description: '...'})
