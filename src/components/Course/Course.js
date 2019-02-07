import React, {Component} from 'react';
import { Button, Table,Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input } from 'reactstrap';
import {httpRequest} from '../../restClient/httpRequest';
import {CREATE,GET_LIST,UPDATE,DELETE} from "../../restClient/actionTypes";
import {CREATE_COURSE_API,GET_COURSES_API,UPDATE_COURSE_API,DELETE_COURSE_API} from "../../restClient/apiSource";

export default class Course extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            courses : [],
            newData : {
                name : '',
                department : '',
                duration : ''
            },
            isEditCourse : false
        };

        this.toggle = this.toggle.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    fetchStudents(){
        return httpRequest(GET_LIST,GET_COURSES_API).then((res)=>{
            let items =  res.data.data.map((item,key)=>{
                return {
                    ...item,
                    key : key
                }
            });
            this.setState({courses : items});
        })
    }
    componentDidMount = () =>{
        this.fetchStudents();
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChange(input,event){
        const data =  this.state.newData;
        data[input] = event.target.value;
        this.setState({newData : data});
    }
    addCourse(){
        this.toggle();
        const details = {
            name : '',
            department : '',
            duration : ''
        }
        this.setState({isEditCourse : false,newData : details})
    }
    createCourse(){
       this.toggle();
       const params = {
           data : this.state.newData
       }
        return httpRequest(CREATE,CREATE_COURSE_API,params).then((res)=>{
            this.fetchStudents();
        })

    }
    editCourse(details){
        this.toggle();
        this.setState({isEditCourse : true,newData : details})
    }
    updateCourse(){
        this.toggle();
        const updatedCourse = this.state.newData;
        let params = {
            data :updatedCourse
        }
        delete updatedCourse.key;
        return httpRequest(UPDATE,UPDATE_COURSE_API,params).then(()=>{
            this.fetchStudents();
        })
    }
    deleteCourse(id){
        let params = {
            id : id
        }
        return httpRequest(DELETE,DELETE_COURSE_API,params).then(()=>{
            this.fetchStudents();
        })
    }
    render(){
        return(
            <div>
                <Button color="primary" onClick={this.addCourse}>+ Add Course</Button>
                <div className="heading">List of Courses</div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>DEPARTMENT</th>
                        <th>DURATION</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.courses !== undefined ? this.state.courses.map((course) =>
                        <tr>
                            <th scope="row">{course.key+1}</th>
                            <td>{course.name}</td>
                            <td>{course.department}</td>
                            <td>{course.duration}</td>
                            <td><Button color='info' onClick={this.editCourse.bind(this,course)}>Edit</Button></td>
                            <td><Button color="danger" onClick={this.deleteCourse.bind(this,course.id)}>Delete</Button></td>
                        </tr>
                    ) : null}
                    </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Enter Course Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" onChange={this.handleChange.bind(this,'name')}  value={this.state.newData.name} placeholder="Enter Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Department</Label>
                                <Input type="text" name="department" onChange={this.handleChange.bind(this,'department')} value={this.state.newData.department}  placeholder="Enter Department" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Duration</Label>
                                <Input type="text" name="duration" onChange={this.handleChange.bind(this,'duration')}  value={this.state.newData.duration} placeholder="Enter Duration" />
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        {this.state.isEditCourse ? <Button color="primary" onClick={this.updateCourse}>UPDATE COURSE</Button> : <Button color="primary" onClick={this.createCourse}>+ ADD COURSE</Button>}
                        <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}