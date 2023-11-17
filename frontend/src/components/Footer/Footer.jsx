import "./Footer.scss";

export const Footer = () => {
	return (
		<div className="footer">
			<h1 className="footer-title">Daily deliciousness in your inbox</h1>
			<p className="sub-heading-footer">Enjoy weekly hand picked recipes and food waste tips</p>
			<div className="joinEmail">
				<input className="join-input" type="text" placeholder="Email Address..." />
				<button className="join-button">Join</button>
			</div>
		</div>
	);
};
