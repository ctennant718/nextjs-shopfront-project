import React from 'react'
import { useOrders } from "@/lib/tq/orders/queries";
import { List, ListItem } from "@/components/mui";
import Order from "@/components/Order";
import Paragraph from "@/components/Paragraph";

const OrderList = ({
  deleteHandler = () => {},
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy = true,
}) => {
  // const { user } = useUser();
  // const mutation = useAddToBasket();

  const { data: orders } = useOrders();
  if (!orders.length) return <Paragraph>No orders to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {orders.map((order) => (
        <ListItem key={order._id} component="li">
          <Order
            Order={order}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            // canUpdate={canUpdate}
            // canRemove={canRemove}
            // canBuy={!!user && canBuy}
            // addToBasket={() => mutation.mutate(Order._id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OrderList