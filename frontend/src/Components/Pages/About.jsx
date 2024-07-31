import React from 'react';
import './AboutUs.css'; // Ensure you have the appropriate CSS file
import AboutImage from '../Images/image2.jpeg'
const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="image-section">
          <img src={AboutImage} alt="Pregnant woman" className="about-us-image" />
        </div>
        <div className="text-section">
          <h2>About Us</h2>
          <p>
            Our Mission..., is to improving prenatal care through innovative solutions. Our unique Genius
            baby Prenatal Music Device is to enhance fetal development and maternal well-being through
            the power of music which should reach all sections of the society.
          </p>
          <p>
            <strong>GENIUS BABYTHE MOST EFFECTIVE AND SAFE PRE-NATAL MUSIC DEVICE</strong>
          </p>
          <p>
            GENIUS BABY PREGNANCY AUDIO DEVICE can significantly boost the brain of your baby while still in the
            womb. Improves music awareness, language skills and IQ levels of your new born baby and enhances the health
            level in general.
          </p>
          <p>
            WITH GENIUS BABY PREGNANCY AUDIO DEVICE, you will get a more healthy, clever and a bubbly baby.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
