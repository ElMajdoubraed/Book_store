import React, { useState } from "react";
import { Grid } from "@mui/material";
import { FileInput } from ".";
import styled from "styled-components";

type ImageInputProps = {
  name?: string;
  label: string;
  required?: boolean;
  type?: string;
  value?: any;
  accept?: string;
  setImageFunction?: (value: any) => void;
  variant?: "filled" | "outlined" | "standard";
};

const StyledImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  padding: 5px;

  @media (max-width: 600px) {
    width: 100%;
  }

  &:hover {
    border: 1.5px dashed #29221f;
  }
`;
export const ImageInput = ({
  name,
  label,
  required = false,
  value,
  setImageFunction,
  ...props
}: ImageInputProps) => {
  const [image, setImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const imagePreviewHandler = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
        setImageFunction && setImageFunction(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]) as any);
      }
    } catch (e) {}
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <FileInput
          name={name}
          label={label}
          required={required}
          onChange={imagePreviewHandler}
          accept="image/*"
          {...props}
        />
      </Grid>
      {imagePreview && (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
          item
          xs={12}
          md={12}
        >
          <StyledImage src={imagePreview} alt={label} />
        </Grid>
      )}
    </Grid>
  );
};
