import React from 'react';
import FooterSiteMap from "./FooterSiteMap";
import FooterSocial from "./FooterSocial";
import { StyledFooter } from "../../styles/Footer/StyledFooter";

const Footer = () => {
    return (
        <StyledFooter>
            <FooterSiteMap />
            <FooterSocial />
        </StyledFooter>
    )
}
export default Footer;