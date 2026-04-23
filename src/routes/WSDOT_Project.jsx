// maybe use state import
import '../assets/WSDOT_Project.css';

export default function WSDOT_Project() {

    // functions maybe

    return (
        <div className="wsdot-project-page-container">
            <header className="wsdot-project-header">
                <div className="logo-and-links">
                    <img src="../../images/wsdot_logo.png" alt="WSDOT Logo" className="wsdot-logo-image" />
                    <a href="https://apps.apple.com/us/app/wsdot/id364455361" target="_blank" rel="noopener noreferrer" className="app-store-link">App Store Coming Soon!</a> 
                </div>
                <h1>Transportation has never looked this good</h1>
                <p>We listed to your feedback about the WSDOT iOS app, and we've decided to give it a complete overhaul 
                    for the first time in 11 years. Our new design is focused on reducing information overload, imporoving
                    information flow, and implamenting Apple's Liquid Glass UI for a modern look.</p>
                <a href="https://github.com/wsdot/wsdot-ios" target="_blank" rel="noopener noreferrer" className="app-store-link">Codebase</a>
            </header>

            <div className="iPhone-container">
                <div className="phoneFront">
                    <div className="frame">
                        <div className="screen">
                            <div className="island">
                                <div className="camera"></div>
                            </div>
                        </div>
                    </div>
                    <div className="antenas">
                        <div className="tt"></div>
                        <div className="tr"></div>
                        <div className="tl"></div>
                        <div className="bb"></div>
                        <div className="br"></div>
                        <div className="bl"></div>
                    </div>
                    <div className="keys">
                        <div className="silent"></div>
                        <div className="volt"></div>
                        <div className="volb"></div>
                        <div className="lock"></div>
                    </div>
                </div>

                <div className="phoneFront">
                    <div className="frame">
                        <div className="screen">
                            <div className="island">
                                <div className="camera"></div>
                            </div>
                        </div>
                    </div>
                    <div className="antenas">
                        <div className="tt"></div>
                        <div className="tr"></div>
                        <div className="tl"></div>
                        <div className="bb"></div>
                        <div className="br"></div>
                        <div className="bl"></div>
                    </div>
                    <div className="keys">
                        <div className="silent"></div>
                        <div className="volt"></div>
                        <div className="volb"></div>
                        <div className="lock"></div>
                    </div>
                </div>

                <div className="phoneFront">
                    <div className="frame">
                        <div className="screen">
                            <div className="island">
                                <div className="camera"></div>
                            </div>
                        </div>
                    </div>
                    <div className="antenas">
                        <div className="tt"></div>
                        <div className="tr"></div>
                        <div className="tl"></div>
                        <div className="bb"></div>
                        <div className="br"></div>
                        <div className="bl"></div>
                    </div>
                    <div className="keys">
                        <div className="silent"></div>
                        <div className="volt"></div>
                        <div className="volb"></div>
                        <div className="lock"></div>
                    </div>
                </div>
            </div>

            <div className="wsdot-content-section">
                <h2>Designed with user experience in mind from the start</h2>
                <p>The old WSDOT app feels like it is 10 apps in one, leading to a confusing user experience. Our new version is designed to simplify daily user workflow for an efforless experience, making this feature packed app a simple and intuitive tool.</p>

                <div className="content-block">
                    <h3>Streamlined Information Flow</h3>
                    <p>Reduced information overload</p>
                </div>
            </div>

        </div>
    );
}