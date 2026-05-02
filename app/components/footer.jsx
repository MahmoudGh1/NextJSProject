import React from 'react';

export const revalidate = 86400;

const Footer = () => {
    const date = new Date()
    const year = date.toLocaleDateString("en-US", {year: "numeric"});
    return (
        <div style={{padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p><span style={{color: "red"}}>&copy;</span> {year} ITI. All Rights Reserved</p>
        </div>
    );
}

export default Footer;
