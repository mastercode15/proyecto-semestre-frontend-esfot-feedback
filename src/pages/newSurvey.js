import React, { useState } from 'react';

import { useAuth } from '../providers/Auth';
import '../styles/navigation.css';
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import {useSubjectsList} from "../data/useSubjectsList";
import {useSubjectChapters} from "../data/useSubjectChapters";

import {Col, Row, Skeleton, Card, Layout,Avatar,Image, Select } from "antd";
const {Sider,Content}= Layout;



const NewSurveyPage= () => {
    const { currentUser } = useAuth();


    const { subjects, isLoading, isError} = useSubjectsList();
    const { subjectChapters, isLoadingC, isErrorC} = useSubjectChapters(1);
    const { Option } = Select;


    function handleChangeSubject(value) {
      console.log(`selected ${value}`);      
    }

    function handleChangeChapters(value) {
        console.log(`selected ${value}`);
    }

    if( isLoading) {
      return <Row justify='center' gutter={ 30 }>
        {
          [ ...new Array( 9 ) ].map( ( _, i ) =>
            <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
              <div style={ { textAlign: 'center' } }>
                <Skeleton.Image style={ { width: 200 } } />
                <Card title='' extra='' cover='' loading />
              </div>
            </Col>
          )
        }
      </Row>;
    }
    if( isLoadingC) {
        return <Row justify='center' gutter={ 30 }>
          {
            [ ...new Array( 9 ) ].map( ( _, i ) =>
              <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                <div style={ { textAlign: 'center' } }>
                  <Skeleton.Image style={ { width: 200 } } />
                  <Card title='' extra='' cover='' loading />
                </div>
              </Col>
            )
          }
        </Row>;
      }

    if( isError) {
        return <ShowError error={ isError } />;
    }
    if( isErrorC) {
        return <ShowError error={ isError } />;
    }

    return(
    <>      
        <Layout>
            <Sider>
                <div>
                    <Avatar size={100} icon={<Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>}/>
                </div>
            </Sider>
            <Content>
                <h1 className="title">
                    Crear encuesta
                </h1>
                <h2>Nombre: {currentUser.name}</h2>
                <h1 className="title">Seleccionar Materia:</h1>
                {
                    <Select defaultValue="-Seleccionar-" style={{ width: 300, marginLeft: 20 }} onChange={handleChangeSubject}>
                        {
                          subjects?.map( ( subject ) => (
                          <Option value={subject.id}>{subject.name}</Option>
                          ))
                        }
                    </Select>
                }
                
                <h1 className="title">Seleccionar Capítulo:</h1>

                {
                    <Select defaultValue="-Seleccionar-" style={{ width: 300, marginLeft: 20 }} onChange={handleChangeChapters}>
                        {                            
                            subjectChapters?.map((subjectChapter) => (
                            <Option value={subjectChapter.id}>{subjectChapter.Topic}</Option>
                            ))
                        }
                    </Select>
                }


            </Content>
        </Layout>

    </>
    );
};
export default withAuth(NewSurveyPage);