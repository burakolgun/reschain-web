import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chainActions } from '../../Actions/chainActions';
import Modal from 'react-modal';
import './chains.css';

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
            id: chain.id
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
        console.log(name);
        if (name === 'name') {
            this.setState({name: event.target.value});
        }

        if (name === 'startDate') {
            console.log( event.target.value);
            this.setState({startDate: event.target.value});
        }

        if (name === 'endDate') {
            console.log( event.target.value);
            this.setState({endDate: event.target.value});
        }

        if (name === 'note') {
            console.log( event.target.value);
            this.setState({note: event.target.value});
        }
    }

    handleSubmit(event) {
        const { dispatch } = this.props;
        dispatch(chainActions.postChain(
            {
                name: this.state.name,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                note: this.state.note,
        },
            this.state.id)
        );
        event.preventDefault();

        this.closeModal();
    }

    render() {

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
                    <button type="button" className="btn btn-primary btn-lg btn-block">ADD NEW CHAIN</button>
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

const mapStateToProps = (state) => ({
    chains: state.chainReducer.chains,
    loggingIn: state.loginReducer.loggingIn,
});

MyChains = connect(mapStateToProps)(MyChains);
export default MyChains;
