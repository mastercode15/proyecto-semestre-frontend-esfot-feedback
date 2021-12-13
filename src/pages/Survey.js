import React, { useEffect, useState } from "react";
import { Layout, Avatar, Image, Col, Row, Radio, Input, Button } from "antd";
import ShowError from "../components/ShowError";
import { useQuestionsList } from "../data/useQuestionsList";
import QuestionsList from "../components/QuestionsList";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import Routes from "../constants/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/Auth";

const { Sider, Content } = Layout;
const question = QuestionsList;

const PrivatePage = (props) => {
  const { currentUser } = useAuth();
  // console.log(props.location.data);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (localStorage["survey"] === undefined) {
      console.log("no hay nada ");
    } else {
      setData(JSON.parse(localStorage["survey"]));
      console.log("si hay algo");
    }
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data === undefined) {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <CheckCircleOutlined
            style={{ fontSize: "153px", color: "#1F3F6C" }}
          />
          <br />
          <h2>Encuesta enviada exitosamente</h2>
          <br />
          <h2>Te agradecemos</h2>
          <h2>
            Tu opinión es importante para que exista un mejoramiento continuo
          </h2>
          <Link to={Routes.HOME}>
            <Button type="primary" icon={<HomeOutlined />}>
              Inicio
            </Button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Layout>
          <Sider breakpoint={"md"} style={{ textAlign: "center" }}>
            <div>
              {currentUser.profileimage === "" ? (
                <Avatar
                  icon={
                    <Image src="https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png" />
                  }
                />
              ) : (
                <Avatar icon={<Image src={currentUser.profileimage} />} />
              )}
            </div>
          </Sider>

          <Content>
            <div
              className={"container"}
              style={{ fontSize: "x-large", margin: "0 5%" }}
            >
              <Col align={"center"}>
                <h1>Encuesta</h1>
              </Col>
              <Row className="survey-row">
                <Col xs={24} md={12}>
                  <h3>Materia: {data.subject}</h3>
                  <h3>Docente: {data.teacher}</h3>
                </Col>
                <Col xs={24} md={12}>
                  <h3>Tema: {data.chapter.Topic}</h3>
                </Col>
              </Row>
            </div>

            <div
              className={"container"}
              style={{ fontSize: "large", margin: "0 5%" }}
            >
              <br />
              <h4>Intsrucciones:</h4>
              <h4>
                {" "}
                Seleccione una calificación para la pregunta siendo 1 la
                calificación mas baja y 5 la calificación mas alta
              </h4>
              <br />

              {useQuestionsList.isLoading ? (
                "cargando..."
              ) : question.isError ? (
                <ShowError error={question.isError} />
              ) : (
                <QuestionsList
                  // answers={data.answers}
                  onChange={(value) => setData(value)}
                />
              )}
              <br />
            </div>
          </Content>
        </Layout>
      </>
    );
  }
};

export default PrivatePage;
