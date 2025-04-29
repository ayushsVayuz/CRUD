import React, { useEffect } from "react";

function AboutPage() {

    return (
        <div className="mt-12 px-4 sm:px-10 lg:px-20 flex flex-col text-center gap-10">
    
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">About</p>
            <p className="text-lg sm:text-xl">Why I love doing coding. Every day.</p>

         
            <div className="flex justify-center">
                <img 
                    className="h-40 w-40 sm:h-60 sm:w-60 lg:h-80 lg:w-80 rounded-full object-cover"
                    src="WhatsApp Image 2025-04-13 at 19.26.15_d4e26ecc.jpg" 
                    alt="Profile"
                />
            </div>

 
            <div className="text-start leading-8 tracking-wide mx-auto max-w-3xl">
                <p>
                    I am a final year Computer Science student at Chaudhary Charan Singh University, Meerut, 
                    with a passion for building innovative and user-centric web applications. Specializing in modern 
                    web development technologies, including the PERN stack (PostgreSQL, Express.js, ReactJS, Node.js), 
                    I strive to create seamless and impactful digital experiences.
                </p><br />
                <p>
                    For me, coding is more than a skill—it's a way to bring ideas to life and solve meaningful problems. 
                    My journey has been fueled by curiosity, resilience, and a commitment to refining my craft.
                </p><br />
                <p>
                    Collaborative by nature and detail-oriented in my approach, I aim to leave a lasting impact in the 
                    digital world through thoughtful and creative web solutions.
                </p><br />
                <p>Don't hesitate to reach out – let's grab a coffee and chat!</p><br />
            </div>


            <div className="flex justify-center gap-6">
                <a href="https://www.instagram.com/sharmaayushay/" target="_blank" rel="noreferrer">
                    <img className="h-8 w-8 sm:h-10 sm:w-10" src="instagram.png" alt="Instagram" />
                </a>
                <a href="https://twitter.com/sharmaayushay" target="_blank" rel="noreferrer">
                    <img className="h-8 w-8 sm:h-10 sm:w-10" src="twitter.png" alt="Twitter" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100009380654938&sk=about" target="_blank" rel="noreferrer">
                    <img className="h-8 w-8 sm:h-10 sm:w-10" src="facebook.png" alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/in/ayush-sharma-39a042272" target="_blank" rel="noreferrer">
                    <img className="h-8 w-8 sm:h-10 sm:w-10" src="linkedin.png" alt="LinkedIn" />
                </a>
            </div>


            <div className="mt-6">
                <a href="mailto:sharmaayushay@gmail.com">
                    <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 mb-5">
                        Email, Perhaps?
                    </button>
                </a>
            </div>
        </div>
    );
}

export default AboutPage;