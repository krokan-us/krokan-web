import { DecoderText } from 'components/DecoderText';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { tokens } from 'components/ThemeProvider/theme';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Contact.module.css';

export const Contact = () => {
  const initDelay = tokens.base.durationS;

  return (
    <Section className={styles.contact}>
      <Meta
        title="Contact"
        description="Send us a message if you’re interested in discussing a project or if you just want to say hi."
      />
      <Transition unmount in={!0} timeout={1600}>
        {(visible, status) => (
            <Heading
                className={styles.title}
                data-status={status}
                level={3}
                as="h1"
                style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Have an idea? Let's work together." start={status !== 'exited'} delay={300} />
                <Text size="l" as="p" style={{fontSize: 26, fontWeight: 'normal', textAlign: 'center'}}>
                    hello[at]krokan.us
                </Text>
            </Heading>
        )}
      </Transition>

      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
