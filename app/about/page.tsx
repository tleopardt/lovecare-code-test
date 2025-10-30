import React from 'react';

function About() {
  return (
    <div className='about'>
        <h1>About project</h1>

        <div className="flex flex-col gap-2 !mb-4">
          <h2>What is this?</h2>
          
          <div className="flex flex-col gap-1">
            <h3>Overview</h3>
            <p>
              LoveCare Skill Assessment is a web app built using Next.js, TypeScript, GSAP, and TailwindCSS.
              It’s designed to provide a smooth and modern experience while keeping the interface simple and intuitive.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3>Technical Approach</h3>
            <p>
              One of the main challenges was handling data loading efficiently in the list component.
              To improve performance, I used preloading — taking advantage of idle time while users are scrolling or viewing images to load the next page’s data in advance.
              This approach helps deliver instant results when users navigate or scroll further, creating a smoother experience with little to no loading time.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3>Design Decision</h3>
            <p>
              I aimed for a minimal yet modern design, focusing on readability and clean layouts.
              Switching to TailwindCSS made the development process faster and more consistent while keeping the styles maintainable.
            </p>
          </div>
        </div>

        <h2>Feature of the project</h2>
        <div className="flex flex-col gap-2 !mb-4">
          <p>
            Here are the main features that make the LoveCare Skill 
            Assessment app work smoothly and efficiently.
          </p>

          <ul className="list-inside list-disc break-words">
            <li>Character Filtering – users can search and filter characters by name, species, or other attributes.</li>
            <li>Responsive Design – the layout adapts seamlessly to different screen sizes and devices.</li>
            <li>Character Grid Display – shows character cards in a clean, grid-based layout for easy browsing.</li>
            <li>Pagination with Preloading – loads new character pages automatically while users scroll or pause, improving speed and reducing waiting time.</li>
            <li>Character Detail Page – each character has a dedicated detail view showing information and episodes they appear in.</li>
            <li>Smooth Transitions & Animations (optional to include) – powered by GSAP for a fluid, modern user experience.</li>
          </ul>
        </div>

        <h2>About developer</h2>
        <div className="flex flex-col gap-2 !mb-4">
          <p>
            I'm Jonatan. A passionate and skilled professional in Web Design,
            Programming, and Mobile Development with a keen interest in applying
            informatics to the online startup world. I am eager to leverage my
            expertise in these areas, along with strong English and
            communication skills, to join and contribute to your team's success,
            ensuring impactful and innovative outcomes in today's digital
            landscape.
          </p>
        </div>
    </div>
  );
}

export default About;
