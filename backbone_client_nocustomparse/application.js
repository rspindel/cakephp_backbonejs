function onError(model, xhr) {
  $('#error_msg').html("Server error (" + xhr.status + ")");
  if(!model.get('id')) {
    model.destroy();
  }
}

$(function() {
  $('#dialog').dialog({
    autoOpen : false,
    modal : true,
    width : 480,
    height : 240,
    buttons : [ {
      text : "OK",
      click : function() {
        $(this).dialog("close");
      }
    } ]
  });

  var Customer = Backbone.Model.extend({
    defaults : {
      "name" : "",
      "address" : ""
    },
    urlRoot : "/cakephp_service_nocustomparse/customers"
  });

  var Customers = Backbone.Collection.extend({
    model : Customer,
    url : "/cakephp_service_nocustomparse/customers"
  });

  var customers = new Customers;

  var CustomerView = Backbone.View.extend({
    tagName : 'tr',
    events : {
      "click .edit-button" : "onEditButton",
      "click .delete-button" : "onDeleteButton"
    },
    initialize : function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.model.on('error', onError, this);
    },
    render : function() {
      this.$el.html('<td>' + this.model.get('id') + '</td><td>'
          + this.model.get('name') + '</td><td>' + this.model.get('address')
          + '</td><td>'
          + '<input class="edit-button" type="button" value="Edit"/>'
          + '<input class="delete-button" type="button" value="Delete"/>'
          + '</td>');
      return this;
    },
    onEditButton : function() {
      $('#dialog-name').val(this.model.get('name'));
      $('#dialog-address').val(this.model.get('address'));

      $('#dialog').bind('dialogclose', {
        model : this.model
      }, function(event) {
        event.data.model.set('name', $('#dialog-name').val());
        event.data.model.set('address', $('#dialog-address').val());
        event.data.model.save();
        $('#dialog').unbind('dialogclose');
      });
      $('#dialog').dialog('open');
    },
    onDeleteButton : function() {
      this.model.destroy();
    }
  });

  var CustomersView = Backbone.View.extend({
    el : $('#customer-app'),
    events : {
      "click #add-button" : "onAddButton"
    },
    initialize : function() {
      customers.on('add', this.onAddEvent, this);
      customers.on('reset', this.onResetEvent, this);
      customers.on('all', this.render, this);
      customers.on('error', onError, this);
      customers.fetch();
    },
    onAddEvent : function(customer) {
      var customerView = new CustomerView({
        model : customer,
        id : customer.get('id')
      });
      this.$('#list-tbody').append(customerView.render().el);
    },
    onResetEvent : function() {
      this.$('#list-tbody').html('');
      customers.each(this.onAddEvent);
    },
    onAddButton : function(e) {
      $('#dialog-name').val('');
      $('#dialog-address').val('');

      $('#dialog').bind('dialogclose', function(event) {
        customers.create({
          name : $('#dialog-name').val(),
          address : $('#dialog-address').val()
        });
      });
      $('#dialog').dialog('open');
    }
  });
  var customersView = new CustomersView;
});
