import React from 'react';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import { selectSite } from 'store/features/siteSlice';

const Footer = () => {

    const site = useSelector(selectSite)
    return (
        <footer className='bck_b_dark'>
            <div className='container'>
                <div className='logo'>
                    SneakersKart
                </div>
                {site && site.vars ? 
                <div className='wrapper'>
                    <div className='left'>
                        <h2> Contact Information</h2>
                        <div className='business_nfo'>
                            <div className='tag'>
                                <ContactPageIcon />
                                <div className='nfo'>
                                    <div>Address</div>
                                    <div>{site.vars.address}</div>

                                </div>
                            </div>
                            <div className='tag'>
                                <TimelapseIcon />
                                <div className='nfo'>
                                    <div>Phone</div>
                                    <div>{site.vars.phone}</div>
                                </div>
                            </div>
                            <div className='tag'>
                                <LocalPhoneIcon />
                                <div className='nfo'>
                                    <div>Working Hours</div>
                                    <div>{site.vars.hours}</div>
                                </div>
                            </div>
                            <div className='tag'>
                                <EmailIcon />
                                <div className='nfo'>
                                    <div>Email</div>
                                    <div>{site.vars.email}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='left'>
                        <h2> Be the first to Buy</h2>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </div>
                </div>
:null}

            </div>

        </footer>
    )
}

export default Footer;