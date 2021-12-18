import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../Components/Form/CustomInput";
import swal from "sweetalert";
import CategoryService from "../../Services/CategoryService";
const EditCategory = (props) => {
    const { params } = props.match;
    const [loading,setLoading] = useState(true);
    const [category,setCategory] = useState({});

    useEffect(() => {
        let categoryService = new CategoryService();
        const token = props.AuthStore.appState.user.access_token;
        categoryService.getById(params.id,token)
        .then((res) => {
            if(res.data.success){
                setCategory(res.data.category);
                setLoading(false);
            }
            else 
            {
                swal(res.data.message);
            }
        })
        .catch(e => console.log(e)); 
    },[]);


    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        let categoryService = new CategoryService();
        const token = props.AuthStore.appState.user.access_token;

        categoryService
            .update(params.id,values,token)
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

    if (loading) return <div>Yükleniyor</div>

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            name: category.name,
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
                                    className="btn btn-lg btn-success btn-block mb-5 mt-5"
                                    style={{ float: "right" }}
                                    type="button"
                                >
                                    Değişikliği Kaydet
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};
export default inject("AuthStore")(observer(EditCategory));
