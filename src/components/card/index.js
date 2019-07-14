import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";
import useStyles from "../../consts/useStyles";
import task88 from "../../media/task/task88.png";

const GameCard = ({taskId}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={task88}
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    LEVEL {taskId}
                </Typography>
                <Typography>
                    Best Time: 100 seconds
                </Typography>
                <Typography>
                    Best Steps: 100 steps
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Play
                </Button>
            </CardActions>
        </Card>
    );
};

export default GameCard;