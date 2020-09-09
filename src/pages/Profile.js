import React, {useEffect} from 'react';
import {useAuth} from "../providers/Auth";
import Cookies from "js-cookie";
import API from "../data";
import {useCategoriesByUser} from "../data/useCategoriesByUser";
import ShowError from "../components/ShowError";

import CategoriesByUserList from "../components/CategoriesByUserList";


const ProfilePage = () => {
    const categoriesByUser = useCategoriesByUser();

    const { currentUser } = useAuth();
    const typeOfUser = (userType) =>{
        console.log(userType);

        let user = "No especificado";
        // eslint-disable-next-line default-case
        switch (userType) {
            case 'App\\Admin':
                user = "Admim"
                break;
            case 'App\\Writer':
                user = "Escritor"
                break;


        }
        return user;
    }


    useEffect(() => {

    }, [currentUser]);

    return<>
        <h1 className='title'>
            Perfil de usuario
        </h1>
        <h2>
            <ul>
                <li>Nombre: {currentUser.name}</li>
                <li>Correo: {currentUser.email}</li>
                <li>Tipo de Usuario:{typeOfUser(currentUser.userable_type)}</li>
            </ul>
        </h2>
        <h1 className='title'>
            Categorias a las que pertenece el usuario:
        </h1>
        <h2>
            {
                categoriesByUser.isLoading
                    ? 'Cargando...'
                    : categoriesByUser.isError
                    ? <ShowError error={ categoriesByUser.isError } />
                    : <CategoriesByUserList categoriesByUser={ categoriesByUser.categories } />
            }
        </h2>

    </>
};

export default ProfilePage;