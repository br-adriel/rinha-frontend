import { BiLogoLinkedin, BiLogoGithub } from 'react-icons/bi';
import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <p>Adriel Santos</p>
        <div className={style.links}>
          <a
            href='https://www.linkedin.com/in/adriel-fsantos/'
            target='_blank'
            rel='noopener noreferrer'
            title='LinkedIn'
          >
            <BiLogoLinkedin />
          </a>
          <a
            href='https://www.github.com/br-adriel/'
            target='_blank'
            rel='noopener noreferrer'
            title='Github'
          >
            <BiLogoGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
