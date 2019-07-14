import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../consts/useStyles";

const Header = () => {
    const classes = useStyles();
    return (<AppBar position="relative">
        <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
                Album layout
            </Typography>
        </Toolbar>
    </AppBar>);
};

export default Header;