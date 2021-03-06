import React from 'react';


class Register extends React.Component {
    constructor(){
        super();
        this.state = {
            email : '',
            name : '',
            password : '',
            confirmPassword: ''
            
        }
    }
    
    onSubmitRegister(){
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if(password !== confirmPassword || password === ''){
            return console.error(`Passwords don't match`)
        }

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                name : name,
                email : email,
                password : password 
            })
        }).then(response => response.json())
        .then(data => {
            if (data.user_name === name){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
    }
        

         


    render(){

    return (
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Confirm password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="confirm-password" id="confirm-password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" value="Register" 
                        onClick={() => this.onSubmitRegister()} />
                    </div>
                </div>
            </main>
        </article>

    )
    }
}
export default Register;