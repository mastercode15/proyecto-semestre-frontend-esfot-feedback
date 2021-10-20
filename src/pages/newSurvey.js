import React, { useState, useEffect } from 'react';

import { useAuth } from '../providers/Auth';
import '../styles/navigation.css';
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import {useSubjectsList} from "../data/useSubjectsList";
//import {useSubjectChapters} from "../data/useSubjectChapters";

import useSWR from 'swr';
import API from '../data/index';

import {Col, Row, Skeleton, Card, Layout,Avatar,Image, Select, Button} from "antd";
const {Sider,Content}= Layout;


const NewSurveyPage= () => {

    const { currentUser } = useAuth();
    

    const { subjects, isLoading, isError} = useSubjectsList();
    const { Option } = Select;

    
    const [subjectNumber, setSubjectNumber] = useState(null);

    function useSubjectChapters () {
      const { data, error, mutate } = useSWR( () => `/subjectChapters/${subjectNumber}`, API.fetcher );
      return {
        subjectChapters: data && data.data,
        isLoadingC: !error && !data,
        isErrorC: error,
        mutate
      };
    };

    const [chapterNumber, setChapterNumber] = useState(null);


    function useChapters () {
      const { data, error, mutate } = useSWR( () => `/myChapters/${chapterNumber}`, API.fetcher );
      return {
        chapterDetails: data && data.data,
        isLoadingC: !error && !data,
        isErrorC: error,
        mutate
      };
    };

    const [subjectUsers, setSubjectUsers] = useState(null);

    function useSubjectUsers () {
      const { data, error, mutate } = useSWR( () => `/subjectUsers/${subjectUsers}`, API.fetcher );
      return {
        allSubjectUsers: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
      };
    };

    const [surveySubjectUsers, setSurveySubjectUsers] = useState(null);
    const [theArray, setTheArray] = useState([null]);

    function Subject_users () {
      const { data, error, mutate } = useSWR( () => `/subject/${subjectNumber}/user/${surveySubjectUsers}`, API.fetcher );
      return {
        surveySubjectUser: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
      };
    };

        
    var {subjectChapters } = useSubjectChapters();    
    var {chapterDetails} = useChapters(); 
    var {allSubjectUsers} = useSubjectUsers();
    var {surveySubjectUser} = Subject_users();

    const [surveySubject, setSurveySubject] = useState('');
    const [surveyChapter, setSurveyChapter] = useState('');    

    function handleChangeSubject(value) {
      console.log(`selected ${value}`);
      setSubjectNumber(value);
      setChapterNumber(null);
      setSurveySubject(value);
      setSurveyChapter('');
      setSubjectUsers(value);
    }

    function handleChangeChapters(value) {
        console.log(`selected ${value}`);
        setChapterNumber(value);        
        setSurveyChapter(value);
    }

    function handleChangeSubjectUser(value) {          
      setSurveySubjectUsers(value);
  }

    function sendSurveys(){
      if(surveySubject ==='' || surveyChapter ===''){
        alert('Seleccione la materia y el capítulo');
      }
      else{
        console.log('subject => ' + surveySubject + '  chapter => ' + surveyChapter);
        allSubjectUsers.map(async (allSubjectUser, index) => {
          // console.log(allSubjectUser.id),
          return await (
            console.log(allSubjectUser.id + '      +    '),
            handleChangeSubjectUser(allSubjectUser.id),      
            console.log(surveySubjectUser + '      -    '),
            surveySubjectUser.map((subject_user) => (
              console.log(subject_user.id + '     ---   ')
            ))
          )
        })
      }
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
    
    if( isError) {
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

                <h1 className="title">Objetivo:</h1>

                <h4>
                  {                            
                    chapterDetails?.map((chapterDetail) => (
                      chapterDetail.Objetives
                    ))
                  }
                </h4>
                
                <Button type="primary" onClick={sendSurveys}>Primary</Button>

            </Content>
        </Layout>

    </>
    );
};
export default withAuth(NewSurveyPage);