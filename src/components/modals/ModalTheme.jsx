import { useEffect, useState } from "react"
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem
} from "@mui/material"
import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import Label from "../layout/Label"

const categorias = [
    {
        id: 1,
        name: "Ropa"
    },
    {
        id: 2,
        name: "Maquillaje"
    },
    {
        id: 3,
        name: "Juguetes"
    },
    {
        id: 4,
        name: "Skincare"
    }
]

const ModalTheme = ({ setOpen, open }) => {
    const [newProducto, setnewProducto] = useState({
        nombreProducto: "",
        descripcion: "",
        precio: 0,
        categoria: "",
        imagen: ""
    })
    const { nombreProducto, descripcion, precio, categoria, imagen } = newProducto
    const { createTheme } = useTheme()

    const onChangeTheme = (e) => {
        if (e.target.name === 'imagen') {
            setnewProducto({ ...newProducto, imagen: e.target.files[0] })
        } else {
            setnewProducto({ ...newProducto, [e.target.name]: e.target.value })
        }
    }


    const handleClose = () => {
        setOpen(false)
        setnewProducto({
            nombreProducto: "",
            descripcion: "",
            precio: 0,
            categoria: "",
            imagen: ""
        })
    }

    const saveTheme = () => {
        const formData = new FormData()
        formData.append('nombreProducto', nombreProducto)
        formData.append('descripcion', descripcion)
        formData.append('precio', precio)
        formData.append('categoria', categoria)
        formData.append('imagen', imagen)
        createTheme(formData)
        setOpen(false)
        setnewProducto({
            nombreProducto: "",
            descripcion: "",
            precio: 0,
            categoria: "",
            imagen: ""
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Alta de producto
            </DialogTitle>
            <DialogContent  >
                <Box sx={{
                    gap: "15px",
                    marginTop: "20px",
                }}
                    component="form"
                >
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <Label
                            title=" Nombre del producto"
                        />
                        <OutlinedInput
                            name="nombreProducto"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={nombreProducto}
                            onChange={(e) => onChangeTheme(e)}
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <Label
                            title="Descripción"
                        />
                        <OutlinedInput
                            name="descripcion"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={descripcion}
                            onChange={(e) => onChangeTheme(e)}
                        />
                    </FormControl>

                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <Label
                            title="Precio"
                        />
                        <OutlinedInput
                            name="precio"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            type="number"
                            value={precio}
                            onChange={(e) => onChangeTheme(e)}
                        />
                    </FormControl>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Categorias
                        </InputLabel>
                        <Select
                            name="categoria"
                            sx={{ marginTop: "20px", marginBottom: "10px" }}
                            value={categoria}
                            onChange={(e) => onChangeTheme(e)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {categorias.map(categoriaIndex => (
                                <MenuItem
                                    value={categoriaIndex?.name}
                                    key={categoriaIndex.id}>
                                    {categoriaIndex.name}
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>

              


                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{ fontSize: "20px", color: "#000", marginLeft: "-15px" }}>
                            Imagen
                        </InputLabel>

                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            name="imagen"
                            onChange={onChangeTheme}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button sx={{ marginTop: "20px" }} variant="contained" component="span">
                                Cargar imagen
                            </Button>
                        </label>
                        <TextField
                            variant="outlined"
                            disabled
                            value={imagen ? imagen.name : ""}
                            fullWidth
                            sx={{ marginTop: "10px" }}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={() => saveTheme()}
                    autoFocus>
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>
    )
}

ModalTheme.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default ModalTheme