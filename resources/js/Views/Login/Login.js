import React from 'react'
import '../../../css/login.css'

export default function Login() {
    return (
            <div className='text-center'>
    <form className="form-signin">
      <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
      <h1 className="h3 mb-3 font-weight-normal">CRM GİRİŞ YAP</h1>
      <label for="inputEmail" className="sr-only">E-Posta</label>
      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
      <label for="inputPassword" className="sr-only">Şifre</label>
      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Beni Hatırla
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Giriş Yap</button>
      <p className="mt-5 mb-3 text-muted">&copy; 2019-2021</p>
    </form>
    </div>
    )
}
