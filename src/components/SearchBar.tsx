import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addUrl } from "../redux/reducers/urlList.reducer";

import React from "react";

const schema = yup
  .object({
    url: yup
      .string()
      .required()
      .test(
        "empty",
        "Url cannot be an empty string",
        (value) => value.trim() !== ""
      )
      .test(
        "minLength",
        "Length > 3 characters",
        (value) => value.trim().length >= 3 && value.trim().length <= 100
      ),
    label: yup
      .string()
      .required()
      .test(
        "empty",
        "Label cannot be an empty string",
        (value) => value.trim() !== ""
      )
      .test(
        "minLength",
        "Length > 3 characters",
        (value) => value.trim().length >= 3 && value.trim().length <= 100
      ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  console.log("error", errors);

  const onSubmit = (data: FormData) => {
    if (errors.label || errors.url) return;

    console.log("pass checked");
    if (!data?.url.includes("https://")) {
      let https = "https://";
      data.url = https + data.url;
    }
    dispatch(addUrl({ ...data }));
  };

  return (
    <div className="SearchSection">
      <form className="SearchBar" onSubmit={handleSubmit(onSubmit)}>
        <div className="SearchItem">
          <span>Https://</span>
          <input
            placeholder="Type in...."
            {...register("url", {
              required: true,
            })}
          />
          <p>{errors.url?.message}</p>
        </div>
        <div className="SearchItem">
          <span>Label</span>
          <input
            placeholder="Type in...."
            {...register("label", { required: true })}
          />
          <p>{errors.label?.message}</p>
        </div>
        <input
          className={`submitBtn ${errors.url || errors.label ? "" : "active"}`}
          type="submit"
          value={"Save"}
        />
      </form>
    </div>
    // <div className="SearchSection">
    //   <Box
    //     component="form"
    //     sx={{
    //       "& > :not(style)": { m: 1, display: "block" },
    //       width: "100%",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexDirection: "column",
    //     }}
    //     autoComplete="off"
    //   >
    //     <MemorizeTextField
    //       id="outlined-basic"
    //       label="Https://"
    //       variant="outlined"
    //       name="url"
    //       onChange={handleChangeUrl}
    //       defaultValue={form.url}
    //     />
    //     <MemorizeTextField
    //       id="outlined-basic"
    //       label="Label"
    //       variant="outlined"
    //       name="label"
    //     />
    //     <button type="submit" className="btnSaveManual">
    //       Save
    //     </button>
    //   </Box>
    //   {/* <input type="text" onChange={handleChangeInput} />
    //   <button type="submit" className="btnSaveManual">
    //     Save
    //   </button> */}
    // </div>
  );
};

export default SearchBar;
