import blurryImage from 'assets/blur.jpg';
import dailyHadiths1 from 'assets/dailyHadiths.jpg';
import dailyHadithsLarge1 from 'assets/dailyHadithsLarge.jpg';
import dailyHadiths2 from 'assets/dailyHadiths2.jpg';
import dailyHadithsLarge2 from 'assets/dailyHadithsLarge2.jpg';
import bilkentMenu1 from 'assets/bilkentMenu.jpg';
import bilkentMenuLarge1 from 'assets/bilkentMenuLarge.jpg';
import bilkentMenu2 from 'assets/bilkentMenu2.jpg';
import bilkentMenuLarge2 from 'assets/bilkentMenuLarge2.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Innovative', 'Agile', 'Collaborative', 'Visionary', 'Adaptive'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const dailyHadiths = useRef();
  const bilkentMenu = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, dailyHadiths, bilkentMenu, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Dream. Build. Connect."
        description="We create engaging, user-focused applications
          that elevate your digital presence. Transform your ideas with us today."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
        <ProjectSummary
            id="dailyHadiths"
            alternate
            sectionRef={dailyHadiths}
            visible={visibleSections.includes(dailyHadiths.current)}
            index={1}
            title="Daily Hadiths"
            description="Daily inspiration from Hadiths"
            buttonText="App Store"
            buttonLink="https://apps.apple.com/tr/app/daily-hadiths/id6447806826?platform=iphone"
            model={{
                type: 'phone',
                alt: 'Daily Hadiths main',
                textures: [
                    {
                        srcSet: [dailyHadiths1, dailyHadithsLarge1],
                        placeholder: blurryImage,
                    },
                    {
                        srcSet: [dailyHadiths2, dailyHadithsLarge2],
                        placeholder: blurryImage,
                    },
                ],
            }}
        />
      <ProjectSummary
        id="bilkentMenu"
        alternate
        sectionRef={bilkentMenu}
        visible={visibleSections.includes(bilkentMenu.current)}
        index={2}
        title="Bilkent Cafeteria Menu"
        description="Meal List in Your Pocket"
        buttonText="App Store"
        buttonLink="https://apps.apple.com/tr/app/bilkent-cafeteria-menu/id6448339268"
        model={{
          type: 'phone',
          alt: 'Bilkent Menu',
          textures: [
            {
              srcSet: [bilkentMenu1, bilkentMenuLarge1],
              placeholder: blurryImage,
            },
            {
              srcSet: [bilkentMenu2, bilkentMenuLarge2],
              placeholder: blurryImage,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
