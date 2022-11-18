import logo from '../assets/logo.png';

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
