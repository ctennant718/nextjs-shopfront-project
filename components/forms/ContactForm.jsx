import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
// import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup
  .object()
  .shape({
    from: yup.string().email().max(50).required(),
    subject: yup.string().max(300).required(),
    message: yup.string().max(50000).required(),
  })
  .required();

const defaults = {
  form: "",
  subject: "",
  message: "",
};

export default function ContactForm({ submitHandler }) {
  // console.log(car);

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  useEffect(() => {
    console.log(formState);
  })

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
          name="from"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="from"
              {...field}
              label="from"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="subject"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="subject"
              {...field}
              label="subject"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="message"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="message"
              {...field}
              label="message"
              multiline
              rows={4}
              fullWidth
              error={!!errors.message}
              helperText={errors.message?.message}
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