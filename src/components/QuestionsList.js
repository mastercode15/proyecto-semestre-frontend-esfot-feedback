import React, {useEffect, useState} from 'react';
import {Skeleton, Card, Col, Row, Radio, Typography, Button, Input, message} from 'antd';
import Routes from '../constants/routes';
import {Link} from 'react-router-dom';
import {useQuestionsList} from '../data/useQuestionsList';
import ShowError from './ShowError';
import SendOutlined from "@ant-design/icons/lib/icons/SendOutlined";
import API from "../data";
import ErrorList from "./ErrorList";
import {translateMessage} from "../utils/translateMessage";
import {useAuth} from "../providers/Auth";

const {TextArea} = Input;

const {Text} = Typography;
const QuestionsList = () => {
    const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

        let inProgres = false;
        const [answer1, setAnswer1] = useState(null);
        const [answer2, setAnswer2] = useState(null);
        const [answer3, setAnswer3] = useState(null);
        const [answer4, setAnswer4] = useState(null);
        const [answer5, setAnswer5] = useState(null);
        const [comment, setComment] = useState(null);


        function handleChange(value) {
            switch (value.target.name) {
                case 'pregunta1':
                    setAnswer1(value.target.value);
                    break;

                case 'pregunta2':
                    setAnswer2(value.target.value);
                    break;

                case 'pregunta3':
                    setAnswer3(value.target.value);
                    break;

                case 'pregunta4':
                    setAnswer4(value.target.value);
                    break;

                case 'pregunta5':
                    setAnswer5(value.target.value);
                    break;

            }
        }

        const handleSaveComment = () => {
            const comment = document.querySelector('#comment').value;
            setComment(comment);
        }

        const handleSubmit = async () => {
            if (answer1 == null || answer2 == null || answer3 == null || answer4 == null || answer5 == null) {
                window.alert('Debe contestar todas las preguntas')
            } else {
                try {

                    await API.post(`/answers`, {
                        Value: answer1,
                        FK_idQuestion: 1,
                        FK_idUser: currentUser.id,
                        FK_idChapter: 2,
                        user_subject_id: 1,
                    });
                    await API.post(`/answers`, {
                        Value: answer2,
                        FK_idQuestion: 2,
                        FK_idUser: currentUser.id,
                        FK_idChapter: 2,
                        user_subject_id: 1,
                    });
                    await API.post(`/answers`, {
                        Value: answer3,
                        FK_idQuestion: 3,
                        FK_idUser: currentUser.id,
                        FK_idChapter: 2,
                        user_subject_id: 1,
                    });
                    await API.post(`/answers`, {
                        Value: answer4,
                        FK_idQuestion: 4,
                        FK_idUser: currentUser.id,
                        FK_idChapter: 2,
                        user_subject_id: 1,
                    });
                    await API.post(`/answers`, {
                        Value: answer5,
                        FK_idQuestion: 5,
                        FK_idUser: currentUser.id,
                        FK_idChapter: 2,
                        user_subject_id: 1,
                    });
                    if (comment != null) {
                        await API.post(`/answers`, {
                            Value: comment,
                            FK_idQuestion: 6,
                            FK_idUser: currentUser.id,
                            FK_idChapter: 2,
                            user_subject_id: 1,
                        });
                    }


                } catch (error) {
                    console.log('error', error);
                    const errorList = error.response.error_list && <ErrorList errors={error.response.error_list}/>;

                    message.error(<>
                        {translateMessage(error.message)}
                        {errorList}
                    </>);
                }

            }

        }

        const {questions, isLoading, isError, mutate} = useQuestionsList();

        if (isLoading) {
            return <Row justify='center' gutter={30}>
                {
                    [...new Array(9)].map((_, i) =>
                        <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                            <div style={{textAlign: 'center'}}>
                                <Skeleton.Image style={{width: 200}}/>
                                <Card title='' extra='' cover='' loading/>
                            </div>
                        </Col>
                    )
                }
            </Row>;
        }

        if (isError) {
            return <ShowError error={isError}/>;
        }

        return (
            <>

                {
                    questions.map((question, index) => (

                            <Row id={'questiobRow' + index}>
                                {
                                    question.Type === 'Cerrada' ?
                                        <div>
                                            {question.Text}
                                            <br/>
                                            <Radio.Group id={index} name={`pregunta${index + 1}`} onChange={handleChange}>
                                                <Radio key={index} value={1}>1</Radio>
                                                <Radio key={index} value={2}>2</Radio>
                                                <Radio key={index} value={3}>3</Radio>
                                                <Radio key={index} value={4}>4</Radio>
                                                <Radio key={index} value={5}>5</Radio>
                                            </Radio.Group>
                                        </div>
                                        : <div style={{width: '50%'}}>
                                            {question.Text}
                                            <br/>
                                            <TextArea rows={4} onChange={handleSaveComment} id={'comment'}/>
                                        </div>

                                }


                            </Row>

                        )
                    )
                }
                <br/>
                <Button type="primary" icon={<SendOutlined/>} onClick={handleSubmit}>
                    Enviar
                </Button>
            </>
        );
    }
;

export default QuestionsList;
