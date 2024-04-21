import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"

const HeaderForm = ({ title, subTitle }) => {
    return (
        <Box sx={{
            marginBottom: "20px",
            width: "300px"
        }}>
           <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>AnabellasShop</Typography>
            <Typography sx={{ color: '#3F3F3F', fontSize: '28px', marginTop: "30px", fontWeight: "bold" }}>{title}</Typography>
            <Typography sx={{ color: '#949494', fontSize: '16px' }}>{subTitle}</Typography>
        </Box>
    )
}
HeaderForm.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
}
export default HeaderForm