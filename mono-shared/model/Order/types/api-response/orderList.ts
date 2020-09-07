import { ORDER_STATUS } from './../../statusTypes'

export interface OrderListItem {
  id: number
  draftId: number
  status: ORDER_STATUS
  buyCompany: string
  saleCompany: string
}