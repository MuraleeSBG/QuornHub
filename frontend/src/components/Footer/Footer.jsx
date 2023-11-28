import "./Footer.scss";
import fbLogo from "../../images/facebook.svg";
import instaLogo from "../../images/instagram.svg";
import twitterLogo from "../../images/twitter.svg";
import youtubeLogo from "../../images/youtube.svg";
import tiktokLogo from "../../images/tiktok.svg";

export const Footer = () => {
	return (
		<div className="footer">
			<h1 className="footer-title">Daily deliciousness on your feed</h1>
			<p className="sub-heading-footer">
				Enjoy weekly hand picked recipes and food waste tips on all our socials
			</p>
			<div className="socials">
				<a target="_blank" href="https://www.facebook.com/" rel="noreferrer">
					<img className="social-svg" src={fbLogo} alt="Facebook logo" />
				</a>
				<a target="_blank" href="https://www.instagram.com/" rel="noreferrer">
					<img className="social-svg" src={instaLogo} alt="Instagram logo" />
				</a>
				<a target="_blank" href="https://twitter.com/" rel="noreferrer">
					<img className="social-svg" src={twitterLogo} alt="Twitter logo" />
				</a>
				<a target="_blank" href="https://www.youtube.com/" rel="noreferrer">
					<img className="social-svg" src={youtubeLogo} alt="Youtube logo" />
				</a>
				<a target="_blank" href="https://www.tiktok.com/" rel="noreferrer">
					<img className="social-svg" src={tiktokLogo} alt="Tiktok logo" />
				</a>
			</div>
		</div>
	);
};
