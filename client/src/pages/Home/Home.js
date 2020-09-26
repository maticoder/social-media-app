import React from "react";

// import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Companies from "../../components/Companies/Companies";
import Communicate from "../../components/Communicate/Communicate";
import Community from "../../components/Community/Community";
import Cards from "../../components/Cards/Cards";
import Social from "../../components/Social/Social";
import Join from "../../components/Join/Join";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    return (
        <div className="home">
            {/* <Navbar /> */}
            <Hero />
            <Companies />
            <Communicate />
            <Community />
            <Cards />
            <Social />
            <Join />
            <Footer />
        </div>
    );
};

export default Home;
