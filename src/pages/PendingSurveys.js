import React from "react";
import { Layout, Avatar, Image, Col, Row, Radio, Input, Button } from "antd";
import { useAuth } from "../providers/Auth";
import { useAnswersList } from "../data/useAnswersList";
import AnswersList from "../components/AnswersList";
import ShowError from "../components/ShowError";
const { Sider, Content } = Layout;
const answer = AnswersList;

const AboutPage = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Layout>
        <Sider breakpoint={"md"} style={{ textAlign: "center" }}>
          {currentUser.profileimage === "" ? (
            <Avatar
              icon={
                <Image src="https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png" />
              }
            />
          ) : (
            <Avatar icon={<Image src={currentUser.profileimage} />} />
          )}
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
};


export default AboutPage;
