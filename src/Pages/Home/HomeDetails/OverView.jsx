const OverView = () => {
    return (
        <div className="mx-auto py-20 px-3 bg-[#F6FCDF]">
            <figure className="flex justify-center ">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/4FrPZoofdBQ?si=rAmnkvjar0wCeMTv" 
                    title="YouTube video player"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                ></iframe>
            </figure>
        </div>
    );
};

export default OverView;
