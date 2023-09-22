import { Button } from '@react-email/button';
import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>dziękuję za dołączenie!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img style={image} width={130} src={'https://ayzihwizltrjtshahwlj.supabase.co/storage/v1/object/public/basic/mauve_logo_transparent.png'} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={h1}>Witaj,</Text>
            <Text style={paragraph}>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
            </Text>
            <Text style={paragraph}>
            All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.
            </Text>
            <Text style={paragraph}>
            It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures. Żeby zapoznać się z regulaminem {' '}
              <Link href="https://mauve.pl/regulamin" style={link}>
                kliknij tutaj
              </Link>
              .
            </Text>
            <Section style={sectionStyle}>
              <Button href='https://www.facebook.com/mauvebeautypl/?locale=pl_PL' style={buttonStyle}><Text style={paragraph2}>Umów się</Text></Button>
            </Section>
            <Text style={paragraph}>
              Masz jakieś pytania? Skontaktuj się na {' '}
              <Link href="https://www.facebook.com/mauvebeautypl/?locale=pl_PL" style={link}>
                Facebooku
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Do zobaczenia,
              <br />
              Mauve
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Link href='https://www.instagram.com/mauve.pl/'>
                <Img width={22} src={`https://ayzihwizltrjtshahwlj.supabase.co/storage/v1/object/public/basic/1384031.png`} />
              </Link>
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Link href='https://www.facebook.com/mauvebeautypl/?locale=pl_PL'>
                <Img width={22} src={`https://ayzihwizltrjtshahwlj.supabase.co/storage/v1/object/public/basic/59439.png`} />
              </Link>
            </Column>
          </Row>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2023 Mauve - wszelkie prawa zastrzeżone
          </Text>
        </Section>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  color: "#000",
  fontFamily,
  padding: '30px 0px',
  borderRadius: '6px',
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const paragraph2 = {
  lineHeight: 1,
  fontSize: 14,
  padding: '0px 5px',
};

const buttonStyle = {
  backgroundColor: '#cdbebf',
  width: '100%',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0px auto',
}

const sectionStyle = {
  padding: '30px 10%',
  textAlign: 'center',
}

const h1 = {
  fontWeight: 600,
  fontSize: 15,
  lineHeight: 2,
}

const container = {
  width: '620px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '620px',
  margin: '0 auto',
};

const content = {
  padding: '5px 10% 10px 10%',
};

const logo = {
  width: '100%',
  padding: 30,
};

const image = {
  margin: '0px auto',
}

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #705555',
  width: '102px',
};

const link = {
  textDecoration: 'underline',
  color: '#705555',
};
