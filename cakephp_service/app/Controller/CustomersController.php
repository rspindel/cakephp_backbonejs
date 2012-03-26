<?php
class CustomersController extends AppController {
	public $name = 'Customers';
	function index() {
		$customers = $this->Customer->find('all');
		$this->set('customers', $customers);
		$this->set('_serialize', 'customers');
	}
	function view($id) {
		$customer = $this->Customer->find('first', array(
				'conditions' => array('Customer.id' => $id)
		));
		$this->set('customer', $customer);
		$this->set('_serialize', 'customer');
	}
	function add() {
		$customer['Customer']['name'] = $this->params['data']['name'];
		$customer['Customer']['address']  = $this->params['data']['address'];
		$this->Customer->create();
		$this->Customer->save($customer);
		$this->set('customer', $customer);
		$this->set('_serialize', 'customer');
	}
	function edit($id) {
		$customer['Customer']['id'] = $id;
		if(isset($this->params['data']['name'])) {
			$customer['Customer']['name'] = $this->params['data']['name'];
		}
		if(isset($this->params['data']['address'])) {
			$customer['Customer']['address']  = $this->params['data']['address'];
		}
		$this->Customer->save($customer);
		$this->set('customer', $customer);
		$this->set('_serialize', 'customer');
	}
	function delete($id) {
		$this->Customer->delete($id);
		$result = array('result' => true);
		$this->set('result', $result);
		$this->set('_serialize', 'result');
	}
}
?>
