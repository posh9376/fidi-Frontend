import logo from './assets/logo5.png'

function Header() {
    return (
        <div className="container d-flex flex-column  align-items-center pt-3 pb-3 mb-4 border-bottom bg-outline-secondary">
            <div className='d-flex align-items-center'>
                <img className='rounded-3 logo-img' src={logo} alt="logo image" width="72" height="57" />     
            </div>
            <h1>🌟 Your go-to task management app</h1>
        </div>
    )
}

export default Header