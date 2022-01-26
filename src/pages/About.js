/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Col,
  Row,
  Skeleton,
  Table,
  List,
  Layout,
  Button,
  Avatar,
  Image,
  Divider,
} from "antd";
import { Gauge, RadialBar } from "@ant-design/plots";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSubjectsListChapters } from "../data/useSubjectsListChapters";
import API from "../data";
import ShowError from "../components/ShowError";
import { Bar, Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FundOutlined, StepBackwardFilled } from "@ant-design/icons";
import { useAuth } from "../providers/Auth";

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
  const [valuesOpen1, setValuesOpen1] = useState([]);
  const [question, setQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const [element, setElement] = useState();
  const [maxangle, setmaxAngle] = useState();

  const finalRes = () => {
    let res = 0;
    valuesq.forEach((val) => (res += parseFloat(val)));
    res = res / 48;
    res = (res * 100).toFixed(2);
    return res;
  };

  const finalResToCompare = () => {
    let res1 = finalRes();
    let res = 0;
    valuesq1.forEach((val) => (res += parseFloat(val)));
    res = res / 48;
    res = (res * 100).toFixed(2);
    if (parseInt(res1) > parseInt(res)) {
      setmaxAngle(parseInt(res1) * 3.6);
    } else {
      setmaxAngle(parseInt(res) * 3.6);
    }
    console.log("---------->" + maxangle);
    return res;
  };

  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ["#F4664A", "#FAAD14", "#30BF78"];
  const graphRef = useRef(null);

  //data for medidor
  const medidorConfig = {
    percent: finalRes() / 100,
    range: {
      ticks: [0, 1],
      color: ["l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      title: {
        formatter: ({ percent }) => {
          if (percent < ticks[1]) {
            return "Bajo(" + finalRes() + " %)";
          }

          if (percent < ticks[2]) {
            return "Medio(" + finalRes() + " %)";
          }

          return "Alto(" + finalRes() + " %)";
        },
        style: ({ percent }) => {
          return {
            fontSize: "36px",
            lineHeight: 1,
            color:
              percent < ticks[1]
                ? color[0]
                : percent < ticks[2]
                ? color[1]
                : color[2],
          };
        },
      },
    },
    onReady: (plot) => {
      graphRef.current = plot;
    },
  };

  //data for compare the rate of each subject

  const DemoRadialBar = () => {
    let data = [
      {
        alias: "cap. 1",
        name: chapterName,
        percent: finalRes() * 1,
      },
      {
        alias: "cap. 2",
        name: chapterNameToCompare,
        percent: finalResToCompare() * 1,
      },
    ];
    const config = {
      data,
      xField: "name",
      yField: "percent",
      xAxis: false,
      maxAngle: maxangle,
      radius: 0.8,
      innerRadius: 0.2,
      tooltip: {
        formatter: (datum) => {
          return {
            name: "rendimiento",
            value: datum.percent + "%",
          };
        },
      },
      colorField: "percent",
      color: ({ percent }) => {
        if (percent > 67) {
          return "#30BF78";
        } else if (percent > 34) {
          return "#FAAD14";
        }

        return "#F4664A";
      },
      annotations: data.map((element) => ({
        type: "html",
        position: [element.name, 0],
        html: `<div style="width:65px;transform:translate(-50%, -50%)">
        ${element.percent}%
      </div>`,
      })),
    };
    return <RadialBar {...config} />;
  };

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
  const singleRadar = {
    labels: ["cat 1", "cat 2", "cat 3", "cat 4"],
    datasets: [
      {
        label: "My First Dataset",
        data: [8, 10, 9, 5],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const comparisonRadar = {
    labels: ["cat 1", "cat 2", "cat 3", "cat 4"],
    datasets: [
      {
        label: "My First Dataset",
        data: [8, 10, 9, 5],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "My Second Dataset",
        data: [2, 4, 10, 12],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
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
  let radarData = {};
  let compareTitle = "";
  let commentsColumnSpan = 24;
  if (compare) {
    compareTitle = `Comentarios para ${chapterName}:`;
    dataChart = barValuesComparison;
    radarData = comparisonRadar;
    colSpan = 19;
    commentsColumnSpan = 12;
    scales = {
      y: {
        beginAtZero: true,
      },
    };
  } else {
    compareTitle = "Comentarios de estudiantes:";
    dataChart = barValues;
    radarData = singleRadar;
    scales = {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          display: false,
        },
      },
    };
  }

  const handleChange = (value) => {
    console.log("aquii:");
    console.log(value.currentTarget.parentElement.parentElement);
    setElement(
      value.currentTarget.parentElement.parentElement.getAttribute(
        "data-row-key"
      )
    );
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
                setValuesOpen1((oldArray) => [...oldArray, answer.Value]);
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
                    <Col span={24}>
                      <h3> Capítulos Comparados</h3>
                    </Col>
                    <Col span={24}>
                      <h3>
                        {chapterName} | {chapterNameToCompare}
                      </h3>
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    <Col xs={24} md={11} style={{ textAlign: "justify" }}>
                      <h3>
                        Objetivo ({chapterNameToCompare}): {chapterObjective}
                      </h3>
                    </Col>
                    <Col xs={24} md={11} style={{ textAlign: "justify" }}>
                      <h3>
                        Objetivo ({chapterNameToCompare}):{" "}
                        {chapterObjectiveToCompare}
                      </h3>
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
                  onClick={async () => {
                    setDashboard(false);
                    setCompare(true);
                    await document.querySelector(
                      `tr[data-row-key="${element}"]`
                    );
                    document
                      .querySelector(`tr[data-row-key="${element.toString()}"]`)
                      .remove();
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
                      <h4>Preguntas:</h4>
                      {questinList}
                    </Col>
                  )}
                  <Col
                    xs={24}
                    md={colSpan}
                    style={{ height: "100% !important" }}
                  >
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
                <br />
                <Row style={{ justifyContent: "space-between" }}>
                  <Col xs={24} md={commentsColumnSpan}>
                    <h4>{compareTitle}</h4>
                    <div
                      style={{
                        overflow: "auto",
                        padding: "5px 5px",
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
                  </Col>
                  {compare && (
                    <Col xs={24} md={12}>
                      <h4> Comentarios para {chapterNameToCompare}:</h4>
                      <div
                        style={{
                          overflow: "auto",
                          padding: "5px 5px",
                        }}
                      >
                        {valuesOpen1.length != 0 ? (
                          <InfiniteScroll
                            dataLength={valuesOpen.length}
                            hasMore={data.length < 3}
                            scrollableTarget="scrollableDiv"
                          >
                            <List
                              size="small"
                              bordered
                              dataSource={valuesOpen1}
                              renderItem={(item) => (
                                <List.Item>{item}</List.Item>
                              )}
                            />
                          </InfiniteScroll>
                        ) : null}
                      </div>
                    </Col>
                  )}
                </Row>
                <br />
                <Row style={{ justifyContent: "space-evenly" }}>
                  {compare ? (
                    <Col xs={24} md={11}>
                      <h2>Comparación de rendimiento</h2>
                      <h4>
                        Pasa el cursor por la barra para saber conocer mas
                        información
                      </h4>
                      <DemoRadialBar />
                    </Col>
                  ) : (
                    <Col xs={24} md={11}>
                      <h2>Rendimiento General</h2>
                      <Gauge {...medidorConfig} />
                    </Col>
                  )}
                  <Col xs={24} md={11}>
                    <h2>Rendimiento por categoría</h2>
                    <Radar
                      data={radarData}
                      options={{
                        responsive: true,
                        scales: {
                          r: {
                            suggestedMin: 0,
                            suggestedMax: 12,
                          },
                        },
                      }}
                    />
                  </Col>
                </Row>
              </div>

              <Button
                onClick={() => {
                  setDashboard(false);
                  setQuestion([]);
                  setQuestions([]);
                  setDefaultQuestions([]);
                  setValuesq([]);
                  setValuesq1([]);
                  setValuesOpen([]);
                  setValuesOpen1([]);
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
                position: ["topLeft"],
                defaultPageSize: 30,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </Content>
        </Layout>
      </>
    );
  }
};

export default Dashboard;
