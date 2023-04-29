import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
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
  const newApp = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, dailyHadiths, bilkentMenu, newApp, details];

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
        description="Discover Krokan: expert mobile app development for
         iOS and Android. We create engaging, user-focused applications
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
            title="Video game progress tracking"
            description="Design and development for a video game tracking app built in React Native"
            buttonText="View website"
            buttonLink="https://gamestack.hamishw.com"
            model={{
                type: 'phone',
                alt: 'App login screen',
                textures: [
                    {
                        srcSet: [gamestackTexture, gamestackTextureLarge],
                        placeholder: gamestackTexturePlaceholder,
                    },
                    {
                        srcSet: [gamestackTexture2, gamestackTexture2Large],
                        placeholder: gamestackTexture2Placeholder,
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
        title="Video game progress tracking"
        description="Design and development for a video game tracking app built in React Native"
        buttonText="View website"
        buttonLink="https://gamestack.hamishw.com"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
        <ProjectSummary
            id="newApp"
            alternate
            sectionRef={newApp}
            visible={visibleSections.includes(newApp.current)}
            index={3}
            title="Video game progress tracking"
            description="Design and development for a video game tracking app built in React Native"
            buttonText="View website"
            buttonLink="https://gamestack.hamishw.com"
            model={{
                type: 'phone',
                alt: 'App login screen',
                textures: [
                    {
                        srcSet: [gamestackTexture, gamestackTextureLarge],
                        placeholder: gamestackTexturePlaceholder,
                    },
                    {
                        srcSet: [gamestackTexture2, gamestackTexture2Large],
                        placeholder: gamestackTexture2Placeholder,
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
