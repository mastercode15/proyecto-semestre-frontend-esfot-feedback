import React from 'react';
import ArticleList from '../components/SubjectsList';
import { useSubjectsList } from '../data/useSubjectsList';
import ShowError from '../components/ShowError';


const HomePage = () => {
  const articles = useSubjectsList();

  return (
    <>
      <h1 className='page-title'>
        <a href='https://es.reactjs.org/'>React</a> boilerplate
        con <a href='https://ant.design/docs/react/introduce'>Antd</a>
      </h1>

      <p>Este es el contenido de la página principal.</p>
        <h1>ESFOT Feedback</h1>

    </>
  );
};


export default HomePage;
