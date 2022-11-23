import React, {useState} from "react";
import './Carusel.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


interface CarouselProps {
    heading:string,
    children:React.ReactNode,
    n?:number,
    g?:string,
}

export const Carousel = (props:CarouselProps) => {

    const [active,setActive] = useState(0)

    const carouselRef = React.useRef<HTMLDivElement>(null)

    const scrollToNextElement= () => {
        if(carouselRef.current){
            if(active < carouselRef.current.childNodes.length - (props.n?props.n:3)){
                carouselRef.current.scrollLeft = (carouselRef.current.childNodes[active + 1] as HTMLElement)
                    .offsetLeft - (carouselRef.current.parentNode as HTMLElement)
                    .offsetLeft;
                setActive(active +1)
            }
        }
    }

    const scrollToPreviousElement = () => {
        console.log(active);
        if(carouselRef.current){
            if(active > 0) {
                carouselRef
                    .current.scrollLeft = (carouselRef.current.childNodes[active - 1] as HTMLElement)
                    .offsetLeft - (carouselRef.current.parentNode as HTMLElement)
                    .offsetLeft;
                setActive(active - 1)
            }
        }
    }

    return(
        <div>
            <div>
                <p>{props.heading}</p>
                <div>
                    <span
                        className="nav-button cursor_pointer"
                        onClick={scrollToPreviousElement}
                        style={{marginRight:"32px"}}>{"<"}
                    </span>
                    <span
                        className="nav-button cursor_pointer"
                        onClick={scrollToNextElement}>{">"}
                    </span>
                </div>
            </div>
            <div
                className="carousel-slides"
                ref={carouselRef}
                style={{
                    gridAutoColumns:`calc((100% - (${props.n?props.n:3} - 1)*${props.g?props.g:"32px"})/${props.n?props.n:3})`,
                    gridGap:props.g
                }}
            >
                {props.children}
            </div>
        </div>

    )
}

const CaruselOnlyCSS = () => {
    return(
        <div>
            <section className="carousel" aria-label="Gallery">
                <ol className="carousel__viewport">
                    <li id="carousel__slide1"
                        className="carousel__slide">
                        <div className="carousel__snapper">
                            <a href="#carousel__slide4"
                               className="carousel__prev">Go to last slide</a>
                            <a href="#carousel__slide2"
                               className="carousel__next">Go to next slide</a>
                        </div>
                    </li>
                    <li id="carousel__slide2"
                        className="carousel__slide">
                        <div className="carousel__snapper"></div>
                        <a href="#carousel__slide1"
                           className="carousel__prev">Go to previous slide</a>
                        <a href="#carousel__slide3"
                           className="carousel__next">Go to next slide</a>
                    </li>
                    <li id="carousel__slide3"
                        className="carousel__slide">
                        <div className="carousel__snapper"></div>
                        <a href="#carousel__slide2"
                           className="carousel__prev">Go to previous slide</a>
                        <a href="#carousel__slide4"
                           className="carousel__next">Go to next slide</a>
                    </li>
                    <li id="carousel__slide4"
                        className="carousel__slide">
                        <div className="carousel__snapper"></div>
                        <a href="#carousel__slide3"
                           className="carousel__prev">Go to previous slide</a>
                        <a href="#carousel__slide1"
                           className="carousel__next">Go to first slide</a>
                    </li>
                </ol>
                <aside className="carousel__navigation">
                    <ol className="carousel__navigation-list">
                        <li className="carousel__navigation-item">
                            <a href="#carousel__slide1"
                               className="carousel__navigation-button">Go to slide 1</a>
                        </li>
                        <li className="carousel__navigation-item">
                            <a href="#carousel__slide2"
                               className="carousel__navigation-button">Go to slide 2</a>
                        </li>
                        <li className="carousel__navigation-item">
                            <a href="#carousel__slide3"
                               className="carousel__navigation-button">Go to slide 3</a>
                        </li>
                        <li className="carousel__navigation-item">
                            <a href="#carousel__slide4"
                               className="carousel__navigation-button">Go to slide 4</a>
                        </li>
                    </ol>
                </aside>
            </section>
        </div>
    );
}

interface StandardComponentProps {
    title?: string
    children: React.ReactNode
}

const StandardComponent = ({
                               children,
                               title = 'Dr.',
                           }: StandardComponentProps) => {
    return (
        <div>
            {title}: {children}
        </div>
    )
}



const Main = () => {
    return(
        <CaruselOnlyCSS/>
    );
}



export default Main;