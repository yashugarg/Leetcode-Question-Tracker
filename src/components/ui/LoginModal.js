import { useContext, useRef, useState } from 'react'
import classes from './LoginModal.module.css'
import UserContext from '../../store/user-context'

function LoginModal() {
    const [isLoading, setIsLoading] = useState(false)

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const userCtx = useContext(UserContext)

    const isUserLoggedIn = userCtx.isLoggedIn();

    function loginHandler(event) {
        event.preventDefault();

        setIsLoading(true);

        const headers = {
            'authority': 'leetcode.com',
            'scheme': 'https',
            'origin': 'https://leetcode.com',
            'referer': 'https://leetcode.com/accounts/login/',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }

        fetch('https://leetcode.com/').then(res => res.headers['Set-Cookie'])
            .then((cookie) => {
                let csrftoken = ''

                for (let msg in cookie.split(' ')) {
                    if (msg.startsWith('csrftoken')) {
                        csrftoken = msg.split('=')[1].strip(';')
                    }
                }
                return csrftoken
            }).then((token) => {
                const data = {
                    'login': usernameInputRef.current.value,
                    'password': passwordInputRef.current.value,
                    'csrfmiddlewaretoken': token
                }

                const cookies = { 'csrftoken': token }

                fetch("https://leetcode.com/accounts/login/",
                    { method: 'POST', body: data, headers: headers, cookies: cookies, credentials: "include" })
                    .then(resp => {
                        console.log(resp);
                        setIsLoading(false);
                    })
            })

    }

    return (
        <div className={classes.modal}>
            {
                isUserLoggedIn
                    ? <></>
                    : isLoading
                        ? <>Loading...</>
                        : < form className={classes.form} onSubmit={loginHandler}>
                            <div className={classes.control}>
                                <label htmlFor="username">Email or Username</label>
                                <input type="text" required id="username" ref={usernameInputRef} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor="password">Password</label>
                                <input type="password" required id="password" ref={passwordInputRef} />
                            </div>
                            <div className={classes.actions}>
                                <button>Login</button>
                            </div>
                        </form>
            }
        </div>
    )
}

export default LoginModal
