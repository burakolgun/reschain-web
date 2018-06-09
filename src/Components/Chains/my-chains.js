import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chainActions } from '../../Actions/chainActions';
import Modal from 'react-modal';
import './chains.css';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

Modal.setAppElement('body');

class MyChains extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: null,
            startDate: new Date(),
            endDate: null,
            note: null,
            id: null
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal(e, chain) {
        this.setState({
            name: chain.name,
            startDate: chain.startDate,
            endDate: chain.endDate,
            note:chain.note,
            id: chain.id,
            open: false,
        });

        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(chainActions.getChains());
    }

    deleteChain = (e, id) => {
        const { dispatch } = this.props;
        dispatch(chainActions.deleteChain(id));
    };

    createChain = (id, e) => {
        const { dispatch } = this.props;
    };

    doDefault = (id, e) => {
        const { dispatch } = this.props;
        dispatch(chainActions.doDefault(id));
    };

    handleChange(event, name) {
        if (name === 'name') {
            this.setState({name: event.target.value});
        }

        if (name === 'startDate') {
            this.setState({startDate: event.target.value});
        }

        if (name === 'endDate') {
            this.setState({endDate: event.target.value});
        }

        if (name === 'note') {
            this.setState({note: event.target.value});
        }
    }

    handleSubmit(event) {
        const { dispatch } = this.props;
        if (this.state.id === -1) {
            dispatch(chainActions.newChain(
                {
                    name: this.state.name,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    note: this.state.note,
                }))
        } else {
            dispatch(chainActions.postChain(
                {
                    name: this.state.name,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    note: this.state.note,
                },
                this.state.id)
            );
        }
        event.preventDefault();

        this.closeModal();
    }

    handleClickOpen = () => {
        this.setState({
            name: '',
            startDate: '',
            endDate: '',
            note: '',
            open: true,
            id: -1
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        if (!this.props.loggingIn) {
            this.props.history.push('/login');
        }

        let tbody = [];
        for (let i = 0; i < this.props.chains.length; i++) {
            tbody.push(
                <tr key={this.props.chains[i].id}>
                    <th>{i + 1}</th>
                    <th>{this.props.chains[i].name}</th>
                    <th>{this.props.chains[i].startDate}</th>
                    <th>{this.props.chains[i].endDate}</th>
                    <th>{this.props.chains[i].note}</th>

                    <th>
                        <button hidden={!this.props.chains[i].default}
                                type="button" className="btn btn-info"
                            >Default
                        </button>
                        <button hidden={this.props.chains[i].default}
                                type="button" className="btn btn-outline-info"
                                onClick={
                                    (e) => {
                                        this.doDefault(this.props.chains[i].id, e)
                                    }
                                }
                        >Default
                        </button>
                    </th>

                    <th>
                        <button type="button" className="btn btn-warning"
                                onClick={
                                    (e) => {
                                        this.openModal(e, this.props.chains[i])
                                    }
                                }>
                            Update!</button>
                    </th>

                    <th>
                        <button type="button" 
                            className="btn btn-danger"
                            onClick={
                                (e) => {if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.deleteChain(this.props.chains[i].id, e)
                                }
                            }>
                            Delete!
                        </button>
                    </th>
                </tr>
            );
        }

        let modal =
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.name}</h2>
                <span className={"modal-close"} onClick={this.closeModal}>x</span>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={(e) => {this.handleChange(e, 'name')}} />
                    </label>
                    <label>
                        Start Date:
                        <input type="date" value={this.state.startDate} onChange={(e) => {this.handleChange(e, 'startDate')}} />
                    </label>
                    <label>
                        End  Date:
                        <input type="date" value={this.state.endDate} onChange={(e) => {this.handleChange(e, 'endDate')}} />
                    </label>
                    <label>
                        Note:
                        <input type="text" value={this.state.note} onChange={(e) => {this.handleChange(e, 'note')}} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </Modal>;

        return (
            <div>
                {modal}
                <h2>MY-CHAINS</h2>
                <div className="table-responsive">
                    <div>
                        <Button variant="contained" color="primary" className="btn btn-lg btn-block" onClick={this.handleClickOpen}>ADD NEW CHAIN</Button>
                        <Dialog
                            fullScreen
                            open={this.state.open}
                            onClose={this.handleClose}
                            TransitionComponent={Transition}
                        >
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="title" color="inherit" className={classes.flex}>
                                        Sound
                                    </Typography>
                                    <Button color="inherit" onClick={this.handleSubmit}>
                                        save
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <List>
                                <ListItem>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Chain Name"
                                        type="text"
                                        fullWidth
                                        value={this.state.name}
                                        onChange={(e) => {this.handleChange(e, 'name')}}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Start Date" secondary="Today" />
                                    <input type="date" value={this.state.startDate} onChange={(e) => {this.handleChange(e, 'startDate')}} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="End Date" secondary="Today" />
                                    <input type="date" value={this.state.endDate} onChange={(e) => {this.handleChange(e, 'endDate')}} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Chain Note"
                                        type="text"
                                        fullWidth
                                        value={this.state.note}
                                        onChange={(e) => {this.handleChange(e, 'note')}}
                                    />
                                </ListItem>
                            </List>
                        </Dialog>
                    </div>
                    <table className="table">
                        <caption>www.reschain.co</caption>
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Note</th>
                            <th scope="col">Do Default</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tbody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

MyChains.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    chains: state.chainReducer.chains,
    loggingIn: state.loginReducer.loggingIn,
});

MyChains = connect(mapStateToProps)(MyChains);
export default withStyles(styles)(MyChains);
