import React, {Component} from 'react';
import { Button, Table,Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input } from 'reactstrap';
import {httpRequest} from '../../restClient/httpRequest';
import {CREATE,GET_LIST,UPDATE,DELETE} from "../../restClient/actionTypes";
import {
    CREATE_STAFF_API,
    GET_STAFFS_API,
    UPDATE_STAFF_API,
    DELETE_STAFF_API,
    DELETE_COURSE_API, UPDATE_COURSE_API, CREATE_COURSE_API
} from "../../restClient/apiSource";

export default class Staff extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            staffs : [],
            newData : {
                first_name : '',
                last_name : '',
                phone_number : ''
            },
            isEditStaff : false
        };

        this.toggle = this.toggle.bind(this);
        this.fetchStaffs = this.fetchStaffs.bind(this);
        this.addStaff = this.addStaff.bind(this);
        this.createStaff =  this.createStaff.bind(this);
        this.editStaff = this.editStaff.bind(this);
        this.updateStaff= this.updateStaff.bind(this);
        this.deleteStaff = this.deleteStaff.bind(this);

    }
    fetchStaffs(){
        return httpRequest(GET_LIST,GET_STAFFS_API).then((res)=>{
            let items =  res.data.data.map((item,key)=>{
                return {
                    ...item,
                    key : key
                }
            });
            this.setState({staffs : items});
        })
    }
    componentDidMount = () =>{
        this.fetchStaffs();
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
    addStaff(){
        this.toggle();
        let data = {
            first_name : '',
            last_name : '',
            phone_number : '',
            email_id : '',
            qualifications : ''
        }
        this.setState({isEditStaff : false,newData : data})
    }
    createStaff(){
        this.toggle();
        const params = {
            data : this.state.newData
        };
        params.data.phone_number = Number(params.data.phone_number);
        return httpRequest(CREATE,CREATE_STAFF_API,params).then((res)=>{
            this.fetchStaffs();
        })
    }
    editStaff(staff){
        this.toggle();
        this.setState({isEditStaff : true,newData : staff})
    }
    updateStaff(){
        this.toggle();
        const updatedStaff = this.state.newData;
        let params = {
            data :updatedStaff
        }
        delete updatedStaff.key;
        return httpRequest(UPDATE,UPDATE_STAFF_API,params).then(()=>{
            this.fetchStaffs();
        })
    }
    deleteStaff(id){
        let params = {
            id : id
        }
        return httpRequest(DELETE,DELETE_STAFF_API,params).then(()=>{
            this.fetchStaffs();
        })
    }
    render(){
        return(
            <div>
                <Button color="primary" onClick={this.addStaff}>+ Add Staff</Button>
                <div className="heading">List of Staff</div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.staffs !== undefined ? this.state.staffs.map((staff)=>
                        <tr>
                            <th scope="row">{staff.key+1}</th>
                            <td>{staff.first_name+' '+staff.last_name}</td>
                            <td>{staff.phone_number}</td>
                            <td><Button color='info' onClick={this.editStaff.bind(this,staff)}>Edit</Button></td>
                            <td><Button color="danger" onClick={this.deleteStaff.bind(this,staff.id)}>Delete</Button></td>
                        </tr>
                    ) : null}

                    </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Enter Staff Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">First Name</Label>
                                <Input type="text" name="first_name" id="first_name" onChange={this.handleChange.bind(this,'first_name')} value={this.state.newData.first_name}  placeholder="Enter First Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Last Name</Label>
                                <Input type="text" name="last_name" id="last_name" onChange={this.handleChange.bind(this,'last_name')} value={this.state.newData.last_name}  placeholder="Enter Last Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Phone Number</Label>
                                <Input type="text" name="phone_number" id="phone_number" onChange={this.handleChange.bind(this,'phone_number')} value={this.state.newData.phone_number}  placeholder="Enter Phone Number" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Email</Label>
                                <Input type="text" name="email_id" id="email_id" onChange={this.handleChange.bind(this,'email_id')} value={this.state.newData.email_id}  placeholder="Enter Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Qualifications</Label>
                                <Input type="text" name="qualifications" id="qualifications" onChange={this.handleChange.bind(this,'qualifications')} value={this.state.newData.qualifications}  placeholder="Enter Qualifications" />
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        {this.state.isEditStaff ? <Button color="primary" onClick={this.updateStaff}>UPDATE STAFF</Button> :
                            <Button color="primary" onClick={this.createStaff}>+ ADD STAFF</Button>
                        }
                        <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}