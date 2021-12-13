import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../Services/ProductService";
import { inject, observer } from "mobx-react";
import Select from "react-select";
import ImageUploader from "react-images-upload";
import CKEditor from "ckeditor4-react";
import Layout from "../Components/Layouts/Layout";
import swal from 'sweetalert';

const CreateProduct = (props) => {
    const [errors, setErrors] = useState([]);
    const productService = new ProductService();
    const options = [
        { value: 1, label: "Kategori1" },
        { value: 2, label: "Kategori2" },
        { value: 3, label: "Kategori3" },
    ];
    const [images, setImages] = useState([]);

    const createSchema = Yup.object().shape({
    });
    const formik = useFormik({
        initialValues: {
            categoryId: "",
            name: "",
            modelCode: "",
            barcode: "",
            brand: "",
            stock: "",
            text: "",
            tax: "",
            sellingPrice: "",
            buyingPrice: "",
        },
        validationSchema: createSchema,
        onSubmit: (values) => {
            const token = props.AuthStore.appState.user.access_token;
            const data = new FormData();
            images.forEach((image_file) => {
                data.append("file[]", image_file);
            });
            data.append("categoryId", values.categoryId);
            data.append("name", values.name);
            data.append("modelCode", values.modelCode);
            data.append("barcode", values.barcode);
            data.append("brand", values.brand);
            data.append("stock", values.stock);
            data.append("text", values.text);
            data.append("tax", values.tax);
            data.append("sellingPrice", values.sellingPrice);
            data.append("buyingPrice", values.buyingPrice);

            productService
                .add(data, token)
                .then((result) => {
                    if (result.data.success) {
                        formik.resetForm({})
                        setImages([])
                        swal(result.data.message)
                        props.history.push('/urunler');

                    } else {
                        swal(result.data.message)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        let err = error.response.data;
                        setErrors(err.errors);
                    } else if (error.request) {
                        let err = error.request;
                    }
                });
                
        },
    });

    let err = [];
    Object.values(errors).forEach((value) => {
        err.push(value);
    });

    return (
        <>
            <Layout>
                <div className="container text-center mt-5 mb-5">
                    <h3 className="mb-5">Yeni Ürün Oluştur</h3>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="form-signin"
                    >
                        {err.length != 0 &&
                            err.map((item, index) => (
                                <div className="alert" key={index}>
                                    <span>{item}</span>
                                </div>
                            ))}

                        <div className="row">
                            <div className="col-6">
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Ürün resmi seçin"
                                    onChange={(pictures) =>
                                        setImages(images.concat(pictures))
                                    }
                                    imgExtension={[".jpg", ".gif", ".png"]}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </div>
                            <div className="col-6">
                                <Select
                                    className="form-control"
                                    options={options}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            "categoryId",
                                            e.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    name="categoryId"
                                    placeholder="Kategori Seçiniz"
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    className="form-control mt-3"
                                    name="name"
                                    placeholder="Ürün Adı"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    name="modelCode"
                                    className="form-control mt-3"
                                    placeholder="Model Kodu"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    name="barcode"
                                    className="form-control mt-3"
                                    placeholder="Barkod"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    name="brand"
                                    className="form-control mt-3"
                                    placeholder="Marka"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="number"
                                    name="stock"
                                    className="form-control mt-3"
                                    placeholder="Stok"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="number"
                                    name="tax"
                                    className="form-control mt-3"
                                    placeholder="vergi"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="number"
                                    name="buyingPrice"
                                    className="form-control mt-3"
                                    placeholder="Alış Fiyatı"
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="number"
                                    name="sellingPrice"
                                    className="form-control mt-3"
                                    placeholder="Satış Fiyatı"
                                />
                            </div>
                        </div>
                        <CKEditor
                            onChange={(event) => {
                                const data = event.editor.getData();
                                formik.setFieldValue("text", data);
                            }}
                            name="text"
                            className="form-control mt-3"
                        />

                        <button
                            disabled={!formik.isValid || formik.isSubmitting}
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                        >
                            Ürün Oluştur
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    );
};
export default inject("AuthStore")(observer(CreateProduct));
