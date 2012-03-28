var Customer = Spine.Model.sub();
Customer.configure('Customer', 'name', 'address');
Customer.extend(Spine.Model.Ajax);
Customer.extend({
    url : '/cakephp_service/customers'
});
Customer.extend({
    fromJSON : function(objects) {
        var value, _i, _len, _results;
        if (!objects) {
            return;
        }
        if (typeof objects === 'string') {
            objects = JSON.parse(objects);
        }
        if (Spine.isArray(objects)) {
            _results = [];
            for (_i = 0, _len = objects.length; _i < _len; _i++) {
                if (objects[_i].Customer != undefined) {
                    value = objects[_i].Customer;
                } else {
                    value = objects[_i];
                }
                _results.push(new this(value));
            }
            return _results;
        } else {
            if (objects.Customer != undefined) {
                return new this(objects.Customer);
            }
            return new this(objects);
        }
    }
});
Customer.bind("refresh", function() {
    var tr = $('#list-table>tbody>tr');
    if (tr.length > 0) {
        tr.remove();
    }
    Customer.each(function(customer) {
        var tbody = $('#list-table>tbody');
        tbody.append('<tr><td>' + customer.id + '</td><td>' + customer.name
                + '</td><td>' + customer.address + '</td></tr>');
    });
});

$(function() {
    Customer.fetch();
    $('#add-button').click(function(e) {
        Customer.create({
            name : $('#add-name').val(),
            address : $('#add-address').val()
        });
    });

    $('#list-button').click(function(e) {
        Customer.fetch();
    });

    $('#update-read_button').click(function(e) {
        var customer = Customer.find($('#update-read_id').val());
        $('#update-name').val(customer.name);
        $('#update-address').val(customer.address);
    });

    $('#update-update_button').click(function(e) {
        var customer = Customer.find($('#update-read_id').val());
        customer.name = $('#update-name').val();
        customer.address = $('#update-address').val();
        customer.save();
    });

    $('#delete-button').click(function(e) {
        Customer.destroy($('#delete-id').val());
    });
});
