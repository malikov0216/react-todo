import React from 'react'
import { Button, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import './TaskItem.css'

const TaskItem = props => {
    return (
            <ListGroupItem style={{margin: '30px 0'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <ListGroupItemHeading>
                        {props.text}
                    </ListGroupItemHeading>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <div>
                                    <Input
                                        disabled={!props.isAllowed}
                                        type="checkbox"
                                        id={props.id}
                                        checked={props.status}
                                        onChange={props.editTaskStatusHandler}
                                    />
                                    {props.status? <span>Выполнено</span>: <span>Не выполнено</span>}
                                </div>
                            </Label>
                        </FormGroup>
                    </Form>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <ListGroupItemText className='userData'>
                        <span className='userDataTitle'>
                            Имя пользователя:
                            <span className='userDataValue'> {props.username}</span>
                        </span>
                        <span className='userDataTitle'>
                            E-mail:
                            <span className='userDataValue'> {props.email}</span>
                        </span>
                    </ListGroupItemText>
                    {props.isAllowed &&
                        <Button
                            tag={Link}
                            to={`edit/${props.id}`}
                            color='primary'
                        >
                            Редактировать
                        </Button>
                    }
                </div>

                {props.isEdited ? <span className='text-primary'>Отредактировано администратором</span> : null }

            </ListGroupItem>
    )
};

export default TaskItem