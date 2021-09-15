import React from 'react'
import { Breadcrumb, Table, Badge, Pagination, Row, Col, Form, Button } from 'react-bootstrap'
import OrderDataService from '../services/order.service'
import { SortImage } from '../helpers'
import TrashSolidImg from '../assets/img/trash-solid.svg'
import AddOrderModal from './add-order-modal.component'

class OrderList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sortBy: 'transaction_date',
            sortDirection: '',
            searchForminvNumber: '',
            searchFormpaymentStatus: '',
            orders: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 1
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
    }
    render() {
        const { orders, totalItems, totalPages, currentPage } = this.state
        return (<div>
            <Breadcrumb>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Order List</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col xs={4}>
                    <h4>Order List <small>({totalItems} Data)</small></h4>
                    <AddOrderModal onSaved={
                        () => {
                            this.retrieveOrders()
                        }
                    } />
                </Col>
                <Col xs={8}>
                    <Form onSubmit={this.handleSearch} className="form-inline filter-form mb-3">
                        <Form.Control type="text" id="searchForminvNumber" placeholder="Inv. number" value={this.state.searchForminvNumber} onChange={this.handleFormChange}/>
                        <Form.Select id="searchFormpaymentStatus" value={this.state.searchFormpaymentStatus} onChange={this.handleFormChange}>
                            <option value="">All Payment Status</option>
                            <option value="1">Paid</option>
                            <option value="0">Unpaid</option>
                        </Form.Select>
                        <Button variant="secondary" type="submit">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="sort-header" onClick={
                            () => {
                                this.handleSort('inv_number')
                            }
                        }>Inv. Number <img src={SortImage(this.state.sortBy === 'inv_number', this.state.sortDirection)} className="sort-icon" alt=""/></th>
                        <th className="text-center">Date</th>
                        <th>Customer Email</th>
                        <th className="sort-header" onClick={
                            () => {
                                this.handleSort('customer_username')
                            }
                        }>Customer Username <img src={SortImage(this.state.sortBy === 'customer_username', this.state.sortDirection)} className="sort-icon" alt=""/></th>
                        <th>Customer Name</th>
                        <th className="text-center">Payment Status</th>
                        <th className="text-center">Fulfillment Status</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { orders && orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{order.inv_number}</td>
                            <td className="text-center">{order.transaction_date}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.customer_username}</td>
                            <td>{order.customer_email}</td>
                            <td className="text-center"><Badge bg={order.payment_status ? 'success' : 'danger'}>{order.payment_status ? 'Paid' : 'Unpaid'}</Badge></td>
                            <td className="text-center"><Badge bg={order.fulfillment_status ? 'success' : 'danger'}>{order.fulfillment_status ? 'Fulfillment' : 'Unfulfillment'}</Badge></td>
                            <td className="text-right">{order.total_amount}</td>
                            <td className="text-center action-buttons">
                                <Button variant="danger" size="sm" onClick={
                                        () => {
                                            this.deleteOrder(order.id)
                                        }
                                    }>
                                    <img src={TrashSolidImg} alt=""/>
                                </Button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </Table>
            <div>
                <Pagination>
                { this.itteratePaginationItems(totalPages, currentPage) }
                </Pagination>
            </div>
        </div>)
    }
    componentDidMount() {
        this.retrieveOrders()
    }
    handleFormChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const id = target.id
        this.setState({
            [id]: value
        })
    }
    handleSearch(event) {
        event.preventDefault()
        this.setState({ currentPage: 1 }, () => {
            this.retrieveOrders()
        })
    }
    handleSort (field) {
        let sortDirection = ''
        if (this.state.sortBy !== field) {
            sortDirection = 'asc'
        } else {
            sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc'
        }
        this.setState({
            sortBy: field,
            sortDirection: sortDirection
        }, () => {
            this.retrieveOrders()
        })
    }
    deleteOrder (id) {
        if (window.confirm('Are you sure to delete this item?')) {
            OrderDataService.delete(id).then(() => {
                this.retrieveOrders()
            }).catch(e => {
                console.error(e)
            })
        }
    }
    itteratePaginationItems(totalPages, currentPage){
        let items = []
        let i
        for(i =1; i <= totalPages; i++){
            const p = i
            items.push(<Pagination.Item key={p} onClick={
                currentPage === p
                  ? () => {}
                  : () => {
                      this.changePage(p)
                    }
              } active={p === currentPage}>
                {p}
            </Pagination.Item>)
        }
        
        return items
    }
    changePage(pageNumber) {
        if (pageNumber === 1 || (pageNumber > 1 && pageNumber <= this.state.totalPages)) {
            this.setState({ currentPage: pageNumber }, () => {
                this.retrieveOrders()
            })
        }
    }
    retrieveOrders() {
        const { searchForminvNumber, searchFormpaymentStatus, currentPage, sortBy, sortDirection } = this.state
        OrderDataService.getAll({
            invNumber: searchForminvNumber,
            paymentStatus: searchFormpaymentStatus,
            currentPage: currentPage,
            sortBy: sortBy,
            sortDirection: sortDirection
        }).then(response => {
            this.setState({
              orders: response.data.orders,
              totalItems: response.data.totalItems,
              totalPages: response.data.totalPages
              // currentPage: response.data.currentPage
            })
        }).catch(e => {
            console.error(e)
        })
    }        
}

export default OrderList