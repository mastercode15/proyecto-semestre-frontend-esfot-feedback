import React, { useState } from 'react';
import { Skeleton, Card, Col, Row, Radio, Typography, Button, Input, message, Collapse, List, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { useAnswersList } from '../data/useAnswersList';
import ShowError from './ShowError';
import { useAuth } from "../providers/Auth";
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';
const { Panel } = Collapse;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
function callback(key) {
    console.log(key);
}

const AnswerList = () => {
    const { answers, isLoading, isError, mutate } = useAnswersList();
    console.log(answers);


    if (isLoading) {
        return <Row justify='center' gutter={30}>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                        <div style={{ textAlign: 'center' }}>
                            <Skeleton.Image style={{ width: 200 }} />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError} />;
    }

    return (
        <>
            <h2>Encuestas Pendientes:</h2>
            <Collapse defaultActiveKey={['2']} onChange={callback}>
                {
                    answers.map((subject, index) => {
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
                                    {
                                        subject.chapters.map((chapter, i) => {
                                            if (chapter.answers.length != 0) {
                                                if (chapter.answers[0].Value == '') {
                                                    console.log("pendiente")
                                                    return (

                                                        <List.Item key={i}>
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                                }
                                                                title={<a href="https://ant.design">{chapter.Topic}</a>}
                                                                description={chapter.Objetives}
                                                            />
                                                            <Button onClick={() => console.log(chapter)}>
                                                                <Link to={Routes.PRIVATE}>Realizar Encuesta</Link>
                                                            </Button>
                                                        </List.Item>


                                                    )
                                                }

                                            } else {
                                                return (
                                                    <List.Item key={i}>
                                                        <List.Item.Meta
                                                            title={"No existen encuestas pendientes"}

                                                        />
                                                    </List.Item>
                                                )
                                            }
                                        })
                                    }
                                </InfiniteScroll>
                            </Panel>)
                    })
                }

            </Collapse>,


            <h2>Encuestas Pendientes:</h2>
            <Collapse defaultActiveKey={['2']} onChange={callback}>
                {
                    answers.map((subject, index) => {


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
                                    {
                                        subject.chapters.map((chapter, i) => {

                                            if (chapter.answers.length != 0) {
                                                if (chapter.answers[0].Value != '') {
                                                    return (
                                                        <List.Item key={i}>
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                                }
                                                                title={<a href="https://ant.design">{chapter.Topic}</a>}
                                                                description={"Encuesta respondida el: " + chapter.answers[0].updated_at.split("T")[0]}
                                                            />
                                                        </List.Item>
                                                    )
                                                }

                                            } else {
                                                return (
                                                    <List.Item key={i}>
                                                        <List.Item.Meta
                                                            title={"No existen encuestas pendientes"}

                                                        />
                                                        <Button>Realizar encuesta</Button>
                                                    </List.Item>
                                                )
                                            }
                                        })
                                    }
                                </InfiniteScroll>
                            </Panel>)
                    })
                }

            </Collapse>
        </>
    );
};

export default AnswerList;
