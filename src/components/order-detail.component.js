import React from 'react'

class OrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          order: {
            id: this.props.match.params.id
          }
        }
    }    
    render() {
      return <h1>Hello Ini: {this.state.order.id}</h1>
    }
}

export default OrderDetail