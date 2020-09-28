import React from 'react';
import {Layout, Avatar, Image, Col, Row, Radio, Input, Button} from "antd";
import {useSubjectsList} from '../data/useSubjectsList';
import ShowError from "../components/ShowError";
import SubjectsList from "../components/SubjectsList";
import {useQuestionsList} from "../data/useQuestionsList";
import QuestionsList from "../components/QuestionsList";
import SendOutlined from "@ant-design/icons/lib/icons/SendOutlined";

const {Sider, Content} = Layout;
const {TextArea} = Input;
const question = QuestionsList;

const PrivatePage = () => {

    return <>
        <Layout>

            <Sider>
                <div>
                    <Avatar size={100} icon={<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>}/>
                </div>

            </Sider>
            <Content>


                <div className={'container'} style={{fontSize: 'x-large'}}>
                    <Col align={'center'}>
                        <h1>Encuesta</h1>
                    </Col>
                    <Row align={'center'}>
                        <Col span={12} align={'center'}>
                            <h3>Materia: Ambientes no propietarios </h3>
                            <h3>Docente: Edwin Salvador</h3>
                        </Col>
                        <Col span={12} align={'center'}>
                            <h3>
                                Tema: API REST
                            </h3>
                        </Col>

                    </Row>
                </div>

                <div className={'container'} style={{fontSize: 'large', margin: '0 5%'}}>
                    <br/>
                    <h4>Intsrucciones:</h4>
                    <h4> Seleccione una calificación para la pregunta siendo 1 la calificación mas baja y 5 la
                        calificación mas alta</h4>
                    <br/>


                    {
                        useQuestionsList.isLoading
                            ? 'cargando...'
                            : question.isError
                            ? <ShowError error={question.isError}/>
                            : <QuestionsList questions={question.Text}/>
                    }
                    <br/>
                </div>


            </Content>
        </Layout>


    </>;


}

export default PrivatePage;
