import React from "react";
import Routes from "../constants/routes";
import Navigation from "./Navigation";
import { Carousel, Layout, Row, Col, Button, Popover } from "antd";
import {
  SkypeOutlined,
  EnvironmentOutlined,
  TwitterOutlined,
  GooglePlusOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import logoFooter from "../images/logoFooter.png";
import estudiantes from "../images/estudiantes.jpg";
import logo from "../images/logoNavbar.png";
import profesores from "../images/profesores.jpg";
import principalLogo from "../images/logonormal.png";
import moment from "moment";
import { Link } from "react-router-dom";

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
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
const MainLayout = (props) => {
  console.log("props", props);
  return (
    <div className="app">
      <Layout>
        <Row type="flex" justify="center" className="header-wrapper">
          <Col span={20}>
            <Header className="header">
              <Row type="flex" justify="space-between" align="bottom">
                <Col xs={24} md={6} className="logo-wrapper">
                  <a href={process.env.REACT_APP_DOMAIN}>
                    <img className="logo" src={logo} alt="Grupo Menta" />
                  </a>
                </Col>

                <Col md={14} align="right" className="main-menu">
                  <Navigation mode="horizontal" />
                </Col>

                <Col xs={2} align="right" className="responsive-menu-button">
                  <Popover
                    content={<Navigation mode="vertical" />}
                    trigger="click"
                    placement="rightTop"
                    overlayClassName="responsive-menu-wrapper"
                  >
                    <Button type="primary">
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        className=""
                        data-icon="menu"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </Button>
                  </Popover>
                </Col>
              </Row>
            </Header>
          </Col>
        </Row>

        <Content className="content">
          <Row type="flex" justify="center" style={{ flex: "auto" }}>
            <Col span={24}>{props.children}</Col>
          </Row>
        </Content>

        <Footer className="footer">
          <Row>
            <Col xs={{ span: 24 }} md={10} className="contact-links">
              <a rel="noopener noreferrer" target="_blank">
                <img src={logoFooter} width="80%" />
              </a>
              <br />
              <br />
              <p>Somos tu plataforma de confianza</p>
              <p>ESFOT Feedback Team</p>
            </Col>

            <Col xs={{ span: 24 }} md={10} className="contact-links">
              <p>
                <strong>Contactos</strong>
              </p>

              <p>
                <EnvironmentOutlined />
                Casa de la Cultura
              </p>
              <p>
                <WhatsAppOutlined />{" "}
                <a
                  href="https://wa.me/593983927151"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +593 9-8392-7151
                </a>
              </p>
              <p>
                <MailOutlined /> mario.montero@epn.edu.ec
              </p>
              <p>
                <SkypeOutlined />
                ESFOT Feedback
              </p>
            </Col>

            <Col
              xs={{
                span: 24,
                offset: 0,
              }}
              md={4}
            >
              <strong>Síguenos en:</strong>
              <br />
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: 10,
                }}
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: 10,
                }}
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://www.twitter.com"
                style={{
                  marginRight: 10,
                }}
              >
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
