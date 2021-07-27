import React from 'react';
import { Layout, Avatar, Image, Col, Row, Radio, Input, Button } from "antd";
import ShowError from "../components/ShowError";
import { useQuestionsList } from "../data/useQuestionsList";
import QuestionsList from "../components/QuestionsList";

const { Sider, Content } = Layout;
const question = QuestionsList;

const PrivatePage = (props) => {
    console.log(props.location.data);
    const data = props.location.data;
    return <>
        <Layout>

            <Sider>
                <div>
                    <Avatar size={100} icon={<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />} />
                </div>

            </Sider>
            <Content>


                <div className={'container'} style={{ fontSize: 'x-large' }}>
                    <Col align={'center'}>
                        <h1>Encuesta</h1>
                    </Col>
                    <Row align={'center'}>
                        <Col span={12} align={'center'}>
                            <h3>Materia: {'espacio para la materia'}</h3>
                            <h3>Docente: {'espacio para el docente'}</h3>
                        </Col>
                        <Col span={12} align={'center'}>
                            <h3>
                                Tema: {data.Topic}
                            </h3>
                        </Col>

                    </Row>
                </div>

                <div className={'container'} style={{ fontSize: 'large', margin: '0 5%' }}>
                    <br />
                    <h4>Intsrucciones:</h4>
                    <h4> Seleccione una calificación para la pregunta siendo 1 la calificación mas baja y 5 la
                        calificación mas alta</h4>
                    <br />


                    {
                        useQuestionsList.isLoading
                            ? 'cargando...'
                            : question.isError
                                ? <ShowError error={question.isError} />
                                : <QuestionsList answers={data.answers} />
                    }
                    <br />
                </div>


            </Content>
        </Layout>


    </>;


}

export default PrivatePage;
