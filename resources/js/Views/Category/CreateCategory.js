import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../Components/Form/CustomInput";
import swal from "sweetalert";
import CategoryService from "../../Services/CategoryService";
const CreateCategory = (props) => {
    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        let categoryService = new CategoryService();
        const token = props.AuthStore.appState.user.access_token;

        categoryService
            .add(values, token)
            .then((res) => {
                if (res.data.success) {
                    swal(res.data.message);
                    props.history.push("/kategoriler")
                } else {
                    swal(res.data.message);
                    setSubmitting(true);
                }
            })
            .catch((e) => {
                setSubmitting(true);
                console.log(e);
            });
    };

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            name: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(
                                "Kategori Adı Zorunludur"
                            )
                        })}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            errors,
                            isValid,
                            isSubmitting,
                            setFieldValue,
                            touched,
                        }) => (
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CustomInput
                                            title="Kategori Adı *"
                                            value={values.name}
                                            handleChange={handleChange("name")}
                                            handleBlur={handleBlur("name")}
                                        />
                                        {errors.name && touched.name && (
                                            <p className="form-error">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn btn-lg btn-success btn-block mb-5 "
                                    style={{ float: "right" }}
                                    type="button"
                                >
                                    Ürünü Ekle
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};
export default inject("AuthStore")(observer(CreateCategory));
