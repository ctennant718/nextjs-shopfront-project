import Image from "next/image";
import Link from "next/link";
import { dinero, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  EditIcon,
  DeleteIcon,
  Button,
  Box,
} from "@/components/mui";
import Heading from "@/components/Heading";
import { slugify, formatPrice } from "@/lib/utils/formatters";


const ProductDisplay = ({
  product: { _id, title, image, price, quantity } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  addToBasket = (id) => {
    console.log("no addToBasket handler supplied", id);
  },
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy = false,
}) => {
  let subComponent = null;
  if(canBuy === false) {
    subComponent = <Typography sx={{color: "rgb(59,73,111)"}}>Please log in to purchase</Typography>
  }
  return (
    <Card sx={{ width: "90%", marginBlockEnd: "1em" }}>
      <CardMedia sx={{ display: "grid", placeItems: "center" }}>
        <Image alt={title} src={image} width="400" height="370" />
      </CardMedia>
      <CardContent>
        <Heading
          component={`h${headingLevel}`}
          variant="h4"
          sx={{ textAlign: "center" }}
        >
          {title}
        </Heading>
        <List
          component="dl"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1em",
          }}
        >
          <Typography component="dt" sx={{ textAlign: "right", color: "rgb(59,73,111)" }}>
            Price:
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "rgb(59,73,111)" }}>
            {formatPrice(toDecimal(dinero({ amount: price, currency: GBP })))}
          </Typography>
          <Typography component="dt" sx={{ textAlign: "right", color: "rgb(59,73,111)" }}>
            Quantity:
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "rgb(59,73,111)" }}>
            {quantity} remaining
          </Typography>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
        {subComponent}
          {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/products/update/${_id}`}
            >
              <EditIcon />
            </IconButton>
          )}
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {canBuy && (
            <Button
              onClick={addToBasket}
              sx={{
                backgroundColor: "rgb(229, 221,191)",
                color: "rgb(59,73,111)",
                marginBlockEnd: "1.5em",
                padding: "1em",
              }}
            >
              Add to Basket
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductDisplay;
