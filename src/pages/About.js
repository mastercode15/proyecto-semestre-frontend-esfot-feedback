/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Select,
  Skeleton,
  Table,
  List,
  Layout,
  Button,
  Avatar,
  Image,
  Divider,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSubjectsListChapters } from "../data/useSubjectsListChapters";
import API from "../data";
import ShowError from "../components/ShowError";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FundOutlined, StepBackwardFilled } from "@ant-design/icons";
import { useAuth } from "../providers/Auth";
import { set } from "nprogress";

const { Option } = Select;
const { Sider, Content } = Layout;
Chart.register(...registerables);
const Dashboard = (props) => {
  const { currentUser } = useAuth();
  const { chapterBySubjects, isLoadingS, isErrorS } = useSubjectsListChapters();
  const [dashboard, setDashboard] = useState(false);
  const [compare, setCompare] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectNameToCompare, setSubjectNameToCompare] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterNameToCompare, setChapterNameToCompare] = useState("");
  const [chapterObjective, setChapterObjective] = useState("");
  const [chapterObjectiveToCompare, setChapterObjectiveToCompare] =
    useState("");
  const [valuesq, setValuesq] = useState([]);
  const [valuesq1, setValuesq1] = useState([]);
  const [valuesOpen, setValuesOpen] = useState([]);
  const [question, setQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);

  const barValues = {
    labels: questions,
    datasets: [
      {
        label: "Ponderación",
        data: valuesq,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",

          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",

          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barValuesComparison = {
    labels: defaultQuestions,
    datasets: [
      {
        label: chapterName,
        data: valuesq,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",

          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",

          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: chapterNameToCompare,
        data: valuesq1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",

          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 1)",

          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let dataChart = {};
  let colSpan = 24;
  let scales = {};
  if (compare) {
    dataChart = barValuesComparison;
    colSpan = 19;
    scales = {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    };
  } else {
    dataChart = barValues;
    scales = {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      x: {
        ticks: {
          display: false,
        },
      },
    };
  }

  const handleChange = (value) => {
    console.log("aquii:");
    console.log(value.currentTarget.style.visibility);
    value.currentTarget.style.visibility = "hidden";
  };

  const [data, setData] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      sorter: (a, b) => b.key - a.key,
    },
    {
      title: "Materia",
      dataIndex: "subject",
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Capítulo",
      dataIndex: "chapter",
      sorter: (a, b) => a.chapter.localeCompare(b.chapter),
    },
    {
      title: "Detalles",
      dataIndex: "identifications",
      render: (identification, row, index) => {
        return compare ? (
          <a
            onClick={() => {
              sendChapter2Compare(
                identification.chapterId,
                identification.subjectId
              );
              setDashboard(true);
              setSubjectNameToCompare(identification.subjectName);
              setChapterNameToCompare(identification.chapterName);
              setChapterObjectiveToCompare(identification.chapterObjective);
            }}
          >
            Comparar
          </a>
        ) : (
          <a
            onClick={(value) => {
              sendChapters(identification.chapterId, identification.subjectId);
              setDashboard(true);
              setSubjectName(identification.subjectName);
              setChapterName(identification.chapterName);
              setChapterObjective(identification.chapterObjective);
              handleChange(value);
            }}
          >
            Más detalles
          </a>
        );
      },
    },
  ];

  const questinList = (
    <div id="scrollableDiv">
      <InfiniteScroll
        dataLength={question.data?.length - 1}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={question.data}
          renderItem={(item, i) => (
            <List.Item>
              {item.Type === "Cerrada" && `${i + 1}. ${item.Text}`}
              {item.Type === "Cerrada" && (
                <Divider className="scrollableDivider" />
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );

  let mychapter = [];
  let chapter2compare = [];
  let totalAnswers = [];
  let totalAnswers2compare = [];

  function sendChapters(chapterId, subjectId) {
    console.log(`Selected chapter => ${chapterId}`);
    console.log(`Selected subject => ${subjectId}`);
    let q1 = 0;
    let tq1 = 0;
    let q2 = 0;
    let tq2 = 0;
    let q3 = 0;
    let tq3 = 0;
    let q4 = 0;
    let tq4 = 0;
    let q5 = 0;
    let tq5 = 0;
    let q6 = 0;
    let tq6 = 0;
    let q7 = 0;
    let tq7 = 0;
    let q8 = 0;
    let tq8 = 0;
    let q9 = 0;
    let tq9 = 0;
    let q10 = 0;
    let tq10 = 0;
    let q11 = 0;
    let tq11 = 0;
    let q12 = 0;
    let tq12 = 0;

    const results = async () => {
      mychapter = await API.get(`/chapter/${chapterId}/answers`);
      setQuestion(await API.get(`/question`));
    };

    results()
      .then(() => {
        mychapter.data.map((subject, j) => {
          subject.chapters.map((chapter, i) => {
            if (chapter.answers.length != 0) {
              totalAnswers.push(chapter.answers);
            }
          });
        });
      })
      .then(() => {
        Object.keys(totalAnswers).map((item, i) =>
          totalAnswers[item].map((answer, ind) => {
            if (answer.Value != 0) {
              if (answer.FK_idQuestion == 1) {
                q1 = q1 + parseFloat(answer.Value);
                tq1 = tq1 + 1;
              } else if (answer.FK_idQuestion == 2) {
                q2 = q2 + parseFloat(answer.Value);
                tq2 = tq2 + 1;
              } else if (answer.FK_idQuestion == 3) {
                q3 = q3 + parseFloat(answer.Value);
                tq3 = tq3 + 1;
              } else if (answer.FK_idQuestion == 4) {
                q4 = q4 + parseFloat(answer.Value);
                tq4 = tq4 + 1;
              } else if (answer.FK_idQuestion == 5) {
                q5 = q5 + parseFloat(answer.Value);
                tq5 = tq5 + 1;
              } else if (answer.FK_idQuestion == 6) {
                q6 = q6 + parseFloat(answer.Value);
                tq6 = tq6 + 1;
              } else if (answer.FK_idQuestion == 7) {
                q7 = q7 + parseFloat(answer.Value);
                tq7 = tq7 + 1;
              } else if (answer.FK_idQuestion == 8) {
                q8 = q8 + parseFloat(answer.Value);
                tq8 = tq8 + 1;
              } else if (answer.FK_idQuestion == 9) {
                q9 = q9 + parseFloat(answer.Value);
                tq9 = tq9 + 1;
              } else if (answer.FK_idQuestion == 10) {
                q10 = q10 + parseFloat(answer.Value);
                tq10 = tq10 + 1;
              } else if (answer.FK_idQuestion == 11) {
                q11 = q11 + parseFloat(answer.Value);
                tq11 = tq11 + 1;
              } else if (answer.FK_idQuestion == 12) {
                q12 = q12 + parseFloat(answer.Value);
                tq12 = tq12 + 1;
              } else if (answer.FK_idQuestion == 13) {
                setValuesOpen((oldArray) => [...oldArray, answer.Value]);
              } else {
                console.log("No question");
              }
            } else {
              console.log("No question");
            }
          })
        );
      })
      .then(() => {
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q1 / tq1).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q2 / tq2).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q3 / tq3).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q4 / tq4).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q5 / tq5).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q6 / tq6).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q7 / tq7).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q8 / tq8).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q9 / tq9).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q10 / tq10).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q11 / tq11).toFixed(2),
        ]);
        setValuesq((oldArray) => [
          ...oldArray,
          parseFloat(q12 / tq12).toFixed(2),
        ]);
      });
  }

  function sendChapter2Compare(chapterId, subjectId) {
    console.log(`Selected chapter => ${chapterId}`);
    console.log(`Selected subject => ${subjectId}`);
    let q1_1 = 0;
    let tq1_1 = 0;
    let q2_1 = 0;
    let tq2_1 = 0;
    let q3_1 = 0;
    let tq3_1 = 0;
    let q4_1 = 0;
    let tq4_1 = 0;
    let q5_1 = 0;
    let tq5_1 = 0;
    let q6_1 = 0;
    let tq6_1 = 0;
    let q7_1 = 0;
    let tq7_1 = 0;
    let q8_1 = 0;
    let tq8_1 = 0;
    let q9_1 = 0;
    let tq9_1 = 0;
    let q10_1 = 0;
    let tq10_1 = 0;
    let q11_1 = 0;
    let tq11_1 = 0;
    let q12_1 = 0;
    let tq12_1 = 0;

    const results = async () => {
      chapter2compare = await API.get(`/chapter/${chapterId}/answers`);
    };

    results()
      .then(() => {
        chapter2compare.data.map((subject, j) => {
          subject.chapters.map((chapter, i) => {
            if (chapter.answers.length != 0) {
              totalAnswers2compare.push(chapter.answers);
            }
          });
        });
      })
      .then(() => {
        Object.keys(totalAnswers2compare).map((item, i) =>
          totalAnswers2compare[item].map((answer, ind) => {
            if (answer.Value != 0) {
              if (answer.FK_idQuestion == 1) {
                q1_1 = q1_1 + parseFloat(answer.Value);
                tq1_1 = tq1_1 + 1;
              } else if (answer.FK_idQuestion == 2) {
                q2_1 = q2_1 + parseFloat(answer.Value);
                tq2_1 = tq2_1 + 1;
              } else if (answer.FK_idQuestion == 3) {
                q3_1 = q3_1 + parseFloat(answer.Value);
                tq3_1 = tq3_1 + 1;
              } else if (answer.FK_idQuestion == 4) {
                q4_1 = q4_1 + parseFloat(answer.Value);
                tq4_1 = tq4_1 + 1;
              } else if (answer.FK_idQuestion == 5) {
                q5_1 = q5_1 + parseFloat(answer.Value);
                tq5_1 = tq5_1 + 1;
              } else if (answer.FK_idQuestion == 6) {
                q6_1 = q6_1 + parseFloat(answer.Value);
                tq6_1 = tq6_1 + 1;
              } else if (answer.FK_idQuestion == 7) {
                q7_1 = q7_1 + parseFloat(answer.Value);
                tq7_1 = tq7_1 + 1;
              } else if (answer.FK_idQuestion == 8) {
                q8_1 = q8_1 + parseFloat(answer.Value);
                tq8_1 = tq8_1 + 1;
              } else if (answer.FK_idQuestion == 9) {
                q9_1 = q9_1 + parseFloat(answer.Value);
                tq9_1 = tq9_1 + 1;
              } else if (answer.FK_idQuestion == 10) {
                q10_1 = q10_1 + parseFloat(answer.Value);
                tq10_1 = tq10_1 + 1;
              } else if (answer.FK_idQuestion == 11) {
                q11_1 = q11_1 + parseFloat(answer.Value);
                tq11_1 = tq11_1 + 1;
              } else if (answer.FK_idQuestion == 12) {
                q12_1 = q12_1 + parseFloat(answer.Value);
                tq12_1 = tq12_1 + 1;
              } else if (answer.FK_idQuestion == 13) {
                setValuesOpen((oldArray) => [...oldArray, answer.Value]);
              } else {
                console.log("No question");
              }
            } else {
              console.log("No question");
            }
          })
        );
      })
      .then(() => {
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q1_1 / tq1_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q2_1 / tq2_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q3_1 / tq3_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q4_1 / tq4_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q5_1 / tq5_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q6_1 / tq6_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q7_1 / tq7_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q8_1 / tq8_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q9_1 / tq9_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q10_1 / tq10_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q11_1 / tq11_1).toFixed(2),
        ]);
        setValuesq1((oldArray) => [
          ...oldArray,
          parseFloat(q12_1 / tq12_1).toFixed(2),
        ]);
      });
  }

  useEffect(() => {
    if (!isLoadingS && chapterBySubjects) {
      chapterBySubjects.map((subject, j) => {
        subject.chapters.map((chapter, i) => {
          if (chapter.answers.length != 0) {
            setData((data) => [
              ...data,
              {
                key: data.length + 1,
                subject: subject.name,
                chapter: chapter.Topic,
                identifications: {
                  chapterId: chapter.id,
                  subjectId: subject.id,
                  subjectName: subject.name,
                  chapterName: chapter.Topic,
                  chapterObjective: chapter.Objetives,
                },
              },
            ]);
          }
        });
      });
    }
  }, [chapterBySubjects, isLoadingS]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    question.data?.map((item, i) => {
      // eslint-disable-next-line no-unused-expressions
      if (item.Type === "Cerrada") {
        setQuestions((prevState) => [...prevState, item.Text]);
        setDefaultQuestions((prevState) => [...prevState, `Pregunta ${i + 1}`]);
      }
    });
  }, [question]);

  if (isLoadingS) {
    return (
      <Row justify="center" gutter={30}>
        {[...new Array(9)].map((_, i) => (
          <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
            <div style={{ textAlign: "center" }}>
              <Skeleton.Input style={{ width: 600 }} />
              <Card title="" extra="" cover="" loading />
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  if (isErrorS) {
    return <ShowError error={isErrorS} />;
  }

  if (dashboard) {
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

          {question.data ? (
            <Content style={{ margin: "1rem" }}>
              {compare ? (
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={24}>
                      <h2> Materias Comparadas</h2>
                    </Col>
                    <Col span={24}>
                      <h3>
                        {subjectName} | {subjectNameToCompare}
                      </h3>
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    <Col xs={24} md={11} style={{ textAlign: "justify" }}>
                      <h3> Objetivo materia 1: {chapterObjective}</h3>
                    </Col>
                    <Col xs={24} md={11} style={{ textAlign: "justify" }}>
                      <h3> Objetivo materia 2: {chapterObjectiveToCompare}</h3>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={24}>
                      <h2> Materia: {subjectName}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} md={12}>
                      <h3> Capítulo: {chapterName}</h3>
                    </Col>
                    <Col xs={24} md={12}>
                      <h3> Objetivo: {chapterObjective}</h3>
                    </Col>
                  </Row>
                </div>
              )}
              {!compare && (
                <Button
                  onClick={() => {
                    setDashboard(false);
                    setCompare(true);
                  }}
                  type="primary"
                  icon={<FundOutlined />}
                  style={{ backgroundColor: "#001529", borderColor: "#001529" }}
                >
                  Compara los resultados !
                </Button>
              )}
              <div>
                <Divider />
                <Row>
                  {compare && (
                    <Col xs={24} md={5}>
                      {questinList}
                    </Col>
                  )}
                  <Col xs={24} md={colSpan}>
                    <Bar
                      data={dataChart}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: scales,
                        title: {
                          display: true,
                          text: "Ponderación de preguntas",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                  </Col>
                </Row>
              </div>

              <h4> Preguntas abiertas: </h4>
              <div
                style={{
                  overflow: "auto",
                  padding: "5px 5px",
                  height: "225px",
                }}
              >
                {valuesOpen.length != 0 ? (
                  <InfiniteScroll
                    dataLength={valuesOpen.length}
                    hasMore={data.length < 3}
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      size="small"
                      bordered
                      dataSource={valuesOpen}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </InfiniteScroll>
                ) : null}
              </div>

              <Button
                onClick={() => {
                  setDashboard(false);
                  setQuestion([]);
                  setQuestions([]);
                  setDefaultQuestions([]);
                  setValuesq([]);
                  setValuesOpen([]);
                  setCompare(false);
                }}
                type="primary"
                icon={<StepBackwardFilled />}
                style={{ backgroundColor: "#001529", borderColor: "#001529" }}
              >
                Regresar
              </Button>
            </Content>
          ) : (
            <Row justify="center" gutter={30}>
              {[...new Array(9)].map((_, i) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  style={{ marginBottom: 30 }}
                  key={i}
                >
                  <div style={{ textAlign: "center" }}>
                    <Skeleton.Input style={{ width: 600 }} />
                    <Card title="" extra="" cover="" loading />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Layout>
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
          <Content style={{ margin: "2rem" }}>
            <h2 className="title" style={{ textAlign: "center" }}>
              Resumen de encuestas realizadas
            </h2>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
              }}
            />
          </Content>
        </Layout>
      </>
    );
  }
};

export default Dashboard;
