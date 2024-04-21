import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../config/axios"

const ThemeGlobalContext = createContext()

const ThemeGlobalProvider = ({ children }) => {
    const [themes, setThemes] = useState([])
    const [openToast, setOpenToast] = useState(false)
    const [toastAttributes, setToastAttributes] = useState({
        icon: '',
        message: '',
        background: '',
    })

    useEffect(() => {
        getThemes()
    }, [])

    const getThemes = async () => {
        try {
            const { data } = await api.get('/api/productos')
            setThemes(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTheme = async (theme) => {
        try {
            const { data } = await api.post('/api/productos', theme)
            setThemes([...themes, data])
            console.log(data)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data?.msg}`,
                background: "#FF5252",
            })
        }
    }

    const deleteProductos = async (id) => {
        try {
            await api.delete(`/api/productos/${id}`)
            const themesFilers = themes.filter(them => them._id !== id)
            setThemes(themesFilers)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setToastAttributes({
                icon: "error",
                message: `${error?.response?.data}`,
                background: "#FF5252",
            })
        }
    }


    return (
        <ThemeGlobalContext.Provider
            value={{
                // state
                openToast,
                toastAttributes,
                themes,
                //methods
                createTheme,
                setToastAttributes,
                setOpenToast,
                deleteProductos

            }}
        >{children}
        </ThemeGlobalContext.Provider>
    )
}

export {
    ThemeGlobalProvider
}
ThemeGlobalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default ThemeGlobalContext