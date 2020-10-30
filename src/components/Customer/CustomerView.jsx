import React, { useState } from 'react';
import { makeStyles, Paper, Tabs, Tab, Grid, Button, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Create from './Create.jsx';
import FriendsList from './Social/FriendsList.jsx';
import Messages from './Social/Messages.jsx';
import Logout from '../Logout.jsx'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        maxWidth: "100vw",
        position: 'sticky',
        bottom: 0
    },
});

const CustomerView = ({setViewValue}) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderView = () => {
        if (value === 0) {
            return <FriendsList />
        }
        if (value === 1) {
            return <Create />
        }
        if (value === 2) {
            return <Messages />
        }
        if (value === 3) {
            return <OwnerProfile />
        }
        return (<div>PLACE INSTRUCTIONS HERE</div>)
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row">
                <Logout setViewValue={setViewValue} /> 
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderView()}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Paper className={classes.root}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                    >
                    <BottomNavigationAction label="Friends" icon={<PeopleAltIcon />} />
                    <BottomNavigationAction label="Creatwe" icon={<AddCircleOutlineIcon />} />
                    <BottomNavigationAction label="Messages" icon={<ForumIcon />} />
                    <BottomNavigationAction label="Profile" icone={<AccountCircleOutlinedIcon/>} />
                </BottomNavigation>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default CustomerView;