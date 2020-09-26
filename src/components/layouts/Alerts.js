import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


function Alerts({error, message, auth}) {

    const propTypes = () => ({
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    })

    useEffect(() => {
        const alert = document.querySelector('.alert')
        const alert2 = document.querySelector('.alert2')

        propTypes()
        
        if(error.status !== null){

            if(error.msg.error) {
                alert.innerHTML += `
                <div class="alert-item">
                    <h5>${error.msg.error}</h5>
                </div>
                `;
                alert.style.color = "red"
            }

            if(error.msg.non_field_errors) {

                alert.innerHTML += `
                    <h5> ${error.msg.non_field_errors.join()}</h5>
                `;   
                alert.style.color = "red"
            }

            if(error.msg.name) {

                alert.innerHTML += `
                <div class="alert-item">
                    <h5><span>name:</span> ${error.msg.name.join()}</h5>
                </div>
                `;   
                alert.style.color = "red"
            }
            
            if(error.msg.email) {

                alert.innerHTML += `
                <div class="alert-item">
                    <h5><span>email:</span> ${error.msg.email.join()}</h5>
                </div>
                `;  
                alert.style.color = "red" 
            }

            if(error.msg.message) {
                alert.innerHTML += `
                <div class="alert-item">
                    <h5><span>message:</span> ${error.msg.message.join('')}</h5>
                </div>
                `;
            }
            
            alert.style.display = 'block'

            setTimeout(() => {
                alert.innerHTML = '';
                alert.style.display = 'none'
            }, 3000)
        } 

        if(message.status === 200) {

            console.log(message.msg);

            if(message.msg) {
                alert2.innerHTML += `
                <div class="alert-item">
                    <h5><span><i class="fa fa-check"></i></span> ${message.msg}</h5>
                </div>
                `;   
                alert2.style.color = "green"
            }

            setTimeout(() => {
                alert2.innerHTML = '';
                alert2.style.display = 'none'
            }, 3000)
        } 
    }, [error, message])

    return (
        <>
            <div className="alert">
            </div>
            <div className="alert2">
            </div>
        </>
    )
}

const mapStatToProps = state => ({
    error: state.errors,
    message: state.messages,
})

export default connect(mapStatToProps)(Alerts)
