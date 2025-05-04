const OverView = () => {
    return (
        <div className="mx-auto py-20 px-3">
            <figure className="flex justify-center">
                <iframe 
                    className="w-full max-w-[1200px] h-[450px] rounded-2xl"
                    src="https://www.youtube.com/embed/fN21oOdni_c?si=uDYF_NNHr3wfTMLN" 
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
