import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  lastName:     faker.name.lastName,
  firstName:    faker.name.firstName,
  email:        faker.internet.email,
  phoneNumber:  faker.phone.phoneNumberFormat(0),
  streetNumber: faker.random.number,
  streetName:   faker.address.streetName,
  city:         faker.address.city,
  province:     faker.address.state,
  postalCode:   faker.address.zipCode,
  startDate:    faker.date.past,

  afterCreate(employee, server) {
    server.create('appointment', { employee });
  }
});
