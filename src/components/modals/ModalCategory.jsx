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
} from "@mui/material"
import PropTypes from "prop-types"
import useCategory from "../../hooks/useCategory"
const ModalCategory = ({ setOpen, open }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [newCategory, setNewCategory] = useState({
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    })
    const { name, lastName, userName, email, password } = newCategory
    const { crateCategory, contentCategoryObject, setContentCategoryObject, editCategory } = useCategory()

    useEffect(() => {
        if (contentCategoryObject !== null) {
            setIsEdit(true)
            setNewCategory(contentCategoryObject)
        }
    }, [contentCategoryObject])



    const onChangeCategory = (e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value })

    const handleClose = () => {
        setOpen(false)
        setNewCategory({
            name: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
        })
        setContentCategoryObject(null)
        setIsEdit(false)
    }

    const saveCategory = () => {
        if (isEdit) {
            editCategory(newCategory)
        } else {
            crateCategory(newCategory)

        }
        setOpen(false)
        setNewCategory({
            name: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
        })
        setContentCategoryObject(null)
        setIsEdit(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {isEdit ? "Editando usuario" : "Alta de usuario"}
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
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Nombre
                        </InputLabel>

                        <OutlinedInput
                            name="name"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={name}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Apellidos
                        </InputLabel>

                        <OutlinedInput
                            name="lastName"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={lastName}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Usuario
                        </InputLabel>

                        <OutlinedInput
                            name="userName"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={userName}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Correo
                        </InputLabel>

                        <OutlinedInput
                            name="email"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={email}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>

                    {!isEdit && (
                        <FormControl
                        variant="standard"
                        sx={{ width: "100%" }}>
                        <InputLabel shrink sx={{
                            fontSize: "20px",
                            color: "#000",
                        }}>
                            Contraseña
                        </InputLabel>

                        <OutlinedInput
                            name="password"
                            sx={{
                                marginTop: "30px",
                                marginBottom: "30px"
                            }}
                            value={password}
                            onChange={(e) => onChangeCategory(e)}
                        />
                    </FormControl>
                    )}
                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={() => saveCategory()}
                    autoFocus>
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>
    )
}

ModalCategory.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
}

export default ModalCategory