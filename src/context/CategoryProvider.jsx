import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../config/axios"
import { formatDate } from "../helpers/formatDate"

const CategoryContext = createContext()

const CategoryProvider = ({ children }) => {
    const [contentCategorys, setContentCategorys] = useState([])
    const [contentCategoryObject, setContentCategoryObject] = useState(null)
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    useEffect(() => {
        getAllCategorys()
    }, [])

    const getAllCategorys = async () => {
        try {
            const { data } = await api.get('/api/user')
            const usersFormat = data?.map(user => {
                return {
                    _id: user?._id,
                    name: user?.name,
                    lastName: user?.lastName,
                    userName: user?.userName,
                    email: user?.email
                }

            })

            setContentCategorys(usersFormat)
        } catch (error) {
            console.log(error)
        }
    }

    const crateCategory = async (newCategory) => {
        try {
            const { data } = await api.post('/api/user', newCategory)
            const userFormat = {
                _id: data?._id,
                name: data?.name,
                lastName: data?.lastName,
                userName: data?.userName,
                email: data?.email
            }
            setContentCategorys([...contentCategorys, userFormat])
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: 'Se creo el usuario con exito',
                background: '#4CAF50',
            })
        } catch (error) {
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }

    const editCategory = async (category) => {
        try {
            const { data } = await api.put(`/api/user/${category?._id}`, category)
            const categoryOriginal = contentCategorys.find(categoryIndex => categoryIndex?._id === category?._id)
             const userFormat = {
                _id: data?._id,
                name: data?.name,
                lastName: data?.lastName,
                userName: data?.userName,
                email: data?.email
            }
            Object.assign(categoryOriginal, userFormat)
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: 'Se edito el usuario con exito!',
                background: '#4CAF50',
            })
        } catch (error) {
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }

    const deleteCategory = async (id) => {
        try {
            const { data } = await api.delete(`/api/user/${id}`)
            const categorysFilter = contentCategorys.filter(categoryIndex => categoryIndex._id !== id)
            setContentCategorys(categorysFilter)
            setOpenToast(true)
            setToastAttributes({
                icon: 'success',
                message: `${data?.msg}`,
                background: '#4CAF50',
            })
        } catch (error) {
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }

    const getCategoryId = (id) => {
        const categoryObject = contentCategorys.find(categoryIndex => categoryIndex._id === id)
        setContentCategoryObject(categoryObject)
    }

    return (
        <CategoryContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                contentCategorys,
                contentCategoryObject,
                //methods
                setToastAttributes,
                crateCategory,
                setOpenToast,
                getCategoryId,
                setContentCategoryObject,
                editCategory,
                deleteCategory

            }}
        >{children}
        </CategoryContext.Provider>
    )
}

export {
    CategoryProvider
}
CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default CategoryContext