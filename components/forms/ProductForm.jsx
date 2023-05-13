import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
// import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

import { addProductSchema, updateProductSchema } from "@/lib/validation";

const defaults = {
  image: "",
  title: "",
  description: "",
  quantity: "",
};

export default function ProductForm({ submitHandler, product }) {
  let schema = addProductSchema;
  if (product) {
    schema = updateProductSchema;
  }
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: product || defaults,
  });

  useEffect(() => {
    console.log(formState);
  });

  const formRowStyle = {
    marginBlockEnd: "1em",
  };

  let submitFn = (vals) => {
    reset();
    console.log(vals);
    submitHandler(vals);
  };

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="image"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="image"
              fullWidth
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="title"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="description"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="description"
              multiline
              rows={4}
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="price"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="number"
              {...field}
              label="price"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="quantity"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="number"
              {...field}
              label="quantity"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2 }}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          primary="true"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
