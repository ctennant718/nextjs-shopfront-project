import { Typography } from "@/components/mui";

const Heading = ({ component = "h1", variant, children, ...props }) => {
  return (
    <Typography
      component={component}
      variant={variant || component}
      {...props}
      color="rgb(59, 73, 111)"
    >
      {children}
    </Typography>
  );
};

export default Heading;
