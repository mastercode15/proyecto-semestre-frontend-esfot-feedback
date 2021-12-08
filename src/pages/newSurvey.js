import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/Auth";
import "../styles/navigation.css";
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import { useSubjectsList } from "../data/useSubjectsList";
//import {useSubjectChapters} from "../data/useSubjectChapters";

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
} from "antd";
const { Sider, Content } = Layout;

const NewSurveyPage = () => {
  const { currentUser } = useAuth();

  const { subjects, isLoading, isError } = useSubjectsList();
  const { Option } = Select;

  const [subjectNumber, setSubjectNumber] = useState(null);

  function useSubjectChapters() {
    const { data, error, mutate } = useSWR(
      () => `/subjectChapters/${subjectNumber}`,
      API.fetcher
    );
    return {
      subjectChapters: data && data.data,
      isLoadingC: !error && !data,
      isErrorC: error,
      mutate,
    };
  }

  const [chapterNumber, setChapterNumber] = useState(null);

  function useChapters() {
    const { data, error, mutate } = useSWR(
      () => `/myChapters/${chapterNumber}`,
      API.fetcher
    );
    return {
      chapterDetails: data && data.data,
      isLoadingC: !error && !data,
      isErrorC: error,
      mutate,
    };
  }

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

  const [theArray, setTheArray] = useState({});
  const [todos, setTodos] = useState([]);

  var { subjectChapters } = useSubjectChapters();
  var { chapterDetails } = useChapters();
  var { allSubjectUsers } = useSubjectUsers();

  const [surveySubject, setSurveySubject] = useState("");
  const [surveyChapter, setSurveyChapter] = useState("");

  function handleChangeSubject(value) {
    console.log(`selected ${value}`);
    setSubjectNumber(value);
    setChapterNumber(null);
    setSurveySubject(value);
    setSurveyChapter("");
    setSubjectUsers(value);
  }

  function handleChangeChapters(value) {
    console.log(`selected ${value}`);
    setChapterNumber(value);
    setSurveyChapter(value);
  }

  function sendSurveys() {
    var myDatas;
    if (surveySubject === "" || surveyChapter === "") {
      alert("Seleccione la materia y el capítulo");
    } else {
      console.log(
        "subject => " + surveySubject + "  chapter => " + surveyChapter
      );
      allSubjectUsers.map(
        async (allSubjectUser, index) => (
          (myDatas = await API.get(
            `/subject/${subjectNumber}/user/${allSubjectUser.id}`
          )),
          console.log(allSubjectUser.id + "      + ID del usuario"),
          console.log(myDatas.data[0].id + "      * ID del subject_user"),
          console.log(subjectNumber + "      * ID del subject"),
          console.log(chapterNumber + "      * ID del chapter"),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 1,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 2,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 3,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 4,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 5,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          await API.post(`/answers`, {
            Value: 0,
            FK_idQuestion: 6,
            FK_idUser: allSubjectUser.id,
            FK_idChapter: chapterNumber,
            subject_user_id: myDatas.data[0].id,
          }),
          setTodos((prevState) => [
            ...prevState,
            {
              user: allSubjectUser.id,
              subject_user: myDatas.data[0].id,
            },
          ])
        )
      );
      setTimeout(() => {
        //myFunction();
        todos.map((item) =>
          console.log(
            "user=> " + item.user + "  subject_user=> " + item.subject_user
          )
        );
      }, 5000);
    }
  }

  function myFunction() {
    console.log("HOLAAAAAAAAA");
    todos.map((item) =>
      console.log(
        "user=> " + item.user + "  subject_user=> " + item.subject_user
      )
    );
    //console.log(todos);
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
              {subjectChapters?.map((subjectChapter) => (
                <Option value={subjectChapter.id}>
                  {subjectChapter.Topic}
                </Option>
              ))}
            </Select>
          }

          <h1 className="title">Objetivo:</h1>

          <h4>
            {chapterDetails?.map((chapterDetail) => chapterDetail.Objetives)}
          </h4>

          <Button
            type="primary"
            onClick={sendSurveys}
            style={{ backgroundColor: "#001529", borderColor: "#001529" }}
          >
            Generar Encuesta
          </Button>
        </Content>
      </Layout>
    </>
  );
};
export default withAuth(NewSurveyPage);
