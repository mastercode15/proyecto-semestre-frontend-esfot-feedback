import React, { useEffect, useState } from 'react';
import { Skeleton, Card, Col, Row, Radio, Typography, Button, Select  } from 'antd';
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { useSubjectsList } from '../data/useSubjectsList';
import ShowError from './ShowError';

const { Text } = Typography;

const SubjectsList = ( props ) => {

    const { subjects, isLoading, isError, mutate } = useSubjectsList();
    const { Option } = Select;
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    if( isLoading ) {
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

    if( isError ) {
      return <ShowError error={ isError } />;
    }

    return (
      <>
      <Select defaultValue="-Seleccionar-" style={{ width: 300, marginLeft: 20 }} onChange={handleChange}>
        {
          subjects.map( ( subject ) => (
          <Option value={subject.id}>{subject.name}</Option>
          ) )
        }
      </Select>

        
      </>
    );
  }
;

export default SubjectsList;
