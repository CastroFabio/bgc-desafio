import React, { useRef } from 'react';
import './EmailForm.css'
import emailjs from '@emailjs/browser';


const EmailForm = () => {

    let nome = useRef();
    let emailDestinatario = useRef();
    let emailRemetente = useRef();
    let msg = useRef();
    const success = useRef();
    const danger = useRef();

    const message = () => {

        if (nome.current.value === '' || emailDestinatario.current.value === '' || emailRemetente.current.value === '' || msg.current.value === '') {
            danger.current.style.display = 'block';
        }
        else {
            setTimeout(() => {
                nome.current.value = '';
                emailDestinatario.current.value = '';
                emailRemetente.current.value = '';
                msg.current.value = '';
            }, 1500);

            success.current.style.display = 'block';
        }

        setTimeout(() => {
            danger.current.style.display = 'none';
            success.current.style.display = 'none';
        }, 4000);

    }

    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();

        if (nome.current.value === '' || emailDestinatario.current.value === '' || emailRemetente.current.value === '' || msg.current.value === '') {
            return;
        }
        else {
            emailjs.sendForm('service_u6ovlt9', 'template_76432xh', form.current, 'NXX3QySJC9fJLsBI5')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            /* e.target.reset(); */
        }
    };


    return (
        <div className="container">
            <form ref={form} onSubmit={sendEmail} action="/" className="box">
                <h3>Atire sua flecha</h3>

                <div className="name">
                    <i className="fas fa-user"></i>
                    <input ref={nome} name='nome' type="text" placeholder="Nome" id="name" />
                </div>
                <div className="email">
                    <i className="fas fa-envelope"></i>
                    <input ref={emailRemetente} name='emailRemetente' type="text" placeholder="Email Remetente" id="emailRemetente" />
                </div>
                <div className="email">
                    <i className="fas fa-envelope"></i>
                    <input ref={emailDestinatario} name='emailDestinatario' type="text" placeholder="Email Destinatário" id="emailDestinatário" />
                </div>
                <div className="message-box">
                    <textarea ref={msg} name='mensagem' id="msg" cols="30" rows="10"
                        placeholder="Messagem..."></textarea>
                </div>
                <div className="button">
                    <button type="submit" href="/" id="send" onClick={message}>Envie</button>
                </div>
                <div className="message">
                    <div ref={success} className="success" id="success">
                        Sua mensagem foi enviada com sucesso!
                    </div>
                    <div ref={danger} className="danger" id="danger">Todos os campos devem ser preenchidos!</div>
                </div>
            </form>
        </div>
    )
}

export default EmailForm;