import React from "react";
import { Layout, Avatar, Image, Col, Row, Radio, Input, Button } from "antd";

import { useAnswersList } from "../data/useAnswersList";
import AnswersList from "../components/AnswersList";
import ShowError from "../components/ShowError";
const { Sider, Content } = Layout;
const answer = AnswersList;
const AboutPage = () => (
  <>
    <Layout>
      <Sider breakpoint={"md"} style={{ textAlign: "center" }}>
        <Avatar
          icon={
            <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          }
        />
      </Sider>
      <Content>
        {useAnswersList.isLoading ? (
          "cargando..."
        ) : answer.isError ? (
          <ShowError error={answer.isError} />
        ) : (
          <AnswersList answers={answer.Text} />
        )}
      </Content>
    </Layout>
  </>
);

export default AboutPage;
