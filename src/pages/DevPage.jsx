import React from 'react';
import '../styles/DevPage.css';
import { Github, Mail, Linkedin } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const developers = [
  {
    name: 'Chilaka Raghu Ram',
    role: 'Lead Developer',
    bio: 'My vision in the tech world guides the development process with a strategic approach. I inspire innovation, manage teams, and ensure that projects evolve seamlessly from concept to completion. With a strong technical foundation and exceptional problem-solving skills, I am the driving force behind creating high-quality, scalable, and impactful solutions.',
    skills: [
      'Scrum Design & Management',
      'JavaScript',
      'NOSQL Developer',
      'Requirement Analyst',
      'React.js',
      'Node.js',
      'Github Actions',
    ],
    image:
      'https://res.cloudinary.com/dq7izqpmg/image/upload/t_Banner 16:9/v1735582942/raghu_zkuoaq.jpg',
    socialLinks: {
      github: 'https://github.com/Raghu1234567891011',
      linkedin: 'https://linkedin.com/in/chilakaraghuram',
      email: 'mailto:raghuram6404@example.com',
    },
  },
  {
    name: 'Saragadam Ganesh Likith Naidu',
    role: 'Frontend Developer',
    bio: 'With my passion for crafting responsive, visually appealing websites and applications, my main focus is on enhancing user experience. My expertise in HTML, CSS, JavaScript, and design frameworks enables me to create seamless interactions, ensuring that users engage effortlessly with every page or application they build.',
    skills: [
      'React',
      'Bootstrap',
      'Jest',
      'Figma',
      'JavaScript',
      'Github Actions',
      'Bash',
    ],
    image:
      'https://res.cloudinary.com/dq7izqpmg/image/upload/t_Banner 16:9/v1735583101/',
    socialLinks: {
      github: 'https://github.com/itsLikith',
      linkedin: 'https://linkedin.com/in/itsLikith',
      email: 'mailto:saragadamlikith48@gmail.com',
    },
  },
  {
    name: 'Ashrith Sai Jonnalagadda',
    role: 'Backend & DevOps Engineer',
    bio: 'My expertise lies in designing and managing databases, server-side logic, and application architecture, creating a robust, scalable foundation for web applications. With my knowledge of programming languages and frameworks, I optimize performance, ensure data security, and create seamless integrations to support a flawless user experience.',
    skills: [
      'JavaScript',
      'MongoDB',
      'Cloudflared',
      'Bash',
      'Express.js',
      'Node.js',
      'Github Actions',
    ],
    image:
      'https://res.cloudinary.com/dq7izqpmg/image/upload/t_Banner 16:9/v1735581785/ashrith_eotyqw.jpg',
    socialLinks: {
      github: 'https://github.com/ashrith-devison',
      linkedin: 'https://linkedin.com/in/ashrith-sai/',
      email: 'mailto:ashrithsai.devison@gmail.com',
    },
  },
  {
    name: 'Srujana Gayathri Chaganti',
    role: 'Backend & DevOps Engineer',
    bio: 'My focus is on automation, efficiency, and reliability of the site. I love streamlining the software development lifecycle by building and maintaining continuous integration/continuous deployment (CI/CD) pipelines. With a focus on system monitoring, infrastructure as code, and cloud technologies, I ensure smooth, scalable deployments and high uptime, all while enhancing team collaboration and performance.',
    skills: [
      'JavaScript',
      'MongoDB',
      'Cloudflared',
      'Bash',
      'Express.js',
      'Node.js',
      'Github Actions',
    ],
    image:
      'https://res.cloudinary.com/dq7izqpmg/image/upload/t_Banner 16:9/v1735582027/srujana_mj19yg.jpg',
    socialLinks: {
      github: 'https://github.com/5rujana',
      linkedin: 'https://linkedin.com/in/srujana-gayatri-chaganti-7170a6253/',
      email: 'mailto:gayatri.22bcb7011@vitapstudent.ac.in',
    },
  },
];

const DeveloperCard = ({ developer }) => {
  return (
    <article className="developer-card">
      <div className="developer-image-container">
        <img
          src={developer.image}
          alt={developer.name}
          className="developer-image"
        />
        <div className="developer-image-overlay"></div>
      </div>
      <div className="developer-content">
        <h2 className="developer-name">{developer.name}</h2>
        <p className="developer-role">{developer.role}</p>
        <p className="developer-bio">{developer.bio}</p>
        <div className="developer-skills">
          {developer.skills.map((skill, index) => (
            <button key={index} className="skill-tag btn btn-primary">
              {skill}
            </button>
          ))}
        </div>
        <div className="social-links">
          {developer.socialLinks.github && (
            <a
              href={developer.socialLinks.github}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"></path>
              </svg>
            </a>
          )}
          {developer.socialLinks.linkedin && (
            <a
              href={developer.socialLinks.linkedin}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#0078d4"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                ></path>
                <path
                  d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                  opacity=".05"
                ></path>
                <path
                  d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                  opacity=".07"
                ></path>
                <path
                  fill="#fff"
                  d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                ></path>
              </svg>
            </a>
          )}
          {developer.socialLinks.email && (
            <a href={developer.socialLinks.email} className="social-link">
              <Mail color="white" size={30} fill="blue" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const DevPage = () => {
  return (
    <div className="container dev-page bg-dark p-4">
      <header className="header">
        <i className="lucide-code-2 header-icon"></i>
        <h1 className="header-title text-light">Our Development Team</h1>
        <p className="header-subtitle text-light">
          Meet our talented team of developers who bring innovation and
          expertise to every project.
        </p>
      </header>
      <div className="developers-grid p-5">
        {developers.map((developer, index) => (
          <DeveloperCard key={index} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default DevPage;
