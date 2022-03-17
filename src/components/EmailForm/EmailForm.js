import React, { useRef } from 'react';
import './EmailForm.css'
import emailjs from '@emailjs/browser';


const EmailForm = () => {

    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_u6ovlt9', 'template_76432xh', form.current, 'NXX3QySJC9fJLsBI5')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };


    return (
        <div className='corpo'>
            <form ref={form} onSubmit={sendEmail} action="/" className="decor">
                <div className="form-inner">
                    <h1>Atire sua flecha</h1>
                    <input name='nome' type="text" placeholder="Nome" />
                    <input name='emailRemetente' type="email" placeholder="Remetente" />
                    <input name='emailDestinatario' type="email" placeholder="Destinatário" />
                    <textarea name='mensagem' placeholder="Messagem..." rows="5"></textarea>
                    <button className='btn animating' type="submit" href="/">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EmailForm;