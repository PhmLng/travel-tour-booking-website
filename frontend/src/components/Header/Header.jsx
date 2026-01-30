import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <span> 1800 646 888 - Từ 8:00 - 23:00 hàng ngày</span>
      </div>

      <div className="nav">
        <div className="logo">Vietravel</div>

        <ul className="menu">
          <li>Điểm đến</li>
          <li>Vietravel MICE</li>
          <li>Vietravel Loyalty</li>
          <li>Liên hệ</li>
        </ul>

        <div className="actions">
          <span>🇻🇳 VND</span>
          <span>X</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
