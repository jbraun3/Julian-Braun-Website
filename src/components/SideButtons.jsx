import '../assets/SideButtons.css';

export default function SideButtons() {
    return (
        <div className="side-buttons">
            <div className="floppy-disk">
                <div className="disk-slit"></div>
            </div>
            <div className="button-container">
                <button className="side-button circle-button top"
                    onClick={() => window.open('https://github.com/jbraun3')}>
                    <img src="/images/GitHub_logo.png" alt="GitHub" className="button-icon" />
                </button>
                <button className="side-button circle-button middle"
                    onClick={() => window.open('https://www.linkedin.com/in/jules-braun-48815329a/')}>
                    <img src="/images/LinkedIn-logo.png" alt="LinkedIn" className="button-icon" />
                </button>
                <button className="side-button circle-button bottom"
                    onClick={() => window.open('mailto:juliananthonybraun@gmail.com')}>
                    <img src="/images/Email-logo.png" alt="Email" className="button-icon" />
                </button>
            </div>
            <div className="vents">
                <div className="vent"></div>
                <div className="vent"></div>
                <div className="vent"></div>
                <div className="vent"></div>
                <div className="vent"></div>
                <div className="vent"></div>
                <div className="vent"></div>
            </div>
        </div>
    );
}