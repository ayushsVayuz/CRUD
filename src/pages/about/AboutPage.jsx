import React from "react";


function AboutPage() {
    return(
        
            <div className=" mt-12 ml-120 mr-120 flex flex-col text-center gap-20  ">
                <p className="text-[45px]">About</p>
                <p className="-mt-8 text-[20px]">Why I love doing coding. Every day.</p>
                <div className="flex justify-center">
                    <img className="h-120 w-120 rounded-full" src="public\WhatsApp Image 2025-04-13 at 19.26.15_d4e26ecc.jpg" />
                </div>
                
            
                <div className=" ml-10 mr-10 text-start leading-8 -tracking-50">
                    <p>I am a final year Computer Science student at Chaudhary Charan Singh University, Meerut, with a passion for building innovative and user-centric web applications. Specializing in modern web development technologies, including the PERN stack (PostgreSQL, Express.js, ReactJS, Node.js), I strive to create seamless and impactful digital experiences.</p><br/>
                    <p>For me, coding is more than a skill—it's a way to bring ideas to life and solve meaningful problems. My journey has been fueled by curiosity, resilience, and a commitment to refining my craft. With hands-on experience across the development lifecycle, I focus on delivering solutions that blend functionality with great design.</p><br/>
                    <p>Collaborative by nature and detail-oriented in my approach, I aim to leave a lasting impact in the digital world through thoughtful and creative web solutions.</p><br/>
                    <p>Don't hesitate to reach out – let's grab a coffee and chat</p><br/>   
                </div>

                <div className="-mt-14 flex flex-cols gap-10 ml-40 mr-40">
                    <a className="w-7 text-center" href="https://www.instagram.com/sharmaayushay/" target="_blank" rel="noreferrer">
                        <img className="h-7" src="public\instagram.png" alt="instagram" />
                    </a>
                        

                    <a className="w-7" href="https://twitter.com/sharmaayushay" target="_blank" rel="noreferrer">
                        <img className="h-7" src="public\twitter.png" alt="twitter" />
                    </a>
                    
                    <a className="w-7" href="https://www.facebook.com/profile.php?id=100009380654938&sk=about" target="_blank" rel="noreferrer">
                        <img className="h-7" src="public\facebook.png" alt="facebook" />
                    </a>
                    
                    <a className="w-7" href="https://www.linkedin.com/in/ayush-sharma-39a042272" target="_blank" rel="noreferrer">
                        <img className="h-7" src="public\linkedin.png" alt="linkdin" />
                    </a> 
                </div> 

                <a className="-mt-5 mb-5" href="mailto:sharmaayushay@gmail.com">
                    <button className="bg-black text-white pl-5 pr-5 pt-2 pb-2 rounded-xl">Email, Perhaps?</button>
                </a>
            </div>     
    );
}

export default AboutPage;