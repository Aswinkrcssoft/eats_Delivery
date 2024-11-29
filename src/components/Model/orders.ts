export interface order {
  orderId: string;
  status: string;
  itemsCount: number;
  totalAmount: string;
  breakdown: { item: string; price: string ,qty:number}[];
  pickUpTime: string;
  deliveryExecutive: string;
  location: string;
  customerName:string;
  customermobile:string;
  orderTime: string;
  restName:string;
  restlongitude:string;
  restlatitude:string;
  customerlongitude:string;
  customerlatitude:string;
 
}
