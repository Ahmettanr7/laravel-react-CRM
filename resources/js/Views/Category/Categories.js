import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import CategoryService from "../../Services/CategoryService";
import Layout from "../Components/Layouts/Layout";
import MUIDataTable from "mui-datatables";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const Categories = (props) => {
    props.AuthStore.getToken();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let categoryService = new CategoryService();
        const token = props.AuthStore.appState.user.access_token;
        categoryService
            .getAll(token)
            .then((result) => {
                setCategories(result.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const deleteCategory = (items) => {
        swal({
            title: "Silme işlemini onayla",
            text:
                "Seçilen ürünler silinecek = " + items.map((item) => item.name),
            icon: "warning",
            buttons: true,
            buttons: {
                cancel: "İptal",
                ok: "Tamam",
            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let categoryService = new CategoryService();
                    const token = props.AuthStore.appState.user.access_token;
                    items.map((item) =>
                        categoryService.delete(item.id, token).then((result) => {
                            if (!result.data.success) {
                                window.location.reload();
                            }
                        })
                    );
                } else {
                    window.location.reload();
                }
            })
            .catch((e) => console.log(e));
    };
    const columns = [
        "#",
        "Kategori",
    ];
    const data = categories.map((category) => [
        category.id,
        category.name,
    ]);
    const options = {
        filter: true,
        filterType: "checkbox",
        responsive: "standard",
        searchPlaceholder: "Arama Yap",
        onRowClick: (event, rowData) => {
            window.location.href = "kategoriler/duzenle/" + event[0];
        },
        onRowsDelete: (rowsDeleted) => {
            const data = categories;
            const projectsToDelete = rowsDeleted.data.map(
                (d) => data[d.dataIndex]
            );
            //DB Category DELETE
            deleteCategory(projectsToDelete);
        },
    };
    return (
        <Layout>
            <div className="container mt-5 mb-5">
            <Link to="/kategoriler/ekle">
            <button className="btn btn-success" style={{float:'right'}} >Yeni Kategori Oluştur</button>
            </Link>
                <MUIDataTable
                    title={"Ürünler"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </Layout>
    );
};
export default inject("AuthStore")(observer(Categories));
