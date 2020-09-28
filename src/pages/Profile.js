import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import  {Menu } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useLocation, useParams} from 'react-router-dom';
import '../styles/navigation.css';
import {useArticle} from "../data/useArticle";
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import {useSubjectsList} from "../data/useSubjectsList";
import SubjectsList from "../components/SubjectsList";
import {Carousel, Col, Layout,Avatar,Image} from "antd";
const {Sider,Content}= Layout;



const ProfilePage= () => {
    const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

    const subject = SubjectsList;
    console.log(subject)
    const typeOfUser = (userType) =>{
        console.log(userType);

        let user = "No especificado";

        switch (userType) {
            case 'ROLE_TEACHER':
                user = "Docente"
                break;
            case 'ROLE_STUDENT':
                user = "Estudiante"
                break;


        }
        return user;

    }



    return<>
      
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
                    Perfil de usuario
                </h1>
                <h2>
                    <ul>
                        <li>Nombre: {currentUser.name} </li>
                        <li>Correo: {currentUser.email} </li>
                        <li>Rol: {typeOfUser(currentUser.role)} </li>


                    </ul>
                </h2>
                <h1 className="title">Materias:</h1>
                {
                    useSubjectsList.isLoading
                        ? 'cargando...'
                        :subject.isError
                        ?<ShowError error={subject.isError}/>
                        :<SubjectsList subject={subject.name}/>
                }

            </Content>
        </Layout>




    </>
};
export default withAuth(ProfilePage);