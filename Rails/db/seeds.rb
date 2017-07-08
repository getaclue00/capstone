# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#used in appointments table to reference a deleted employee/client/service and cannot be deleted if referenced by appointments
company = Company.create({ contact_phone_number: '613-676-3723', contact_email: 'info@radetailing.ca', work_sunday: false, work_monday: true, work_tuesday: true, work_wednesday: true, work_thursday: true, work_friday: true, work_saturday: false })

employee = Employee.create({ id: '0', last_name: 'Detailing', first_name: 'R&A', phone_number: '613-676-3723', street_number: '1000', street_name: 'Palladium Dr', postal_code: 'K2V 1A5', company: company })

Client.create({ id: '0', last_name: 'DEFAULT', first_name: 'DEFAULT', email: 'segradetailingcapstoneteam@gmail.com', phone_number: '613-676-3723', street: '0 DEFAULT', postal_code: 'A0A 0A0' })

Service.create({id: '0', name: 'DEFAULT', active: false, displayable: false})

User.create({email: 'info@radetailing.ca', password: 'password', admin: true, employee: employee})

Service.create({name: 'Silver', price: '79', vehicle_size: 'Small', duration: '90', description: 'Exterior car wash (hand dried); Wipe dashboard, control board, steering wheel; Clean door panel and door jams; Vacuum seats; Floor and carpet vacuum; Window cleaning (interior and exterior); Vacuum mats; Shine dashboard and control board; Clean vents, cup holders and buttons; Check tire pressure and add air if needed', active: true, displayable: true, buffer_time: '60'})
Service.create({name: 'Silver', price: '99', vehicle_size: 'Large', duration: '90', description: 'Exterior car wash (hand dried); Wipe dashboard, control board, steering wheel; Clean door panel and door jams; Vacuum seats; Floor and carpet vacuum; Window cleaning (interior and exterior); Vacuum mats; Shine dashboard and control board; Clean vents, cup holders and buttons; Check tire pressure and add air if needed', active: true, displayable: true, buffer_time: '60'})

Service.create({name: 'Platinum', price: '159', vehicle_size: 'Small', duration: '120', description: 'Silver package + Seats and floor shampoo/steam clean and odor control; Clean and dress tires and rims, remove break debris; Trunk (must be emptied beforehand); (Leather treatment available for $40)', active: true, displayable: true, buffer_time: '60'})
Service.create({name: 'Platinum', price: '179', vehicle_size: 'Large', duration: '120', description: 'Silver package + Seats and floor shampoo/steam clean and odor control; Clean and dress tires and rims, remove break debris; Trunk (must be emptied beforehand); (Leather treatment available for $40)', active: true, displayable: true, buffer_time: '60'})

Service.create({name: 'Custom', price: '0', vehicle_size: 'Small', duration: '60', description: 'Please contact us for a custom package', active: true, displayable: true, buffer_time: '60'})
Service.create({name: 'Custom', price: '0', vehicle_size: 'Large', duration: '60', description: 'Please contact us for a custom package', active: true, displayable: true, buffer_time: '60'})

Service.create({name: 'Shampoo for tough stains or spills', price: '100', vehicle_size: 'Small', duration: '60', description: 'Please contact us for a custom package', active: true, displayable: true, buffer_time: '60'})
Service.create({name: 'Shampoo for tough stains or spills', price: '130', vehicle_size: 'Large', duration: '60', description: 'Please contact us for a custom package', active: true, displayable: true, buffer_time: '60'})

#resetting PK on tables to account for ids seeded
ActiveRecord::Base.connection.reset_pk_sequence!('employees')
ActiveRecord::Base.connection.reset_pk_sequence!('clients')
