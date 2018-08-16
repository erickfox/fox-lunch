import axios from 'axios'

export { UserService } from './user.service'
export { SaleService } from './sale.service'
export { PurchaseService } from './purchase.service'
export { MenuService } from './menu.service'
export { ExchangeService } from './exchange.service'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsZXggTWVqaWNhbm9zIiwiZW1haWwiOiJhbGV4bWVqaWNhbm9zQG91dGxvb2suY29tIiwicGljdHVyZSI6Imh0dHBzOi8vZDJsbjF4YmkwNjdodW0uY2xvdWRmcm9udC5uZXQvYXNzZXRzL2RlZmF1bHRfdXNlci1hYmRmNjQzNGNkYTAyOWVjZDMyNDIzYmFhYzRlYzIzOC5wbmciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzQxNzU1NTYsImV4cCI6MTUzNDI2MTk1Nn0.2Iu-6zTVossWvOO7f29833GPdSnbu9HHsH80FWqI3c4'
axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;