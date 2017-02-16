import Ember from 'ember';

export default Ember.Controller.extend({
    headers: ["Name", "Client ID", "Email",
            "Phone"],
    attributes: {"fullName": "Name", "id" : "Client ID:", "email": "Email", "phoneNumber" : "Phone"
                },

    // operations: {'clients.show': 'glyphicon-pencil', 'clients.delete': 'glyphicon-remove'},

    collection: 'clients'
});
