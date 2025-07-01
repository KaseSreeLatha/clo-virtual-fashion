import logo from '../assets/logo.png';

const Header = () => (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <img
            src={logo}
            alt="CONECT Logo"
            className="h-8"
        />
        <button className="bg-green-500 text-sm text-black px-3 py-2 rounded font-bold">
            REQUIRED FEATURE
        </button>
    </header>
);

export default Header;
