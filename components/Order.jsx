import Image from "next/image";
import Link from "next/link";
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
  Box
} from "@/components/mui";
import Heading from "@/components/Heading";
import { slugify } from "@/lib/utils/formatters";

const ProductDisplay = ({
  product: { _id, title, image, price, quantity } = {},
  deleteHandler = () => { console.log('no delete handler supplied')},
  headingLevel = 2,
}) => {

  return (
    <Card sx={{ width: '100%'}}>
      <CardMedia sx={{ display: "grid", placeItems: "center" }}>
        <Image alt={title} src={image} width="500" height="500" />
      </CardMedia>
      <CardContent>
        <Heading component={`h${headingLevel}`} sx={{ textAlign: "center" }}>
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
          <Typography component="dt" sx={{ textAlign: "right" }}>
            Price
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold" }}>
            £{(price / 100).toFixed(2)}
          </Typography>
          <Typography component="dt" sx={{ textAlign: "right" }}>
            Quantity
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold" }}>
            {quantity} remaining
          </Typography>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
          <Button href={`/products/${slugify(title, _id)}`} component={Link}>
            View
          </Button>
          <IconButton
            aria-label="update"
            component={Link}
            href={`/admin/products/update/${_id}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductDisplay;