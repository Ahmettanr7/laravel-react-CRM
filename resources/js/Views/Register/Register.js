import React, { useState } from "react";
//import "../../../css/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../Services/AuthService";
import { inject, observer } from "mobx-react";

const Register = (props) => {
    
    const [errors,setErrors] = useState([]);
    const authService = new AuthService();
    const authSchema = Yup.object().shape({
        email: Yup.string()
            .email("E-Posta formatı hatalı")
            .required("Email zorunludur"),
        name: Yup.string().required("Ad Soyad zorunludur"),
        password: Yup.string()
            .required("Şifreyi boş bırakamazsınız")
            .min(5, "Şifreniz en az 5 karakterli olmalıdır."),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Şifreler eşleşmiyor"
        ),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: authSchema,
        onSubmit: (values) => {
            authService.register(values).then((result)=>{
                if (result.data.success) {
                    const userData = {
                        id:result.data.id,
                        name:result.data.name,
                        email:result.data.email,
                        access_token:result.data.access_token
                    };
                    const appState = {
                        isLoggedIn:true,
                        user:userData
                    };
                    props.AuthStore.saveToken(appState);
                    alert('Kayıt Başarılı');
                }else{
                    alert('Giriş başarısız');
                }
            })
            .catch(error=>{
               if (error.response) {
                   let err = error.response.data;
                   setErrors(err.errors);
               }else if(error.request){
                   let err = error.request;
               }
            })
        },
    });
    
    let err=[];
    Object.values(errors).forEach(value => {
        err.push(value)
    });

    return (
        <div className="text-center">
           
            <form onSubmit={formik.handleSubmit} className="form-signin" >
                <img
                    className="mb-4"
                    src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                    alt=""
                    width="72"
                    height="72"
                />
                <h1 className="h3 mb-3 font-weight-normal">CRM Yeni Üye</h1>
                {err.length != 0 && err.map((item,index)=>(<p key={index}>{item}</p>))}
            {formik.errors.email && formik.touched.email ? (
                <div className="alert">
                    <span>{formik.errors.email}</span>
                </div>
            ) : (
                <div></div>
            )}
            {formik.errors.password && formik.touched.password ? (
                <div className="alert">
                    <span>{formik.errors.password}</span>
                </div>
            ) : (
                <div></div>
            )}
            {formik.errors.name && formik.touched.name ? (
                <div className="alert">
                    <span>{formik.errors.name}</span>
                </div>
            ) : (
                <div></div>
            )}
            {formik.errors.password_confirmation &&
            formik.touched.password_confirmation ? (
                <div className="alert">
                    <span>{formik.errors.password_confirmation}</span>
                </div>
            ) : (
                <div></div>
            )}
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Ad Soyad"
                    required
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    id="inputEmail"
                    className="form-control mt-3"
                    name="email"
                    placeholder="Email address"
                    required
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control mt-3"
                    placeholder="Password"
                    required
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    id="inputPasswordconf"
                    name="password_confirmation"
                    className="form-control mt-3"
                    placeholder="Password"
                    required
                />
                <div className="checkbox mb-3"></div>
                <button
                disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Kayıt Ol
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; 2019-2021</p>
            </form>
        </div>
    );
}
export default inject("AuthStore")(observer(Register));