import React, { useEffect, useState } from "react";
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
} from "antd";
import { useQuestionsList } from "../data/useQuestionsList";
import ShowError from "./ShowError";
import SendOutlined from "@ant-design/icons/lib/icons/SendOutlined";
import API from "../data";
import ErrorList from "./ErrorList";
import { translateMessage } from "../utils/translateMessage";
import { useAuth } from "../providers/Auth";

const { TextArea } = Input;

const { Text } = Typography;

const QuestionsList = (props) => {
  const answer = JSON.parse(localStorage["survey"]).chapter.answers;
  console.log(answer);

  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

  const [inProgress, setInProgress] = useState(false);
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  const [answer5, setAnswer5] = useState(null);
  const [answer6, setAnswer6] = useState(null);
  const [answer7, setAnswer7] = useState(null);
  const [answer8, setAnswer8] = useState(null);
  const [answer9, setAnswer9] = useState(null);
  const [answer10, setAnswer10] = useState(null);
  const [answer11, setAnswer11] = useState(null);
  const [answer12, setAnswer12] = useState(null);
  const [comment, setComment] = useState(null);

  function handleChange(value) {
    switch (value.target.name) {
      case "pregunta1":
        setAnswer1(value.target.value);
        break;

      case "pregunta2":
        setAnswer2(value.target.value);
        break;

      case "pregunta3":
        setAnswer3(value.target.value);
        break;

      case "pregunta4":
        setAnswer4(value.target.value);
        break;

      case "pregunta5":
        setAnswer5(value.target.value);
        break;

      case "pregunta6":
        setAnswer6(value.target.value);
        break;

      case "pregunta7":
        setAnswer7(value.target.value);
        break;

      case "pregunta8":
        setAnswer8(value.target.value);
        break;

      case "pregunta9":
        setAnswer9(value.target.value);
        break;

      case "pregunta10":
        setAnswer10(value.target.value);
        break;

      case "pregunta11":
        setAnswer11(value.target.value);
        break;

      case "pregunta12":
        setAnswer12(value.target.value);
        break;
    }
  }

  const handleSaveComment = () => {
    const comment = document.querySelector("#comment").value;
    setComment(comment);
  };

  const handleSubmit = async () => {
    if (
      answer1 == null ||
      answer2 == null ||
      answer3 == null ||
      answer4 == null ||
      answer5 == null ||
      answer6 == null ||
      answer7 == null ||
      answer8 == null ||
      answer9 == null ||
      answer10 == null ||
      answer11 == null ||
      answer12 == null
    ) {
      message.warning("Debes contestar todas las preguntas");
    } else {
      try {
        setInProgress(true);
        await API.put(`/answers/` + answer[0].id, {
          Value: answer1,
        });
        await API.put(`/answers/` + answer[1].id, {
          Value: answer2,
        });
        await API.put(`/answers/` + answer[2].id, {
          Value: answer3,
        });
        await API.put(`/answers/` + answer[3].id, {
          Value: answer4,
        });
        await API.put(`/answers/` + answer[4].id, {
          Value: answer5,
        });
        await API.put(`/answers/` + answer[5].id, {
          Value: answer6,
        });
        await API.put(`/answers/` + answer[6].id, {
          Value: answer7,
        });
        await API.put(`/answers/` + answer[7].id, {
          Value: answer8,
        });
        await API.put(`/answers/` + answer[8].id, {
          Value: answer9,
        });
        await API.put(`/answers/` + answer[9].id, {
          Value: answer10,
        });
        await API.put(`/answers/` + answer[10].id, {
          Value: answer11,
        });
        await API.put(`/answers/` + answer[11].id, {
          Value: answer12,
        });
        if (comment != null) {
          await API.put(`/answers/` + answer[12].id, {
            Value: comment,
          });
        }
        setInProgress(false);
        localStorage.removeItem("survey");
        props.onChange(undefined);
        // setData(undefined)
      } catch (error) {
        console.log("error", error);
        //const errorList = error.response.error_list && <ErrorList errors={error.response.error_list} />;

        message.error(
          <>
            {translateMessage(error.message)}
            {/* {errorList} */}
          </>
        );
      }
    }
  };

  const { questions, isLoading, isError, mutate } = useQuestionsList();

  if (isLoading) {
    return (
      <Row justify="center" gutter={30} style={{ backgroundColor: "white" }}>
        {[...new Array(12)].map((_, i) => (
          <Col span={24} style={{ marginBottom: 2 }} key={i}>
            <Skeleton
              active
              paragraph={{ rows: 0 }}
              title={{
                width: "100%",
                style: { marginTop: 0, marginBottom: -10 },
              }}
            />
            <Skeleton
              active
              paragraph={{ rows: 0 }}
              title={{ width: 238, style: { marginTop: 0, marginBottom: -15 } }}
            />
          </Col>
        ))}
        <Col span={24} style={{ marginBottom: 2 }}>
          <Skeleton
            active
            paragraph={{ rows: 0 }}
            title={{ width: 238, style: { marginTop: 0, marginBottom: -10 } }}
          />
          <Skeleton.Input
            style={{ width: "100%", height: 95, marginBottom: 20 }}
            active
          />
          <Skeleton.Button active />
        </Col>
      </Row>
    );
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  return (
    <>
      {questions.map((question, index) => (
        <Row id={"questionRow" + index} key={"questionRow" + index}>
          {question.Type === "Cerrada" ? (
            <div>
              {index + 1 + ".- " + question.Text}
              <br />
              <Radio.Group
                key={question.Text}
                id={index}
                name={`pregunta${index + 1}`}
                onChange={handleChange}
                disabled={inProgress}
              >
                <Radio key={index} value={1}>
                  1
                </Radio>
                <Radio key={index + 1} value={2}>
                  2
                </Radio>
                <Radio key={index + 2} value={3}>
                  3
                </Radio>
                <Radio key={index + 3} value={4}>
                  4
                </Radio>
              </Radio.Group>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              {question.Text}
              <br />
              <TextArea
                rows={4}
                onChange={handleSaveComment}
                id={"comment"}
                disabled={inProgress}
              />
            </div>
          )}
        </Row>
      ))}
      <br />
      {!inProgress ? (
        <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>
          Enviar
        </Button>
      ) : (
        <Button type="primary" loading>
          Enviando Resultados
        </Button>
      )}
    </>
  );
};
export default QuestionsList;
