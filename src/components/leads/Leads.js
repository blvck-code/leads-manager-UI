import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getLeads, deleteLead} from '../../actions/leads'

function Leads({leads, getLeads, deleteLead}) {

    const propTypes = () => ({
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired
    })

    useEffect(() => {
        getLeads();
        propTypes()
    }, [])


    return (
        <div className="col-md-8 col-sm-10 m-auto">
            <h3>Leads</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <tr key={lead.id}>
                            <td>{lead.id}</td>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.message}</td>
                            <td><button onClick={() => deleteLead(lead.id)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    leads: state.leads.leads
})

export default connect(mapStateToProps, {getLeads, deleteLead})(React.memo(Leads))
