import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {userActions} from "../../Actions/userActions";
import '../../Container/header/header.css';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

const options = [
    'Calendar',
    'Chains',
    'Logout'
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUserName: '',
            loginEmail: '',
            loginPassword: '',
            loginSubmitted: false,
            loginMessage: '',
            anchorEl: null,
            tab: -1,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (option) => {
        this.setState({ tab: option });
        this.handleClose()
    };

    logOut = () => {
        const { dispatch } = this.props;
        dispatch(userActions.logOut())
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        if (this.state.tab === 'Logout') {
            this.logOut()
        }

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className="rightFull"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option}
                                  onClick={
                                      (e) => {
                                          this.handleChange(option)
                                      }
                                  }
                                  >
                            <Link to={'/' + option.toLowerCase()}>{option}</Link>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default LongMenu;
