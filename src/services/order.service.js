import http from '../http-common'

class OrderDataService {
  getAll(params) {
    const { invNumber, paymentStatus, currentPage, limit, sortBy, sortDirection } = params
    return http.get('/orders?', {
      params: {
        inv_number: invNumber ? invNumber : undefined,
        payment_status: paymentStatus ? paymentStatus : undefined,
        sort: sortBy ? sortBy : undefined,
        sort_direction: sortDirection ? sortDirection : undefined,
        page: currentPage ? currentPage : 1,
        limit: limit ? limit : 10
      }
    })
  }

  get(id) {
    return http.get(`/orders/${id}`)
  }

  create(data) {
    return http.post('/orders', data)
  }

  delete(id) {
    return http.delete(`/orders/${id}`)
  }
}

export default new OrderDataService()