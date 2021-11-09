import React from "react";
import {
  Skeleton,
  Card,
  Col,
  Row,
  Radio,
  Typography,
  Button,
  Input,
  message,
  Collapse,
  List,
  Avatar,
  Spin,
} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useAnswersList } from "../data/useAnswersList";
import ShowError from "./ShowError";
import { Link } from "react-router-dom";
const { Panel } = Collapse;
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
function callback(key) {
  console.log(key);
}

const AnswerList = () => {
  const { answers, isLoading, isError, mutate } = useAnswersList();
  console.log(answers);

  if (isLoading) {
    return (
      <>
        {[...new Array(2)].map((_, i) => (
          <Row gutter={30} style={{ backgroundColor: "white" }}>
            <Skeleton.Button
              style={{ width: 200, marginBottom: 5 }}
              active={true}
              size="large"
            />
            {[...new Array(6)].map((_, i) =>
              i !== 5 ? (
                <Col span={24} style={{ marginBottom: 2 }} key={i}>
                  <Skeleton.Button
                    style={{ width: 1300 }}
                    active={true}
                    size="large"
                  />
                </Col>
              ) : (
                <Col span={24} style={{ marginBottom: 8 }} key={i}>
                  <Skeleton.Button
                    style={{ width: 1300 }}
                    active={true}
                    size="large"
                  />
                </Col>
              )
            )}
          </Row>
        ))}
      </>
    );
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  return (
    <>
      <h2>Encuestas Pendientes:</h2>
      <Collapse onChange={callback}>
        {answers.map((subject, index) => {
          return (
            console.log(subject.chapters),
            (
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
                      if (chapter.answers[0].Value == 0) {
                        console.log("pendiente");
                        return (
                          <List.Item key={i}>
                            <List.Item.Meta
                              title={
                                <a href="https://ant.design">{chapter.Topic}</a>
                              }
                              description={chapter.Objetives}
                            />
                            <Button
                              onClick={() =>
                                localStorage.setItem(
                                  "survey",
                                  JSON.stringify({
                                    subject: subject.name,
                                    teacher: "teacher",
                                    chapter: chapter,
                                  })
                                )
                              }
                            >
                              <Link
                                to={{
                                  pathname: "/survey",
                                  data: chapter,
                                }}
                              >
                                Realizar Encuesta
                              </Link>
                            </Button>
                          </List.Item>
                        );
                      }
                    } else {
                      if (i == 0) {
                        return (
                          <List.Item key={i}>
                            <List.Item.Meta
                              title={"No existen encuestas pendientes"}
                            />
                          </List.Item>
                        );
                      }
                    }
                  })}
                </InfiniteScroll>
              </Panel>
            )
          );
        })}
      </Collapse>
      <h2>Encuestas Realizas:</h2>
      <Collapse onChange={callback}>
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
                            title={
                              <a href="https://ant.design">{chapter.Topic}</a>
                            }
                            description={
                              "Encuesta respondida el: " +
                              chapter.answers[0].updated_at.split("T")[0]
                            }
                          />
                        </List.Item>
                      );
                    }
                  } else {
                    if (i == 0) {
                      return (
                        <List.Item key={i}>
                          <List.Item.Meta
                            title={"No has respondido ninguna encuesta"}
                          />
                        </List.Item>
                      );
                    }
                  }
                })}
              </InfiniteScroll>
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
};

export default AnswerList;
