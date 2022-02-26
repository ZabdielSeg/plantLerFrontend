import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGithubSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer style={{minHeight: '50px'}}>
            <div className="content has-text-centered is-flex is-justify-content-space-evenly is-align-items-center">
                <h2 className="creator-name">Creator: Zabdiel Segura</h2>
                <a className="icon-footer-href" rel="noreferrer" href="https://www.facebook.com/zab.segura" target="_blank"><FontAwesomeIcon icon={faFacebook} size='2x'/></a>
                <a className="icon-footer-href" rel="noreferrer" href="https://www.instagram.com/zabsegura/" target="_blank"><FontAwesomeIcon icon={faInstagram} size='2x' /></a>
                <a className="icon-footer-href" rel="noreferrer" href="https://github.com/ZabdielSeg" target="_blank"><FontAwesomeIcon icon={faGithubSquare} size='2x' /></a>
            </div>
        </footer>
    )
}

export default Footer;