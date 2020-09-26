import React, {useEffect} from 'react'
import useInput from '../hooks/useInput'
import { connect } from 'react-redux'
import {addLead} from '../../actions/leads'
import PropTypes from 'prop-types'


function Form({addLead}) {

    const [name, bindName, resetName] =  useInput('')
    const [email, bindEmail, resetEmail] = useInput('')
    const [message, bindMessage, resetMessage] = useInput('')

    const propType = () => ({
        addLead: PropTypes.func.isRequired
    })

    useEffect(() => {
        propType()
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        addLead(name, email, message)

        resetName();
        resetEmail();
        resetMessage();
    }
        

    return (
        <div className="col-md-8 col-sm-10 m-auto">
            <div className="card card-body mt-4 mb-4">
                <h3>Add Lead</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            {...bindName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            {...bindEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea 
                            className="form-control"
                            type="text"
                            {... bindMessage}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, {addLead})(React.memo(Form))
