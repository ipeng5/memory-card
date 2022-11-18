import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="ball" />
    </header>
  );
}
