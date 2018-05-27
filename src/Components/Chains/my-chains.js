import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../Actions/userActions';
import { chainActions } from '../../Actions/chainActions';
import './chains.css';

class MyChains extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(chainActions.getChains());
    }

    render() {

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
                        <button hidden={!this.props.chains[i].default} type="button" className="btn btn-info">Default</button>
                        <button hidden={this.props.chains[i].default} type="button" className="btn btn-outline-info">Default</button>
                    </th>

                    <th>
                        <button type="button" className="btn btn-warning">Update</button>
                    </th>

                    <th>
                        <button type="button" className="btn btn-danger">Danger</button>
                    </th>
                </tr>
            );
        }

        return (
            <div>
                <h2>MY-CHAINS</h2>
                <div className="table-responsive">
                    <table className="table">
                        <caption>www.reschain.com</caption>
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
});

MyChains = connect(mapStateToProps)(MyChains);


export default MyChains;
