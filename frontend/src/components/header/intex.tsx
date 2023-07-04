import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [userName, setName] = useState<string>('');
    const[openMenu, setOpenMenu] = useState<boolean>(false);

    const buttonRef = React.useRef(null);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name != null) {
            setName(name);
        }
    }, [])

    function navigateDashboard() {
        return navigate('/dashboard')
    }

    function handleClose(){
        setOpenMenu(false)
    }

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userName')
        navigate('/')
    }

    function verifyLogIn() {
        return localStorage.getItem('userName') != null ? 'flex-left' : '';
    }

    return (
        <div className={`header-ok ${verifyLogIn()}`}>
            <img onClick={navigateDashboard} alt='logo' src={Logo}></img>
            {userName != null && userName !== '' && (
                <p 
                ref={buttonRef}
                onClick={() => setOpenMenu(!openMenu)}
                >
                    {userName}
                    </p>
            )}
            <Menu
                id="basic-menu"
                anchorEl={buttonRef.current}
                open={openMenu}
                onClose={handleClose}
            >
                <MenuItem selected={false} style={{display:'none'}} onClick={logout}>Logout</MenuItem>
                <MenuItem selected={false} style={{border:'unset'}} onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default Header;