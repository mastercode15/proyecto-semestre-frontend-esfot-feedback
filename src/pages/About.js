import React, {useState, useEffect} from 'react';
import {Card, Col, Row, Select, Skeleton, Table, List, message, Divider} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSubjectsListChapters } from "../data/useSubjectsListChapters";
import { useQuestionsList } from "../data/useQuestionsList";
import { useAnswersByChapter } from "../data/useAnswersByChapter";

import API from "../data";
import ShowError from "../components/ShowError";
import Avatar from "antd/es/avatar/avatar";

const { Option } = Select;

const Dashboard = props => {
    const {chapterBySubjects, isLoadingS, isErrorS} = useSubjectsListChapters();
    const [dashboard, setDashboard] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [chapterObjective, setChapterObjective] = useState('');
    const [theAnswer, setTheAnswer] = useState([]);
    const [valuesq, setValuesq] = useState([]);
    const [valuesOpen, setValuesOpen] = useState([]);
    const [question, setQuestion] = useState([]);


    const [data, setData] = useState([]);
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            sorter: (a, b) => b.key - a.key,
        },
        {
            title: 'Materia',
            dataIndex: 'subject',
            sorter: (a, b) => a.subject.localeCompare(b.subject),
        },
        {
            title: 'Capítulo',
            dataIndex: 'chapter',
            sorter: (a, b) => a.chapter.localeCompare(b.chapter),
        },
        {
            title: 'Detalles',
            dataIndex: 'identifications',
            render: (identification, row, index) => {
                return <a  onClick={()=>{
                    sendChapters(
                        identification.chapterId ,
                        identification.subjectId,
                        );
                    setDashboard(true)
                    setSubjectName(identification.subjectName)
                    setChapterName(identification.chapterName)
                    setChapterObjective(identification.chapterObjective)
                }
                }>
                    Más detalles
                </a>
            },

        },
    ];
    let mychapter = [];
    let myQuestions = [];
    let totalAnswers = [];

    function sendChapters(chapterId, subjectId){
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

        const results = async () =>{
            mychapter = await API.get(`/chapter/${chapterId}/answers`);
            setQuestion(await API.get(`/question`));
            myQuestions = await API.get(`/question`);

        }

        results().then(() => {
            mychapter.data.map((subject, j) => {
                subject.chapters.map((chapter, i) =>{
                    if (chapter.answers.length != 0) {
                        totalAnswers.push(chapter.answers);
                        setTheAnswer(oldArray => [...oldArray, chapter.answers]);
                    }
                })

            })
        }).then(()=>{
            console.log('TERMINO ' , theAnswer);

            Object.keys(totalAnswers).map((item, i) => (
                totalAnswers[item].map((answer,ind) =>{
                    if(answer.Value != 0){
                        if(answer.FK_idQuestion == 1){
                            q1 = q1 + parseFloat(answer.Value);
                            tq1 = tq1 + 1;
                        }
                        else if(answer.FK_idQuestion == 2){
                            q2 = q2 + parseFloat(answer.Value);
                            tq2 = tq2 + 1;
                        }
                        else if(answer.FK_idQuestion == 3){
                            q3 = q3 + parseFloat(answer.Value);
                            tq3 = tq3 + 1;
                        }
                        else if(answer.FK_idQuestion == 4){
                            q4 = q4 + parseFloat(answer.Value);
                            tq4 = tq4 + 1;
                        }
                        else if(answer.FK_idQuestion == 5){
                            q5 = q5 + parseFloat(answer.Value);
                            tq5 = tq5 + 1;
                        }
                        else if(answer.FK_idQuestion == 6){
                            q6 = q6 + parseFloat(answer.Value);
                            tq6 = tq6 + 1;
                        }
                        else if(answer.FK_idQuestion == 7){
                            q7 = q7 + parseFloat(answer.Value);
                            tq7 = tq7 + 1;
                        }
                        else if(answer.FK_idQuestion == 8){
                            q8 = q8 + parseFloat(answer.Value);
                            tq8 = tq8 + 1;
                        }
                        else if(answer.FK_idQuestion == 9){
                            q9 = q9 + parseFloat(answer.Value);
                            tq9 = tq9 + 1;
                        }
                        else if(answer.FK_idQuestion == 10){
                            q10 = q10 + parseFloat(answer.Value);
                            tq10 = tq10 + 1;
                        }
                        else if(answer.FK_idQuestion == 11){
                            q11 = q11 + parseFloat(answer.Value);
                            tq11 = tq11 + 1;
                        }
                        else if(answer.FK_idQuestion == 12){
                            q12 = q12 + parseFloat(answer.Value);
                            tq12 = tq12 + 1;
                        }
                        else if(answer.FK_idQuestion == 13){
                            setValuesOpen(oldArray => [...oldArray, answer.Value]);
                        }
                        else{
                            console.log('No question')
                        }
                    }
                    else{
                        console.log('No question')
                    }

                }


                )
            ))
        }).then(()=>{
            console.log(q1 + '    ===   ' + tq1);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q1 /tq1).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q2 /tq2).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q3 /tq3).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q4 /tq4).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q5 /tq5).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q6 /tq6).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q7 /tq7).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q8 /tq8).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q9 /tq9).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q10 /tq10).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q11 /tq11).toFixed(2))]);
            setValuesq(oldArray => [...oldArray, ( parseFloat(q12 /tq12).toFixed(2))]);

        });
    }


    useEffect(() => {
        if (!isLoadingS && chapterBySubjects){
            chapterBySubjects.map((subject, j) => {
                subject.chapters.map((chapter, i) =>{
                    if (chapter.answers.length != 0) {
                        setData(data => [
                            ...data,
                            {
                                key: data.length + 1,
                                subject: subject.name,
                                chapter: chapter.Topic,
                                identifications: {
                                    chapterId : chapter.id,
                                    subjectId : subject.id,
                                    subjectName : subject.name,
                                    chapterName : chapter.Topic,
                                    chapterObjective: chapter.Objetives
                                },

                            }
                        ]);
                    }
                })

            })

        }
    },[chapterBySubjects]);


    if (isLoadingS) {
        return (
            <Row justify="center" gutter={30}>
                {[...new Array(9)].map((_, i) => (
                    <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                        <div style={{ textAlign: "center" }}>
                            <Skeleton.Input style={{ width: 600 }}/>
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


    if (dashboard){
        if(question.data){
            return (
                <>
                    <h2>HOLAAA</h2>
                    <h2> Materia: {subjectName}</h2>
                    <h2> Capítulo: {chapterName}</h2>
                    <h2> Objetivo: {chapterObjective}</h2>

                    {
                        question.data?.map((questions, j) => (
                            <>
                            <h4>{j + 1}. {questions.Text}</h4>
                                {
                                    j!=12?
                                    <h5>{
                                        valuesq[j]
                                    }
                                    </h5>
                                        :
                                        valuesOpen?
                                            <InfiniteScroll
                                                dataLength={valuesOpen.length}
                                                hasMore={data.length < 3}
                                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                                scrollableTarget="scrollableDiv"
                                            >
                                                <List
                                                    size="small"
                                                    bordered
                                                    dataSource={valuesOpen}
                                                    renderItem={item => <List.Item>{item}</List.Item>}
                                                />
                                                <List
                                                    dataSource={valuesOpen}
                                                    renderItem={item => <List.Item>{item}</List.Item>}
                                                />
                                            </InfiniteScroll>
                                            :
                                            null

                                }
                            </>
                        ))
                    }
                    <a  onClick={()=>{
                        setDashboard(false)
                        setQuestion([])
                    }}>
                        Regresar
                    </a>

                </>
            );
        }
        else {
            return (
                <Row justify="center" gutter={30}>
                    {[...new Array(9)].map((_, i) => (
                        <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                            <div style={{ textAlign: "center" }}>
                                <Skeleton.Input style={{ width: 600 }}/>
                                <Card title="" extra="" cover="" loading />
                            </div>
                        </Col>
                    ))}
                </Row>
            );
        }

    }

    else {
        return (
            <>
                <h1 className='title'>
                    Dashboard
                </h1>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={
                        {
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20']
                        }
                    } />

            </>
        );
    }

}

export default Dashboard;
