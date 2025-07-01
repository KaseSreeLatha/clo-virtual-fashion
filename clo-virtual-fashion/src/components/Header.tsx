import logo from '../assets/logo.png';

const Header = () => (
    <header className="bg-neutral-950 px-3 py-4 flex justify-between items-center">
        <img
            src={logo}
            alt="CONECT Logo"
            className="h-8"
        />
    </header>
);

export default Header;
