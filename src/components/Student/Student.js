import React, {Component} from 'react';
import { Button, Table,Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input } from 'reactstrap';
import {httpRequest} from '../../restClient/httpRequest';
import {CREATE,GET_LIST,UPDATE,DELETE} from "../../restClient/actionTypes";
import {
    CREATE_STUDENT_API,
    GET_STUDENTS_API,
    UPDATE_STUDENT_API,
    DELETE_STUDENT_API,
    CREATE_STAFF_API, UPDATE_STAFF_API, DELETE_STAFF_API
} from "../../restClient/apiSource";

export default class Student extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            students: [],
            newData: {
                first_name: '',
                last_name: '',
                phone_number: ''
            },
            isEditStudent: false
        };

        this.toggle = this.toggle.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.createStudent = this.createStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.updateStudent= this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    componentDidMount = () =>{
        this.fetchStudents();
    }
    handleChange(input,event){
        const data =  this.state.newData;
        data[input] = event.target.value;
        this.setState({newData : data});
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    fetchStudents(){
        return httpRequest(GET_LIST,GET_STUDENTS_API).then((res)=>{
            let items =  res.data.data.map((item,key)=>{
                return {
                    ...item,
                    key : key
                }
            });
            this.setState({students : items});
        })
    }
    addStudent(){
        this.toggle();
        let data = {
            first_name : '',
            last_name : '',
            phone_number : '',
            email : '',
            major_subject : '',
            course_id : '',
            staff_id : ''
        }
        this.setState({isEditStudent : false,newData : data})
    }
    createStudent(){
        this.toggle();
        const params = {
            data : this.state.newData
        };
        params.data.phone_number = Number(params.data.phone_number);
        return httpRequest(CREATE,CREATE_STUDENT_API,params).then((res)=>{
            this.fetchStudents();
        })
    }
    editStudent(student){
        this.toggle();
        this.setState({isEditStudent : true,newData : student})
    }
    updateStudent(){
        this.toggle();
        const updatedStudent = this.state.newData;
        let params = {
            data :updatedStudent
        }
        delete updatedStudent.key;
        return httpRequest(UPDATE,UPDATE_STUDENT_API,params).then(()=>{
            this.fetchStudents();
        })
    }
    deleteStudent(id){
        let params = {
            id : id
        }
        return httpRequest(DELETE,DELETE_STUDENT_API,params).then(()=>{
            this.fetchStudents();
        })
    }

    render(){
        return(
            <div>
                <Button color="primary" onClick={this.addStudent}>+ Add Student</Button>
                <div>List of Students</div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>MAJOR SUBJECT</th>
                        <th>PHONE</th>
                        <th>COURSE ID</th>
                        <th>STAFF ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students !== undefined ? this.state.students.map((student) =>
                        <tr>
                            <th scope="row">{student.key+1}</th>
                            <td>{student.first_name+' '+student.last_name}</td>
                            <td>{student.email}</td>
                            <td>{student.major_subject}</td>
                            <td>{student.phone_number}</td>
                            <td>{student.course_id}</td>
                            <td>{student.staff_id}</td>
                            <td><Button color='info' onClick={this.editStudent.bind(this,student)}>Edit</Button></td>
                            <td><Button color="danger">Delete</Button></td>
                        </tr>
                    ) : null}
                    </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Enter Student Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="first_name">First Name</Label>
                                <Input type="text" name="first_name" id="first_name" onChange={this.handleChange.bind(this,'first_name')} value={this.state.newData.first_name} placeholder="Enter First Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name">Last Name</Label>
                                <Input type="text" name="last_name" id="last_name" onChange={this.handleChange.bind(this,'last_name')} value={this.state.newData.last_name} placeholder="Enter Last Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone_number">Phone</Label>
                                <Input type="text" name="phone_number" id="phone_number" onChange={this.handleChange.bind(this,'phone_number')} value={this.state.newData.phone_number} placeholder="Enter phone Number" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" onChange={this.handleChange.bind(this,'email')} value={this.state.newData.email} placeholder="Enter Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="major_subject">Major Subject</Label>
                                <Input type="text" name="major_subject" id="major_subject" onChange={this.handleChange.bind(this,'major_subject')} value={this.state.newData.major_subject} placeholder="Enter Major Subject" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="staff_id">Staff Id</Label>
                                <Input type="select" name="staff_id" id="staff_id" onChange={this.handleChange.bind(this,'staff_id')} value={this.state.newData.staff_id}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="course_id">Course Id</Label>
                                <Input type="select" name="course_id" id="course_id" onChange={this.handleChange.bind(this,'course_id')} value={this.state.newData.course_id}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        { this.state.isEditStudent ? <Button color="primary" onClick={this.updateStudent}>UPDATE STUDENT</Button> :
                            <Button color="primary" onClick={this.createStudent}>+ ADD STUDENT</Button>
                        }
                        <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}