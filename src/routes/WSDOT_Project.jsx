// maybe use state import
import '../assets/WSDOT_Project.css';

export default function WSDOT_Project() {

    // functions maybe

    return (
        <div className="wsdot-project-page-container">
            <header className="wsdot-project-header">
                <div className="logo-and-links">
                    <img src="/images/wsdot_logo.png" alt="WSDOT Logo" className="wsdot-logo-image" />
                    <a href="https://apps.apple.com/us/app/wsdot/id387209224" target="_blank" rel="noopener noreferrer" className="app-store-link">App Store Coming Soon!</a> 
                </div>
                <h1>Transportation has never looked this good</h1>
                <p>We listed to your feedback about the WSDOT iOS app, and we've decided to give it a complete overhaul 
                    for the first time in 11 years. Our new design is focused on reducing information overload, imporoving
                    information flow, and implamenting Apple's Liquid Glass UI for a modern look.</p>
                <a href="https://github.com/jbraun3/WSDOT-iOS-iDOT#" target="_blank" rel="noopener noreferrer" className="app-store-link">Codebase</a>
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
                <p>The old WSDOT app feels like it is 10 apps in one, leading to a confusing user experience. 
                    Our new version is designed to simplify daily user workflow for an efforless experience, 
                    making this feature packed app a simple and intuitive tool.</p>
                
                <div className="content-block-container">
                    <div className="content-block">
                        <h3>Made for the future</h3>
                        <p>We used the latest Apple development technologies and design principles to create an app 
                            that not only meets current needs but also adapts to future changes. This reduces maintenance 
                            overhead and increases app durability.</p>
                            <div className="content-image">
                                <img src="/images/code-example.png" alt="WSDOT tab bar code example" className="content-image-1" />
                            </div>
                        <p className="subscript">SwiftUI tabview automatically updates to the newest iOS design standard, 
                            ensuring the app always looks modern without needing a redesign every few years.
                        </p>
                    </div>

                    <div className="content-block">
                        <h3>Cohesion is key</h3>
                        <p>...</p>
                    </div>

                    <div className="content-block">
                        <h3>There's no place like home</h3>
                        <p>...</p>
                    </div>
                </div>
            </div>

        </div>
    );
}