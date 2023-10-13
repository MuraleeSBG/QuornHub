import "./Footer.scss";

export const Footer = () => {
	return (
		<div className="footer">
			<h1>Daily deliciousness</h1>
			<h1>in your inbox</h1>
			<p>Enjoy weekly hand picked recipes and food waste tips</p>
			<div className="joinEmail">
				<input type="text" placeholder="Email Address..." />
				<button>Join</button>
			</div>
		</div>
	);
};
