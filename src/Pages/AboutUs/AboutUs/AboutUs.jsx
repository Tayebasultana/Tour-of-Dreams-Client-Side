import profileLogo from "../../../assets/Screenshot 2024-09-30 064856.png";


const AboutUs = () => {
    return (
        <div className="bg-[#859F3D]">
            <div className="max-w-screen-lg mx-auto px-4 py-20">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">About Me</h1>

            {/* Developer Introduction */}
            <div className="text-center mb-6">
                <img 
                    src={profileLogo}
                    alt="Developer" 
                    className="rounded-full mx-auto mb-4" 
                />
                <p className='text-xl text-gray-900'>I am</p>
                <h2 className="text-2xl font-semibold">Tayeba Sultana</h2>
                <p className="text-gray-800">Aspiring Web Developer</p>
                <p className="mt-4 text-lg text-gray-900">I am an aspiring web developer with a passion for building functional and user-friendly web applications. I have been learning web development for the past 8-9 months, and I am focused on improving my skills in HTML, CSS, JavaScript, React, Node.js, MongoDB, and Tailwind CSS. I am always eager to take on new challenges and learn from each project I work on.</p>
            </div>

            {/* Projects Count */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">My Journey</h3>
                <p className="text-gray-800">I have worked on several projects so far, including web applications, and I am excited to continue learning and growing as a developer. Here are a few of the projects I have worked on:</p>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold">Project 1: Light of Heritage</h4>
                    <p className="text-gray-700">This project brings history to life, offering users a chance to delve into significant artifacts and stories that shaped our past.</p>
                    <a href="https://assignment-eleven-9f89f.web.app" target="_blank" rel="noopener noreferrer" className="text-blue-500">View Project</a>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold">Project 2: Visa Navigator</h4>
                    <p className="text-gray-700">A visa navigator application that helps users find the visa requirements for different countries. Built with React and Firebase.</p>
                    <a href="https://visa-navigator-a94fc.web.app" target="_blank" rel="noopener noreferrer" className="text-blue-500">View Project</a>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold">Project 3: Vocabulary Learning</h4>
                    <p className="text-gray-700">A vocabulary learning web app designed to help users learn and memorize new words with practice quizzes. Built with React and Firebase.</p>
                    <a href="https://vocabulary-learning-961b0.firebaseapp.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">View Project</a>
                </div>
            </div>

            {/* Contact Information */}
            <div className="text-center mt-10">
                <h3 className="text-xl font-semibold text-gray-900">Contact Me</h3>
                <p className="text-gray-800 mt-4">Feel free to reach out to me via email or connect with me on LinkedIn. I'm open to learning opportunities and collaborations.</p>
                <div className="mt-4">
                    <a href="tayebasultana743@gmail.com" className="text-blue-900">tayebasultana743@gmail.com</a>
                    <br />
                    <a href="https://www.linkedin.com/in/tayeba-sultana" target="_blank" rel="noopener noreferrer" className="text-blue-900">LinkedIn Profile</a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;
