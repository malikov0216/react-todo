import React from 'react';
import {Collapse, Card, CardBody, Form, FormGroup, Label, Input, Button} from "reactstrap";

const TaskSort = props =>  {
		return (
				<div>
						<Button color="primary" onClick={props.openToggleSort} style={{ marginBottom: '1rem' }}>
								Сортировать
						</Button>
						<Collapse isOpen={props.isSortBtnOpen}>
								<Card>
										<CardBody>
												<Form>
														<FormGroup tag='fieldset'>

																<legend>Сортировка по:</legend>

																<div className='d-flex justify-content-around'>
																		<div>
																				<FormGroup check onClick={props.changeSort}>
																						<Label check>
																								<Input type="radio" name="sortField" value="username"/>
																								Имя пользователя
																						</Label>
																				</FormGroup>

																				<FormGroup check onClick={props.changeSort}>
																						<Label check>
																								<Input type="radio" name="sortField" value="email" />
																								E-mail
																						</Label>
																				</FormGroup>

																				<FormGroup check onClick={props.changeSort}>
																						<Label check>
																								<Input type="radio" name="sortField" value="status" />{' '}
																								Статус
																						</Label>
																				</FormGroup>
																		</div>

																		<div>
																				<FormGroup check onClick={props.changeSort}>
																						<Label check>
																								<Input type="radio" name="sortDirection" value="asc"/>
																								По возрастанию
																						</Label>
																				</FormGroup>

																				<FormGroup check onClick={props.changeSort}>
																						<Label check>
																								<Input type="radio" name="sortDirection" value="desc"/>
																								По убыванию
																						</Label>
																				</FormGroup>
																		</div>
																</div>

														</FormGroup>
												</Form>
										</CardBody>
								</Card>
						</Collapse>
				</div>
		);
};

export default TaskSort;