import { useEffect, useRef, useState } from "react";
import "./Background.css";

interface Slide {
    url: string;
    subtitle: string;
    position?: string;
}

interface SlideShowProps {
    tab: string;
}

export function Slideshow({ tab }: SlideShowProps) {
    const realSlides: Slide[] = [
        {
            url: "/assets/backgrounds/patagonia.jpeg",
            subtitle: "Monte Fitz Roy, Patagonia, Argentina",
            position: "center 25%"
        },
        {
            url: "/assets/backgrounds/revelstoke.jpeg",
            subtitle: "Revelstoke, British Colombia, Canada",
            position: "center 10%"
        },
        {
            url: "/assets/backgrounds/amsterdam.jpeg",
            subtitle: "Amsterdam, Netherlands",
            position: "center 70%"
        },
        {
            url: "/assets/backgrounds/zion.jpeg",
            subtitle: "Zion National Park, Utah, USA",
            position: "center 30%"
        },
        {
            url: "/assets/backgrounds/nicaragua_lake.jpeg",
            subtitle: "Isla Ometepe, Nicaragua"
        },
        {
            url: "/assets/backgrounds/peritomoreno.jpeg",
            subtitle: "Perito Moreno Glacier, Patagonia, Argentina"
        },
        {
            url: "/assets/backgrounds/volcano.jpeg",
            subtitle: "Volcán Concepción, Ometepe, Nicaragua"
        },
        {
            url: "/assets/backgrounds/chile_boat.jpg",
            subtitle: "Rio Simpson, Aysén, Chile"
        },
        {
            url: "/assets/backgrounds/sunflowers.jpeg",
            subtitle: "Sunflowers, Lyman, Nebraska"
        },
        {
            url: "/assets/backgrounds/acropolis.jpeg",
            subtitle: "Parthenon, Athens, Greece",
            position: "center 45%"
        },
        {
            url: "/assets/backgrounds/ice_cave.jpeg",
            subtitle: "Ice Cave, Fagurhólsmyri, Iceland"
        },
        {
            url: "/assets/backgrounds/boat.jpeg",
            subtitle: "Isla Pachinini, Aysén, Chile"
        },
        {
            url: "/assets/backgrounds/newhome.jpg",
            subtitle: "Grand Canyon, Arizona, USA"
        },
        {
            url: "/assets/backgrounds/newhome1.jpg",
            subtitle: "Dominican Republic"
        }
    ];

    const [showSlideshowButton, setShowSlideshowButton] = useState(true); // Control visibility
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [_, setKeyPressed] = useState(false);
    const [transitionTime, setTransitionTime] = useState(1000);
    const intervalTime = 15000;
    const [shuffledSlides, setShuffledSlides] = useState<Slide[]>([]);

    const slides = shuffledSlides.length > 0 ? shuffledSlides : [
        realSlides[realSlides.length - 1],
        ...realSlides,
        realSlides[0]
    ];

    useEffect(() => {
        const shuffleMainSlides = () => {
            const mainSlides = [...realSlides];
            for (let i = mainSlides.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [mainSlides[i], mainSlides[j]] = [mainSlides[j], mainSlides[i]];
            }
            return mainSlides;
        };
    
        const shuffled = shuffleMainSlides();
        setShuffledSlides([
            shuffled[shuffled.length - 1],
            ...shuffled,
            shuffled[0]
        ]);
    }, []);

    function slideButtons(): JSX.Element {
        if (showSlideshowButton) {
            return <><button className="slideshow-button left transparent-element" onClick={() => goToPrev(500)}>
                        &#8249;
                    </button>
                    <button className="slideshow-button right transparent-element" onClick={() => goToNext(500)}>
                        &#8250;
                    </button></>
        } else {
            return <></>
        }
    }
    useEffect(() => {
        if (tab === "home" || tab === "") {
            setShowSlideshowButton(true);
        } else {
            setShowSlideshowButton(false);
        }
    }, [tab]);

    const slideshowRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAutoScroll();

        return () => stopAutoScroll();
    }, [isTransitioning, tab]);

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalRef.current = setInterval(() => {
            if (tab === "home" || tab === "") {
                goToNext(1000);
            }
        }, intervalTime);
    };

    const restartAutoScroll = () => {
        stopAutoScroll();
        setTimeout(() => {
            startAutoScroll();
        }, intervalTime);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setKeyPressed(true);
            if (event.key === "ArrowRight") {
                goToNext(500);
            } else if (event.key === "ArrowLeft") {
                goToPrev(500);
            }
            restartAutoScroll();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isTransitioning]);

    const goToNext = (transitionTime: number=1000) => {
        if (!isTransitioning) {
            setTransitionTime(transitionTime);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIsTransitioning(true);
        }
    };

    const goToPrev = (transitionTime: number=1000) => {
        if (!isTransitioning) {
            setTransitionTime(transitionTime);
            setCurrentIndex((prevIndex) => prevIndex - 1);
            setIsTransitioning(true);
        }
    };

    const handleTransitionEnd = () => {
        let newIndex = currentIndex;
        if (currentIndex >= slides.length - 1) {
            newIndex = 1;
            setIsTransitioning(false);
        } else if (currentIndex === 0) {
            newIndex = slides.length - 2;
            setIsTransitioning(false);
        }

        setCurrentIndex(newIndex);
        setIsTransitioning(false);

    };

    return (
        <>
            <div className="slideshow-container">
                <div
                    className="slideshow-inner"
                    ref={slideshowRef}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? `transform ${transitionTime}ms ease` : "none"
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="slide"
                            style={{ 
                                backgroundImage: `url(${slide.url})`,
                                backgroundPosition: slide.position ? slide.position : 'center'
                            }}
                        >
                            {(tab === "" || tab === "home") ? (
                                <div className="slide-subtitle transparent-element">
                                    {slide.subtitle}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            {slideButtons()}
        </>
    );
}
