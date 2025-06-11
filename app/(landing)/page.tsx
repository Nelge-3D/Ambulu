import About from "./About";
import FloatingMenu from "./FloatingMenu";
import Hero from "./Hero";
import Contact from "./Contact";
import Demo from "./Demo";
import Footer from "./Footer";

export default function page () {
    return [
        <main className="bg-background text-text font-sans">
            <FloatingMenu/>
            <Hero/>
            <About/>
            <Contact/>
            <Demo/>
            <Footer/>


        </main>
    ]
}