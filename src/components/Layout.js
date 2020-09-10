/**
 * Created by chalosalvador on 3/1/20
 */
import React from 'react';
import Routes from '../constants/routes';
import Navigation from './Navigation';
import { Carousel ,Layout, Row, Col, Button, Popover } from 'antd';
import { SkypeOutlined,EnvironmentOutlined,TwitterOutlined,GooglePlusOutlined,FacebookOutlined, InstagramOutlined, GithubOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import logoFooter from '../images/logoFooter.png';
import estudiantes from '../images/estudiantes.jpg';
import logo from '../images/logoNavbar.png';
import profesores from '../images/profesores.jpg';
import principalLogo from '../images/logonormal.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
  console.log( 'props', props );
  return (
    <div className='app'>
      <Layout>
        <Row type='flex' justify='center' className='header-wrapper'>
          <Col span={ 20 }>
            <Header className='header'>
              <Row type='flex' justify='space-between' align='bottom'>
                <Col xs={ 24 } md={ 6 } className='logo-wrapper'>
                  <a href={ process.env.REACT_APP_DOMAIN }>
                    <img className='logo' src={ logo } alt='Grupo Menta' /></a>
                </Col>

                <Col md={ 14 } align='right' className='main-menu'>
                  <Navigation mode='horizontal' />
                </Col>

                <Col xs={ 2 } align='right' className='responsive-menu-button'>
                  <Popover content={ <Navigation mode='vertical' /> }
                           trigger='click'
                           placement='rightTop'
                           overlayClassName='responsive-menu-wrapper'>
                    <Button type='primary'>
                      <svg viewBox='64 64 896 896'
                           focusable='false'
                           className=''
                           data-icon='menu'
                           width='1em'
                           height='1em'
                           fill='currentColor'
                           aria-hidden='true'>
                        <path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
                      </svg>
                    </Button>
                  </Popover>
                </Col>
              </Row>
            </Header>
          </Col>
        </Row>


        <Content className='content'>
          <Row type='flex' justify='center' style={ { flex: 'auto' } }>
            <Col span={4}>
              <img className='imgLogo' src={principalLogo} />
            </Col>
          </Row>
        </Content>
        <h1 className={'teacherTitle'}>Docentes</h1>
        <Content className='teacherContent'>

          <Row className='teacher'  type='flex' justify='center' style={ { flex: 'auto' } }>
            <Col span={9}>
              <img className='imgTeacher' src={profesores} />
            </Col>
            <Col span={13}>
              <p>
                Los docentes son piezas fundamentales en todo el proceso de la enseñanza, ellos tienen la llave para mejorar el futuro de los estudiantes.
                Un buen educador es aquel que entrega todo en el aula y reconoce la importancia de su figura en el desarrollo cognitivo y social de sus educandos. La excelencia del docente depende de muchos factores, pero por sobre todo los humanos. El brindar confianza y seguridad a sus métodos de enseñanza en un aula de clases son esenciales para incentivar al maestro.
              </p>
            </Col>
          </Row>
        </Content>
        <h1 className={'studentTitle'}>Estudiantes</h1>
        <Content className='studentContent'>

          <Row className='student' type='flex' justify='center' style={ { flex: 'auto' } }>
            <Col span={13}>
              <p>
                En el panorama educativo, el alumno es, sin ningún lugar a dudas, el elemento fundamental del proceso. En la antigüedad se consideraba que enseñar era dar formación a un ciudadano para fomentar su participación en el diálogo entre el maestro y sus discípulos, al que admiraban y discutían al mismo tiempo. A lo largo de la historia de la educación, la figura del alumno ha ido presentando distintos comportamientos en el proceso educativo, pasando de un respeto casi reverencial hacia el profesor en épocas pasadas hasta una falta de consideración que, según se escucha en algunos medios de comunicación, ha convertido a la enseñanza, sobre todo en su etapa secundaria, en una profesión de alto riesgo.
              </p>
            </Col>
            <Col span={9} className={'studentPhoto'}>
              <br/>
              <img className='imgStudent' src={estudiantes}/>
            </Col>
          </Row>

        </Content>

        <Footer className='footer'>
          <Row>
            <Col xs={ {
              span: 24,
              offset: 0
            } }
                 md={10}
                 >
              <a rel='noopener noreferrer' target='_blank'>
                <img src={logoFooter} height={ 100 } />
              </a>
              <br/>
              <br/>
              <p>Somos tu plataforma de confianza</p>
              <p>ESFOT Feedback Team</p>
            </Col>

            <Col xs={ { span: 24 } } md={ 10 }
                 className='contact-links'>
              <p><strong>Contactos</strong></p>
              <p><EnvironmentOutlined />Casa de la Cultura</p>
              <p><WhatsAppOutlined /> <a href='https://wa.me/593984794808' target='_blank' rel='noopener noreferrer'>+593
                9-8392-7151</a></p>
              <p><MailOutlined/> mario.montero@epn.edu.ec</p>
              <p><SkypeOutlined />ESFOT Feedback</p>
            </Col>

          <Col xs={ {
            span: 24,
            offset: 0
          } }
               md={4} >
            <strong>Síguenos en:</strong>
            <br/>
            <a href='https://www.facebook.com'
               target='_blank'
               rel='noopener noreferrer'
               style={ {
                 marginRight: 10
               } }>
              <FacebookOutlined />
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'
               style={ {
                 marginRight: 10
               } }>
              <InstagramOutlined />
            </a>
            <a href='https://www.twitter.com'
               style={ {
                 marginRight: 10
               } }>
              <TwitterOutlined />
            </a>
            {/*<a href='https://www.google.com'*/}
            {/*   style={ {*/}
            {/*     marginRight: 10*/}
            {/*   } }>*/}
            {/*  <p><GooglePlusOutlined/></p>*/}
            {/*</a>*/}
          </Col>
          </Row>

        </Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
