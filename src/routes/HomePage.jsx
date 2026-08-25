import { useEffect, useRef } from 'react';
import '../assets/HomePage.css';

export default function HomePage() {

    // AI functions review later
    const scrollRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        const bgEl = bgRef.current;
        if (!scrollEl || !bgEl) return;

        const updateParallax = () => {
            const maxContentScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
            const maxBgScroll = bgEl.scrollHeight - scrollEl.clientHeight;

            // Nothing to scroll (or bg already fits) — keep bg pinned to the top.
            if (maxContentScroll <= 0 || maxBgScroll <= 0) {
                bgEl.style.transform = 'translateY(0px)';
                return;
            }

            // Same fraction scrolled through the content is applied to the bg's
            // (shorter) travel distance, so both run out of room to scroll at
            // the same moment — top meets top, bottom meets bottom.
            const ratio = scrollEl.scrollTop / maxContentScroll;
            bgEl.style.transform = `translateY(${-(ratio * maxBgScroll)}px)`;
        };

        updateParallax();
        scrollEl.addEventListener('scroll', updateParallax, { passive: true });

        // Re-measure if the content height or bg image size changes (e.g. image
        // load, window resize, or content reflow).
        const resizeObserver = new ResizeObserver(updateParallax);
        resizeObserver.observe(scrollEl);
        resizeObserver.observe(bgEl);
        bgEl.addEventListener('load', updateParallax);

        return () => {
            scrollEl.removeEventListener('scroll', updateParallax);
            bgEl.removeEventListener('load', updateParallax);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="home-page-container">
            <span className="page-title">Home Page</span>
            <div className="home-page-viewport">
                <img
                    ref={bgRef}
                    className="home-page-bg"
                    src="/images/home_background.jpg"
                    alt=""
                    aria-hidden="true"
                />
                <div className="home-page-content" ref={scrollRef}>
                    <div className="home-page-inner">
                        <div className="welcome-title">
                            <div className="welcome-graphic"></div>
                            <h1>to my Portfolio!</h1>
                        </div>

                        <div className="text-block-border">
                            <div className="text-block">
                                <h3 className="text-block-title">Introduction</h3>
                                <p>Hello! My name is Julian Braun, I'm a software engineer experienced in bringing
                                independant projects from concept to completion. This website serves as a showcase of my design, 
                                front-end, back-end, and data work. Feel free to explore using the file explorer, 
                                or press the 'select' button to switch to a custom terminal interface on the left. 
                                This website was built with React, featuring all custom data structures and components.</p>
                            </div>
                        </div>

                        <span className="sticky-note-container one">
                            <div className="sticky-note">
                                <h3 className="sticky-note-title">Note:</h3>
                                <p>For the best experience, please view this website on a desktop or laptop computer.</p>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}
