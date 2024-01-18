"use client";
import React from "react";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { TiUpload } from "react-icons/ti";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import { deleteImg, uploadImg } from "@/lib/features/upload/uploadSlice";
import { createBlog } from "@/lib/features/blog/blogSlice";
import { Image } from "@chakra-ui/react";

const AddBlog = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      comments: [],
      images: [],
    },
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
    },
  });
  const newBlog = useAppSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogData } =
    newBlog;

  return (
    <div className="flex flex-col p-24">
      <form action="" className="flex-col flex" onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <div>
            <input
              className="border border-1 p-2 rounded w-full"
              type="text"
              id="title"
              name="title"
              placeholder="Blog title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
          <div>
            <textarea
              className="border border-1 rounded mt-3 p-2 w-full"
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              placeholder="Description"
            />
          </div>
          <div className="p-4 text-center border rounded mt-5 ">
            <Dropzone
              onDrop={(acceptedFiles) =>
                dispatch(uploadImg(acceptedFiles))
                  .unwrap()
                  .then((images) => {
                    formik.setFieldValue("images", [
                      ...formik.values.images,
                      ...images,
                    ]);
                  })
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="flex justify-center items-center"
                  >
                    <input {...getInputProps()} />
                    <TiUpload className="text-6xl" />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="flex flex-row">
            {formik.values.images?.map((image, index) => (
              <div className="p-2" key={index}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(deleteImg(image.public_id)).then(() => {
                      const images = formik.values.images.filter(
                        (img) => img.public_id !== image.public_id
                      );
                      formik.setFieldValue("images", [...images]);
                    });
                  }}
                  className="border"
                  style={{ top: "7px", right: "7px" }}
                >
                  Delete
                </button>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-red-300 p-2 rounded my-4">
              Add Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
