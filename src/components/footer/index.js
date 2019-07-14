import Typography from "@material-ui/core/Typography";
import React from "react";

import useStyles from "../../consts/useStyles";
import Link from "@material-ui/core/Link";

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI
            </Link>
            {' team.'}
        </Typography>
    );
}

const Footer = () => {
   const classes = useStyles();
   return (
       <footer className={classes.footer}>
           <Typography variant="h6" align="center" gutterBottom>
               Footer
           </Typography>
           <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
               Something here to give the footer a purpose!
           </Typography>
           <MadeWithLove />
       </footer>
   );
};

export default Footer;
