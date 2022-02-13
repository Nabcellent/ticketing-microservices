import Link from "next/link";

export const Header = ({ currentUser }) => {
	const links = [
		!currentUser && { label: 'Sign Up', href: '/auth/sign-up' },
		!currentUser && { label: 'Sign In', href: '/auth/sign-in' },
		currentUser && { label: 'Sign Out', href: '/auth/sign-out' },
	].filter(linkConfig => linkConfig)

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
						aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"/>
				</button>
				<Link href={ '/' }>
					<a className="navbar-brand" href="#">TicketX</a>
				</Link>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
					</ul>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{
							links.map(({ label, href }, key) => {
								return (
									<li className="nav-item" key={ key }>
										<Link href={ href }><a className="nav-link active">{ label }</a></Link>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}