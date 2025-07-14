import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            stagger: 0.03,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.03,
            delay: 0.7,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0);

        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
                // ease:"expo.out",
            },
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        };
    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title tracking-[-1.3rem]">it works!</h1>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />
                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p className="text-5xl font-bold italic mb-0 ml-3">
                                {"–"}
                            </p>
                            <p className="subtitle tracking-tighter text-4xl">
                                explore my world of
                                <br />
                                detailed crafts
                            </p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Where the spirit does not work with the hand,
                                there is no art.
                            </p>
                            <a href="#works">view my works</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    );
};

export default Hero;
