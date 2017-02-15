import Ember from 'ember';

export default Ember.Controller.extend({
    headers: ["Name", "Client ID", "Phone",
            "Email"],
    attributes: {"fullName": "Name", "id" : "Client ID:", "phoneNumber" : "Phone",
                "email": "Email"},

    operations: {'clients.show': 'glyphicon-pencil', 'clients.delete': 'glyphicon-remove'},

    collection: 'clients'
});
