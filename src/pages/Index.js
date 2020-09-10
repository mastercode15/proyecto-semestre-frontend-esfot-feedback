import React from 'react';
import ArticleList from '../components/SubjectsList';
import { useSubjectsList } from '../data/useSubjectsList';
import ShowError from '../components/ShowError';
import {Carousel, Col, Layout, Row} from "antd";
import estudiantes from "../images/estudiantes.jpg";
import profesores from "../images/profesores.jpg";
import logoFooter from "../images/logoFooter.png";
import principalLogo from '../images/logonormal.png';



const HomePage = () => {
  const articles = useSubjectsList();

  return (
    <>
        <Row justify='center'>
            <img src={principalLogo} height={ 100 } />
        </Row>
        <br/>
        <Row className='carouselPhotos' justify='center'>
            <Col>
                <Carousel autoplay style={{height: '300px', width: '700px'}}>
                    <div>
                        <img className='imgLogo' src={estudiantes} />
                    </div>
                    <div>
                        <img className='imgLogo' src={estudiantes} />
                    </div>
                    <div>
                        <img className='imgLogo' src={estudiantes} />
                    </div>
                    <div>
                        <img className='imgLogo' src={estudiantes} />
                    </div>
                </Carousel>
            </Col>
        </Row>
        <h1 className={'teacherTitle'}>Docentes</h1>
        <Row className='teacher'  type='flex' justify='center' style={ { flex: 'auto' } }>
            <Col span={9}>
                <img className='imgTeacher' src={profesores} />
            </Col>
            <Col span={13}>
                <p>
                    Los docentes son piezas fundamentales en todo el proceso de la enseñanza, ellos tienen la llave para mejorar el futuro de los estudiantes.
                    Un buen educador es aquel que entrega todo en el aula y reconoce la importancia de su figura en el desarrollo cognitivo y social de sus educandos. La excelencia del docente depende de muchos factores, pero por sobre todo los humanos. El brindar confianza y seguridad a sus métodos de enseñanza en un aula de clases son esenciales para incentivar al maestro.
                </p>
            </Col>
        </Row>
        <h1 className={'studentTitle'}>Estudiantes</h1>
        <Row className='student' type='flex' justify='center' style={ { flex: 'auto' } }>
            <Col span={13}>
                <p>
                    En el panorama educativo, el alumno es, sin ningún lugar a dudas, el elemento fundamental del proceso. En la antigüedad se consideraba que enseñar era dar formación a un ciudadano para fomentar su participación en el diálogo entre el maestro y sus discípulos, al que admiraban y discutían al mismo tiempo. A lo largo de la historia de la educación, la figura del alumno ha ido presentando distintos comportamientos en el proceso educativo, pasando de un respeto casi reverencial hacia el profesor en épocas pasadas hasta una falta de consideración que, según se escucha en algunos medios de comunicación, ha convertido a la enseñanza, sobre todo en su etapa secundaria, en una profesión de alto riesgo.
                </p>
            </Col>
            <Col span={9} className={'studentPhoto'}>
                <br/>
                <img className='imgStudent' src={estudiantes}/>
            </Col>
        </Row>

    </>
  );
};


export default HomePage;
