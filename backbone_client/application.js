var Customer = Backbone.Model.extend({
	defaults : {
		"name" : "",
		"address" : ""
	},
	urlRoot : "/cakephp_service/customers",
	parse : function(response) {
		if (response.Customer != undefined) {
			return response.Customer;
		}
		return response;
	}
});

var Customers = Backbone.Collection.extend({
	model : Customer,
	url : "/cakephp_service/customers"
});

$(function() {
	$("#add-button").click(function(e) {
		var customer = new Customer({
			name : $('#add-name').val(),
			address : $('#add-address').val()
		});
		customer.save();
	});
	
	$('#list-button').click(function(e){
		var customers = new Customers;
		customers.fetch({
			success : function(customers, response) {
				var tr = $('#list-table>tbody>tr');
				if(tr.length > 0) {
					tr.remove();
				}
				var tbody = $('#list-table>tbody');
				var i;
				for(i = 0; i < customers.length; ++i) {
					var customer = customers.at(i);
					tbody.append('<tr><td>' + customer.get('id') + 
							'</td><td>' + customer.get('name') +
							'</td><td>' + customer.get('address') +
							'</td></tr>');
				}
			},
			error : function(customers, response) {
				alert('error: ' + response);
			}
		});
	});
	
	$('#update-read_button').click(function(e){
		var customer = new Customer({
			id : $('#update-read_id').val()
		});
		customer.fetch({
			success : function(customer, response) {
				$('#update-name').val(customer.get('name'));
				$('#update-address').val(customer.get('address'));
			},
			error : function(customers, response) {
				alert('error: ' + response);
			}
		});
	});
	
	$('#update-update_button').click(function(e){
		var customer = new Customer({
			id : $('#update-read_id').val(),
			name : $('#update-name').val(),
			address : $('#update-address').val()
		});
		customer.save();
	});
	
	$('#delete-button').click(function(e){
		var customer = new Customer({
			id : $('#delete-id').val()
		});
		customer.destroy();
	});
});
