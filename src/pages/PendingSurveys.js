import React from 'react';
import { Layout, Avatar, Image, Col, Row, Radio, Input, Button } from "antd";

import { useAnswersList } from "../data/useAnswersList";
import AnswersList from "../components/AnswersList";
import ShowError from "../components/ShowError";
const { Sider, Content } = Layout;
const answer = AnswersList;
const AboutPage = () => (
    <>
        <Layout>

            <Sider>
                <div>
                    <Avatar size={100} icon={<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />} />
                </div>

            </Sider>
            <Content>

                {
                    useAnswersList.isLoading
                        ? 'cargando...'
                        : answer.isError
                            ? <ShowError error={answer.isError} />
                            : <AnswersList answers={answer.Text} />
                }

            </Content>
        </Layout>
        <h1>this is a test</h1>
    </>
);

export default AboutPage;
