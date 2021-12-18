import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import ProductService from "../../Services/ProductService";
import Layout from "../Components/Layouts/Layout";
import MUIDataTable from "mui-datatables";
import swal from "sweetalert";
const Products = (props) => {
    props.AuthStore.getToken();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let productService = new ProductService();
        const token = props.AuthStore.appState.user.access_token;
        productService
            .getAll(token)
            .then((result) => {
                setProducts(result.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const deleteProduct = (items) => {
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
                    let productService = new ProductService();
                    const token = props.AuthStore.appState.user.access_token;
                    items.map((item) =>
                        productService.delete(item.id, token).then((result) => {
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
        "Ürün",
        "Kategori",
        "Marka",
        "Model",
        "Stok",
        "Alış",
        "Satış",
    ];
    const data = products.map((product) => [
        product.id,
        product.name,
        product.category[0].name,
        product.brand,
        product.modelCode,
        product.stock,
        product.buyingPrice,
        product.sellingPrice,
    ]);
    const options = {
        filter: true,
        filterType: "checkbox",
        responsive: "standard",
        searchPlaceholder: "Arama Yap",
        onRowClick: (event, rowData) => {
            window.location.href = "urunler/duzenle/" + event[0];
        },
        onRowsDelete: (rowsDeleted) => {
            const data = products;
            const projectsToDelete = rowsDeleted.data.map(
                (d) => data[d.dataIndex]
            );
            //DB PRODUCT DELETE
            deleteProduct(projectsToDelete);
        },
    };
    return (
        <Layout>
            <div className="container mt-5 mb-5">
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
export default inject("AuthStore")(observer(Products));
