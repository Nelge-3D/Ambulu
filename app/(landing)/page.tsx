import About from "./About";
import FloatingMenu from "./FloatingMenu";
import Hero from "./Hero";
import Contact from "./Contact";
import Demo from "./Demo";
import Footer from "./Footer";
import Nav from "./Nav";

export default function page () {

    return (
        <main className="bg-background text-text font-sans">
            <FloatingMenu/>
            <Nav/>
            <Hero/>
            <About/>
            <Contact/>
            <Demo/>
            <Footer/>


        </main>
    )

}