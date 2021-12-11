import React, {useState, useEffect} from 'react';
import {Card, Col, Row, Select, Skeleton, Table} from 'antd';
import { useSubjectsListChapters } from "../data/useSubjectsListChapters";
import { useAnswersByChapter } from "../data/useAnswersByChapter";

import API from "../data";
import ShowError from "../components/ShowError";

const { Option } = Select;

const AboutPage = () => {
    const {chapterBySubjects, isLoadingS, isErrorS} = useSubjectsListChapters();

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
                return <a href="#" onClick={() => {
                    sendChapters(identification.chapterId , identification.subjectId)}}>
                    Más detalles
                </a>
            },

        },
    ];
    const [dashboard, setDashboard] = useState(0);
    let mychapter = [];


    function sendChapters(chapterId, subjectId){
        console.log(`Selected chapter => ${chapterId}`);
        console.log(`Selected subject => ${subjectId}`);

        const results = async () =>{
            mychapter = await API.get(`/chapter/${chapterId}/answers`);
        }

        results().then(() => {
            mychapter.data.map((subject, j) => {
                subject.chapters.map((chapter, i) =>{
                    if (chapter.answers.length != 0) {
                        console.log(chapter.answers);
                    }
                })

            })
            setDashboard(1);
        });
    }



    useEffect(() => {
        if (!isLoadingS){
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
                                    subjectId : subject.id
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
    if (dashboard === 1){
        return (
            <>
                <h1>HOLAAA</h1>
                <Row justify="center" gutter={30}>
                    {[...new Array(9)].map((_, i) => (
                    <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                        <div style={{ textAlign: "center" }}>
                            <Skeleton style={{ width: 600 }}/>
                            <Card title="" extra="" cover="" loading />
                        </div>
                    </Col>
                    ))}
                </Row>
            </>
        );
    }

    else {
        return (
            <>
                {

                }

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

export default AboutPage;
