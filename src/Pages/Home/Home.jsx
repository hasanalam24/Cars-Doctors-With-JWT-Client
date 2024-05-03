import Banner from "../../Components/Banner/Banner";
import HomeCard from "../../Components/HomeCard/HomeCard";



const Home = () => {
    return (
        <div>
            <Banner></Banner>


            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-semibold mt-10 mb-8">Our Services</h1>
                </div>
                <HomeCard></HomeCard>
            </div>
        </div>
    );
};

export default Home;