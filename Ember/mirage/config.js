import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // THESE WORK ALREADY --- no need to mock these
  this.passthrough('/users/');
  this.passthrough('/users/:id');
  this.passthrough('/appointments/');
  this.passthrough('/appointments/:id');

  this.get('/employees', (schema) => {
    return schema.employees.all();
  });
  this.post('/employees', (schema, request) => {
    var params = JSON.parse(request.requestBody);
    if (!params.data.attributes.last_name || !params.data.attributes.first_name) {
      return new Mirage.Response(422, {some: 'header'}, {errors: {title: ['cannot be blank']}});
    } else {
      return schema.employees.create(params);
    }
  });

  this.get('/employees/:id', (schema, request) => {
    let id = request.params.id;

    return schema.employees.find(id);
  });

  this.patch('/employees/:id', function (schema, request) {
    let id = request.params.id;
    let employee = schema.employees.find(id);
    if (request.requestBody){
      let newData = this.normalizedRequestAttrs();
      employee.update(newData);
      return new Mirage.Response(204);
    }
    // return schema.employees.find(id);
  });

  this.del('/employees/:id', function (schema, request) {
    let id = request.params.id;
    let employee = schema.employees.find(id);

    employee.destroy();
  });

  // this.get('/employees', (schema, request) => {
  //   debugger;
  //   return schema.employees.all();
  // });

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
