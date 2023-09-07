import emailjs from "emailjs-com";
import React from 'react';
import swal from 'sweetalert';

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_gij7nco', 'template_6cua40k', e.target, 'qvykTgL8nqdiylnjS')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
               swal("Sent!","e-mail has been Sent Successfully!", "success");
    }

    return(
        <div className='promobody'>
            <div className="container">
            <br></br>  
            <br></br>  
            <br></br>
         <center><h3>SEND EMAILS TO REGISTERED CUSTOMERS</h3></center> 
                <br></br> 
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        
                        <div className="col-8 pt-3 mx-auto">
                           <center> <input type="submit" id="" className="btn btn-success mx-0 mt-0" value="Send  >>> "></input></center>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}