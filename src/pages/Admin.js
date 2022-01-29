import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/Auth";
import "../styles/navigation.css";
import ShowError from "../components/ShowError";
import withAuth from "../hocs/withAuth";
import { useAllSubjectsList } from "../data/useAllSubjectsList";
import { useAllStudents } from "../data/useAllStudents";
import { useAllTeachers } from "../data/useAllTeachers";
import { useAnswersList } from "../data/useAnswersList";
import InfiniteScroll from "react-infinite-scroller";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

import useSWR from "swr";
import API from "../data";

import {
  Form,
  Input,
  Checkbox,
  Col,
  Row,
  Skeleton,
  Card,
  Layout,
  Avatar,
  Image,
  Select,
  Button,
  Collapse,
  List,
  Spin,
  message,
  Radio
} from "antd";
const { Sider, Content } = Layout;
function callback(key) {
  console.log(key);
}
const { Panel } = Collapse;



const AdminModule = () => {

  const { subjects, isLoadingS, isErrorS } = useAllSubjectsList();
  const { allStudents, isLoadingAS, isErrorAS } = useAllStudents();
  const { allTeachers, isLoadingAT, isErrorAT } = useAllTeachers();

  const { Option } = Select;
  const [subjectNumber, setSubjectNumber] = useState(null);
  const [chapterNumber, setChapterNumber] = useState(null);
  const [subjectUsers, setSubjectUsers] = useState(null);
  const [chapterValue, setChapterValue] = useState("-Seleccionar-");
  const options = [
    { label: 'Docente', value: 'ROLE_TEACHER' },
    { label: 'Estudiante', value: 'ROLE_STUDENT' },
  ];
  var { allSubjectUsers } = useSubjectUsers();
  const [subjectChapters, setSubjectChapters] = useState([]);
  const [subjectTeacher, setSubjectTeacher] = useState([]);
  const [subjectStudent, setSubjectStudent] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [newTeacher, setNewTeacher] = useState("");
  const [newStudent, setNewStudent] = useState("");


  const [chapterData, setChapterData] = useState(undefined);

  const [chapterDetails, setChapterDetails] = useState([]);

  const [surveySubject, setSurveySubject] = useState("");
  const [surveyChapter, setSurveyChapter] = useState("");
  const [data, setData] = useState(undefined);
  const [buttonData, setButtonData] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  function useSubjectUsers() {
    const { data, error, mutate } = useSWR(
        () => `/subjectUsers/${subjectUsers}`,
        API.fetcher
    );
    return {
      allSubjectUsers: data && data.data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  }


  const onFinish = async (values) => {
    console.log('Success:', values);

    const results = async () =>{
      await API.post(`/register`, {
        name: values.name,
        email:values.email,
        password:values.password,
        role: values.role
      });
    }
    results().then(async() => {
      console.log("TERMINOOOO");
      message.success("Usuario creado exitosamente");
      form.resetFields();
      setAllTeacher(await API.get(`/teachers`));
      setAllStudent(await API.get(`/students`));
    });
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error("LLene todos los campos");
  };

  async function handleChangeSubject(value) {
    console.log(`selected ${value}`);
    setChapterValue("-Seleccionar-");
    setSubjectNumber(value);
    setChapterNumber(null);
    setSurveySubject(value);
    setSurveyChapter("");
    setSubjectUsers(value);
    setLoading(true);
    setDisabled(true);
    setChapterDetails([]);
    setSubjectChapters(await API.get(`/subjectChapters/${value}`));
    setSubjectTeacher(await API.get(`/subjectTeacher/${value}`));
    setSubjectStudent(await API.get(`/subjectStudents/${value}`));
    setAllTeacher(await API.get(`/teachers`));
    setAllStudent(await API.get(`/students`));
    setLoading(false);
    setDisabled(false);
    setChapterData("close");
  }

  async function handleChangeStudent(value) {
    console.log(`student selected ${value}`);
    setNewStudent(value);
  }

  async function handleChangeTeacher(value) {
    console.log(`teacher selected ${value}`);
    setNewTeacher(value);
  }

  async function deleteTeacher() {
    console.log(subjectNumber + ' Subject Id');

    const results = async () =>
        await Promise.all(
            subjectTeacher.data.map(async (teacher, index) => {
              console.log(teacher.name + '     ' + teacher.id);
              await API.delete(`/delete-subject/${subjectNumber}/user/${teacher.id}`)
            })
        )
    results().then(async() => {
      console.log("TERMINOOOO");
      setSubjectTeacher(await API.get(`/subjectTeacher/${subjectNumber}`));
    });
  }

  async function deleteStudents() {
    console.log(subjectNumber + ' Subject Id');

    const results = async () =>
        await Promise.all(
          subjectStudent.data.map(async (subjectStudents, index) => {
            console.log(subjectStudents.name + '     ' + subjectStudents.id);
            await API.delete(`/delete-subject/${subjectNumber}/user/${subjectStudents.id}`)
          })
        )
    results().then(async() => {
      console.log("TERMINOOOO");
      setSubjectStudent(await API.get(`/subjectStudents/${subjectNumber}`));
    });

  }

  async function createStudent() {
    console.log(newStudent + ' Nuevo estudiante');

    const results = async () =>{
        await API.post(`/create-subject/${subjectNumber}/user/${newStudent}`)
    }
    results().then(async() => {
      console.log("TERMINOOOO");
      setSubjectStudent(await API.get(`/subjectStudents/${subjectNumber}`));
    });
  }

  async function createTeacher() {
    console.log(newTeacher + ' Nuevo estudiante');

    const results = async () =>{
        await API.post(`/create-subject/${subjectNumber}/user/${newTeacher}`)
    }
    results().then(async() => {
      console.log("TERMINOOOO");
      setSubjectTeacher(await API.get(`/subjectTeacher/${subjectNumber}`));
    });
  }

  if (isLoadingS) {
    return (
        <Row justify="center" gutter={30}>
          {[...new Array(9)].map((_, i) => (
              <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                <div style={{ textAlign: "center" }}>
                  <Skeleton.Image style={{ width: 200 }} />
                  <Card title="" extra="" cover="" loading />
                </div>
              </Col>
          ))}
        </Row>
    );
  }

  if (isErrorS) {
    return <ShowError error={isErrorS} />;
  }

  if (isLoadingAS) {
    return (
        <Row justify="center" gutter={30}>
          {[...new Array(9)].map((_, i) => (
              <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                <div style={{ textAlign: "center" }}>
                  <Skeleton.Image style={{ width: 200 }} />
                  <Card title="" extra="" cover="" loading />
                </div>
              </Col>
          ))}
        </Row>
    );
  }

  if (isErrorAS) {
    return <ShowError error={isErrorAS} />;
  }

  if (isLoadingAT) {
    return (
        <Row justify="center" gutter={30}>
          {[...new Array(9)].map((_, i) => (
              <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                <div style={{ textAlign: "center" }}>
                  <Skeleton.Image style={{ width: 200 }} />
                  <Card title="" extra="" cover="" loading />
                </div>
              </Col>
          ))}
        </Row>
    );
  }

  if (isErrorAT) {
    return <ShowError error={isErrorAT} />;
  }


  return (
      <>
        <Layout>
          <Content style={{ margin: "2rem" }}>
            <Row>
              <Col span={12}>
                <h1 className="title">Seleccionar Materia:</h1>
                {
                  <Select
                      defaultValue="-Seleccionar-"
                      style={{ width: 300, marginLeft: 20 }}
                      onChange={handleChangeSubject}
                  >
                    {subjects?.map((subject) => (
                        <Option value={subject.id}>{subject.name}</Option>
                    ))}
                  </Select>
                }
              </Col>
            </Row>
            <h2>Quitar usuarios</h2>
            <Row>
              <Col span={12}>
                <h1 className={"title"}>Docente: </h1>

                <Button
                    type="primary"
                    style={{ backgroundColor: "#001529", borderColor: "#001529" }}
                    onClick={deleteTeacher}
                >
                  Quitar Docente
                </Button>

                {subjectTeacher.data?.map((subjectTeachers) => (
                    <li value={subjectTeachers.id} >
                      {subjectTeachers.name}
                    </li>
                ))}
              </Col>
              <Col span={12}>
                <h1 className={"title"}>Estudiantes: </h1>

                <Button
                    type="primary"
                    style={{ backgroundColor: "#001529", borderColor: "#001529" }}
                    onClick={deleteStudents}
                >
                  Quitar Estudiantes
                </Button>

                {subjectStudent.data?.map((subjectStudents) => (
                    <li value={subjectStudents.id} >
                      {subjectStudents.name}
                    </li>
                ))}
              </Col>
            </Row>
            <hr style={{
                  color: "gray",
                  backgroundColor: "gray",
                  height: 1,
                  marginTop:"25px"
                }}
            />

            <h2>Agregar usuarios</h2>
            <Row>
              <Col span={12}>
                <h1 className={"title"}>Docentes: </h1>

                <Select
                    defaultValue="-Seleccionar-"
                    style={{ width: 300, marginLeft: 20 }}
                    onChange={handleChangeTeacher}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                  {allTeacher.data?.map((teacher) => (
                      <Option value={teacher.id}>{teacher.email}</Option>
                  ))}
                </Select>
                <br/>

                <Button
                    type="primary"
                    style={{ backgroundColor: "#001529", borderColor: "#001529", marginTop:"15px" }}
                    onClick={createTeacher}
                >
                  Agregar Docente
                </Button>

              </Col>
              <Col span={12}>
                <h1 className={"title"}>Estudiantes: </h1>

                <Select
                    defaultValue="-Seleccionar-"
                    style={{ width: 300, marginLeft: 20 }}
                    onChange={handleChangeStudent}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                  {allStudent.data?.map((student) => (
                      <Option value={student.id}>{student.email}</Option>
                  ))}
                </Select>
                <br/>

                <Button
                    type="primary"
                    style={{ backgroundColor: "#001529", borderColor: "#001529", marginTop:"15px"  }}
                    onClick={createStudent}
                >
                  Agregar Estudiante
                </Button>

              </Col>
            </Row>

            <hr style={{
              color: "gray",
              backgroundColor: "gray",
              height: 1,
              marginTop:"25px"
            }}
            />

            <h2>Crear usuarios</h2>
            <Row>
              <Col span={24}>
                <h1 className={"title"}>Datos de usuario: </h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 6,
                    }}
                    initialValues={{
                      remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                  <Form.Item
                      label="Nombre"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingresar nombre!',
                        },
                      ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                      label="Correo"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingresar correo!',
                        },
                      ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                      label="Contraseña"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingresar contraseña!',
                        },
                      ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                      name="role"
                      label="Tipo de usuario"
                      rules={[{ required: true, message: 'Por favor ingresar el tipo de usuario!' }]}
                  >
                    <Radio.Group buttonStyle="solid" >
                      <Radio.Button value="ROLE_TEACHER" >Docente</Radio.Button>
                      <Radio.Button value="ROLE_STUDENT" >Estudiante</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                  >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#001529", borderColor: "#001529", marginTop:"15px" }}
                    >
                      Crear usuario
                    </Button>
                  </Form.Item>
                </Form>

                <br/>

              </Col>
            </Row>

          </Content>
        </Layout>
      </>
  );

};
export default withAuth(AdminModule);
