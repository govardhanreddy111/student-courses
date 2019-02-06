import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Student from '../../components/Student/Student'
import Staff from '../../components/Staff/Staff';
import Course from '../../components/Course/Course';

const TabContainer = ({ children, dir }) => {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children === 'student' ? <Student/> : null}
            {children === 'staff' ? <Staff /> : null}
            {children === 'course' ? <Course /> : null}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class MainTabs extends Component{
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered={true}
                    >
                        <Tab label="STUDENT" />
                        <Tab label="STAFF" />
                        <Tab label="COURSE" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>student</TabContainer>
                    <TabContainer dir={theme.direction}>staff</TabContainer>
                    <TabContainer dir={theme.direction}>course</TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainTabs);

MainTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};