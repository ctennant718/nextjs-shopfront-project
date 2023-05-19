import React from 'react'
import { nanoid } from 'nanoid';
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";
import Paragraph from "@/components/Paragraph";

const BasketList = ({
  deleteHandler = () => {},
  headingLevel = 1,
}) => {
  const { data: basket } = useUserBasket();
  const {items} = basket;
  if (!items.length) return <Paragraph>No items to show.</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {items.map((item) => (
        <ListItem key={nanoid()} component="li">
          <Product
            product={item}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            canUpdate={false}
            canRemove={false}
            canBuy={false}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasketList