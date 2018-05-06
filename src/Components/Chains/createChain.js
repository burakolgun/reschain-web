import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiService } from '../../Services/apiService';
import { alertActions } from '../../Actions/userActions';
import { chainActions } from '../../Actions/chainActions';
import './chains.css';
import Loading from "../Loading/loading";

class CreateChains extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chain: [],
            toggle: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render() {
        const display = {
            display: 'block'
        };
        const hide = {
            display: 'none'
        };

        return (
            <div className="create-chain" style={this.state.toggle ? display : hide}>
                <form>
                    <div className={'form-group'}>
                        <input type="text"
                            className="form-control"
                            name="chain-name"
                            value={registerPassword}
                            onChange={this.handleChange}
                            placeholder="Chain Name" />
                            <div className="help-block">Chain Name is required</div>                    
                    </div>
                    <div className={'form-group'}>
                        <input type="text"
                            className="form-control"
                            name="chain-start-date"
                            value={registerPassword}
                            onChange={this.handleChange}
                            placeholder="Chain Start Date" />
                            <div className="help-block">Chain Start Date is required</div>                        
                    </div>
                    <div className={'form-group'}>
                        <input type="text"
                            className="form-control"
                            name="chain-end-date"
                            value={registerPassword}
                            onChange={this.handleChange}
                            placeholder="Chain End Date" />
                            <div className="help-block">Chain End Date is required</div>                        
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    chains: state.chainReducer.chains,
});

Chains = connect(mapStateToProps)(Chains);

export default Chains;
