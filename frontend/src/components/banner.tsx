import { useState, useEffect } from "react";

export function Banner() {
    const slides = [
        {
            image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            text: "Welcome to Our Store",
        },
        {
            image: "https://images.pexels.com/photos/1630344/pexels-photo-1630344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            text: "Best Deals Just For You",
        },
        {
            image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            text: "Limited Time Offer: 50% Off",
            ad: "Check out our latest ads!",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [slides.length]);

    return (
        <div className="banner">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? "active" : ""}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="overlay">
                        <h1>{slide.text}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
}
