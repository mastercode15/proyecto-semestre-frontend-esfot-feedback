import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/Auth";
import "../styles/navigation.css";
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import { useSubjectsList } from "../data/useSubjectsList";
import { useAnswersList } from "../data/useAnswersList";
import InfiniteScroll from "react-infinite-scroller";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

import useSWR from "swr";
import API from "../data";

import {
  Col,
  Row,
  Skeleton,
  Card,
  Layout,
  Avatar,
  Image,
  Select,
  Button,
  Collapse,
  List,
} from "antd";
const { Sider, Content } = Layout;
function callback(key) {
  console.log(key);
}
const { Panel } = Collapse;

const NewSurveyPage = () => {
  const { answers, isLoading, isError, mutate } = useAnswersList();
  //console.log(answers);
  const { currentUser } = useAuth();

  const { subjects, isLoadingS, isErrorS } = useSubjectsList();
  const { Option } = Select;
  const [subjectNumber, setSubjectNumber] = useState(null);
  const [chapterNumber, setChapterNumber] = useState(null);
  const [subjectUsers, setSubjectUsers] = useState(null);

  function useSubjectUsers() {
    const { data, error, mutate } = useSWR(
      () => `/subjectUsers/${subjectUsers}`,
      API.fetcher
    );
    return {
      allSubjectUsers: data && data.data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  }

  var { allSubjectUsers } = useSubjectUsers();
  const [subjectChapters, setSubjectChapters] = useState([]);
  const [chapterDetails, setChapterDetails] = useState([]);

  const [surveySubject, setSurveySubject] = useState("");
  const [surveyChapter, setSurveyChapter] = useState("");
  const [data, setData] = useState(undefined);

  async function handleChangeSubject(value) {
    console.log(`selected ${value}`);
    setSubjectNumber(value);
    setChapterNumber(null);
    setSurveySubject(value);
    setSurveyChapter("");
    setSubjectUsers(value);
    setSubjectChapters(await API.get(`/subjectChapters/${value}`));
  }

  async function handleChangeChapters(value) {
    console.log(`selected ${value}`);
    setChapterNumber(value);
    setSurveyChapter(value);
    setChapterDetails(await API.get(`/myChapters/${value}`));
  }

  async function sendSurveys() {
    if (surveySubject === "" || surveyChapter === "") {
      alert("Seleccione la materia y el capítulo");
    } else {
      console.log(
        "subject => " + surveySubject + "  chapter => " + surveyChapter
      );
      const results = async () =>
        await Promise.all(
          allSubjectUsers.map(async (allSubjectUser, index) => {
            var myDatas = 0;

            myDatas = await API.get(
              `/subject/${subjectNumber}/user/${allSubjectUser.id}`
            );
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 1,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 2,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 3,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 4,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 5,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 6,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 7,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 8,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 9,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 10,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 11,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 12,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
            await API.post(`/answers`, {
              Value: 0,
              FK_idQuestion: 13,
              FK_idUser: allSubjectUser.id,
              FK_idChapter: chapterNumber,
              subject_user_id: myDatas.data[0].id,
            });
          })
        );

      results().then(() => {
        console.log("TERMINOOOO");
        setData("close");
      });
    }
  }

  if (isLoadingS) {
    return (
      <Row justify="center" gutter={30}>
        {[...new Array(9)].map((_, i) => (
          <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
            <div style={{ textAlign: "center" }}>
              <Skeleton.Image style={{ width: 200 }} />
              <Card title="" extra="" cover="" loading />
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  if (isErrorS) {
    return <ShowError error={isError} />;
  }

  if (isLoading) {
    return (
      <Row justify="center" gutter={30}>
        {[...new Array(9)].map((_, i) => (
          <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
            <div style={{ textAlign: "center" }}>
              <Skeleton.Image style={{ width: 200 }} />
              <Card title="" extra="" cover="" loading />
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  if (data !== undefined) {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <CheckCircleOutlined
            style={{ fontSize: "153px", color: "#1F3F6C" }}
          />
          <br />
          <h2>Encuestas creadas exitosamente</h2>
          <br />
          <h2>Se notificara a los estudiantes</h2>
          <h2>Gracias !</h2>
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
          <Sider>
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
            <h1 className="title">Crear encuesta</h1>
            <h2>Nombre: {currentUser.name}</h2>
            <h1 className="title">Seleccionar Materia:</h1>
            {
              <Select
                defaultValue="-Seleccionar-"
                style={{ width: 300, marginLeft: 20 }}
                onChange={handleChangeSubject}
              >
                {subjects?.map((subject) => (
                  <Option value={subject.id}>{subject.name}</Option>
                ))}
              </Select>
            }

            <h1 className="title">Seleccionar Capítulo:</h1>

            {
              <Select
                defaultValue="-Seleccionar-"
                style={{ width: 300, marginLeft: 20 }}
                onChange={handleChangeChapters}
              >
                {subjectChapters.data?.map((subjectChapter) => (
                  <Option value={subjectChapter.id}>
                    {subjectChapter.Topic}
                  </Option>
                ))}
              </Select>
            }

            <h1 className="title">Objetivo:</h1>

            <h4>
              {chapterDetails.data?.map(
                (chapterDetail) => chapterDetail.Objetives
              )}
            </h4>

            <Button
              type="primary"
              onClick={sendSurveys}
              style={{ backgroundColor: "#001529", borderColor: "#001529" }}
            >
              Generar Encuesta
            </Button>

            <h1 className="title">Encuestas creadas</h1>
            <Collapse defaultActiveKey={["2"]} onChange={callback}>
              {answers.map((subject, index) => {
                return (
                  <Panel header={subject.name} key={subject.id}>
                    <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      //loadMore={handleInfiniteOnLoad}
                      hasMore={true || false}
                      useWindow={false}
                      children={"test"}
                    >
                      {subject.chapters.map((chapter, i) => {
                        if (chapter.answers.length != 0) {
                          if (chapter.answers[0].Value != "") {
                            return (
                              <List.Item key={i}>
                                <List.Item.Meta
                                  title={<a href="#!">{chapter.Topic}</a>}
                                  description={
                                    "Encuesta creada el: " +
                                    chapter.answers[0].created_at.split("T")[0]
                                  }
                                />
                              </List.Item>
                            );
                          }
                        } else {
                          if (i == 0) {
                            return null;
                          }
                        }
                      })}
                    </InfiniteScroll>
                  </Panel>
                );
              })}
            </Collapse>
          </Content>
        </Layout>
      </>
    );
  }
};
export default withAuth(NewSurveyPage);
