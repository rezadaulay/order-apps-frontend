import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderDataService from '../services/order.service'

class AddOrderModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            invNumber: '',
            transactionDate: '',
            customerName: '',
            customerUsername: '',
            customerEmail: '',
            paymentStatus: '',
            fulfillmentStatus: '',
            totalAmount: ''
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    render() {
        return (<div>
            <Button variant="primary" size="sm" className="mt-1 mb-3" onClick={
                () => {
                    this.handleOpen()
                }
            }>Create New</Button><Modal show={this.state.showModal} onHide={this.handleClose}>
            <Form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>No. Invoice <strong>*</strong></Form.Label>
                    <Form.Control required type="text" placeholder="Enter invoice number" id="invNumber" value={this.state.invNumber} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Transaction Date <strong>*</strong></Form.Label>
                    <DatePicker className="form-control" selected={this.state.transactionDate} onChange={this.handleDateChange} placeholderText="Enter date" dateFormat="yyyy-MM-dd"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Name <strong>*</strong></Form.Label>
                    <Form.Control required type="text" placeholder="Enter customer name" id="customerName" value={this.state.customerName} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Username <strong>*</strong></Form.Label>
                    <Form.Control required type="text" placeholder="Enter customer username" id="customerUsername" value={this.state.customerUsername} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Email <strong>*</strong></Form.Label>
                    <Form.Control required type="email" placeholder="Enter customer email" id="customerEmail" value={this.state.customerEmail} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Payment Status <strong>*</strong></Form.Label>
                    <Form.Select required id="paymentStatus" value={this.state.paymentStatus} onChange={this.handleFormChange}>
                        <option value="">All Payment Status</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fulfillment Status <strong>*</strong></Form.Label>
                    <Form.Select required id="fulfillmentStatus" value={this.state.fulfillmentStatus} onChange={this.handleFormChange}>
                        <option value="">Select Fulfillment Status</option>
                        <option value="fulfillment">Fulfillment</option>
                        <option value="unfulfillment">Unlfillment</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Total Amount <strong>*</strong></Form.Label>
                    <Form.Control required type="number" placeholder="Enter total amount" id="totalAmount" value={this.state.totalAmount} onChange={this.handleFormChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" size="sm" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save
              </Button>
            </Modal.Footer>
            </Form> 
          </Modal>
        </div>)
    }
    handleDateChange (val) {
        this.setState({transactionDate: val})
    }
    handleSubmit (event) {
        event.preventDefault()
        if (this.state.transactionDate === '' || this.state.transactionDate === null) {
            return window.alert('please fill all required field')
        }

        let transactionDate = new Date(this.state.transactionDate);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(transactionDate)
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(transactionDate)
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(transactionDate)

        OrderDataService.create({
            inv_number: this.state.invNumber,
            transaction_date: `${ye}-${mo}-${da}`,
            customer_name: this.state.customerName,
            customer_username: this.state.customerUsername,
            customer_email: this.state.customerEmail,
            payment_status: this.state.paymentStatus,
            fulfillment_status: this.state.fulfillmentStatus,
            total_amount: this.state.totalAmount
        }).then(() => {
            this.handleClose()
            this.props.onSaved()
            window.alert('Data berhasil disimpan')
        }).catch(e => {
            console.error(e)
        })
    }
    handleOpen () {
        this.setState({
            showModal: true,
            invNumber: '',
            transactionDate: '',
            customerName: '',
            customerUsername: '',
            customerEmail: '',
            paymentStatus: '',
            fulfillmentStatus: '',
            totalAmount: ''
        })
    }
    handleClose () {
        this.setState({showModal: false})
    }
    handleFormChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const id = target.id
        this.setState({
            [id]: value
        })
    }
}

export default AddOrderModal