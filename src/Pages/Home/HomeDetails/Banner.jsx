import bannerImg from "../../../assets/salmen-bejaoui-FrexHePhfO0-unsplash.jpg";

const Banner = () => {
    return (
        <div className="h-[500px] lg:h-[700px]"
            style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            {/* Overlay for better text contrast */}
            <div 
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for text contrast
                }}
            />
            
            <div style={{ zIndex: 1, textAlign: "center", color: "white", padding: "20px" }}>
                <h1 style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "10px" }}>
                    Explore the Beauty of Nature
                </h1>
                <p style={{ fontSize: "1.5rem", marginTop: "0" }}>
                    Discover breathtaking landscapes and unforgettable adventures
                </p>
            </div>
        </div>
    );
};

export default Banner;
