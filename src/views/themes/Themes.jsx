import { useState } from "react"
import ModalTheme from "../../components/modals/ModalTheme"
import { Box, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useTheme from "../../hooks/useTheme"
import AddIcon from "@mui/icons-material/Add"
import useAuth from "../../hooks/useAuth"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import DeleteIcon from "@mui/icons-material/Delete"

const ROLE_READER = "reader"
const ROLE_ADMIN = "admin"

const tableStyles = {
    iconBlue: {
        color: "#2196F3"
    }
}

const Themes = () => {
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentElement, setCurrentElement] = useState(null)

    const { themes } = useTheme()
    const { user } = useAuth()

    const handleMenuClick = (event, data) => {
        setAnchorEl(event.currentTarget)
        setCurrentElement(data)
        setOpenMenu(true)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setCurrentElement(null)
        setOpenMenu(false)
    }

    const handleMenuItemClick = (accion, data) => {
        if (accion === "edit") {
            // editFunction(data)
            console.log('editando')
            console.log(data)
        } else if (accion === "delete") {
            console.log('eliminando')
            // deleteFunction(data)
        }

        handleClose()
    }


    return (
        <Box sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "95%"
        }}>
            <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 600, color: "#3F3F3F", my: "32px" }}>Productos</Typography>
            {
                user?.userType !== ROLE_READER && (
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        startIcon={<AddIcon />}
                        sx={{
                            background: "#2196F3",
                            fontSize: "12px",
                            textTransform: "none",
                            boxShadow: "none",
                            marginBottom: "20px"
                        }}
                    >
                        Nuevo producto
                    </Button>
                )
            }
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
            }}>
                {
                    themes?.map(productosIndex => (
                        <Card key={productosIndex?._id} sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    user?.userType !== ROLE_READER ?
                                        <div>
                                            <IconButton
                                                id="basic-button"
                                                aria-controls={openMenu ? "basic-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openMenu ? "true" : undefined}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleMenuClick(e, productosIndex)
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                onClose={handleClose}
                                                elevation={1}
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleMenuItemClick("edit", currentElement)
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <BorderColorOutlinedIcon
                                                            fontSize="small"
                                                            sx={tableStyles.iconBlue}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText>Editar</ListItemText>
                                                </MenuItem>
                                                {
                                                    user?.userType === ROLE_ADMIN && (
                                                        <MenuItem
                                                            onClick={() =>
                                                                handleMenuItemClick("delete", currentElement)
                                                            }
                                                        >
                                                            <ListItemIcon>
                                                                <DeleteIcon
                                                                    fontSize="small"
                                                                    sx={tableStyles.iconBlue}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText>Eliminar</ListItemText>
                                                        </MenuItem>
                                                    )
                                                }
                                            </Menu>
                                        </div>
                                        : null
                                }
                                title={productosIndex?.nombreProducto}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={productosIndex?.imagen}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    <b>Descripción:</b> {productosIndex?.descripcion}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Categoria: </b>{productosIndex?.categoria}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Precio: </b>${(productosIndex?.precio / 100)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }

            </Box>
            <ModalTheme
                open={open}
                setOpen={setOpen}
            />
            {/* <ToastAlert
                openToast={openToast}
                message={toastAttributes.message}
                background={toastAttributes.background}
                icon={toastAttributes.icon}
                handleClose={handleCloseToast}
            /> */}
        </Box>
    )
}

export default Themes