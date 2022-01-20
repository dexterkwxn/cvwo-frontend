import 'antd/dist/antd.css';
import './main.css';
import { Button, Modal, Row, Col, Input, Select, Card, Form, Checkbox, Timeline, DatePicker, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoginOutlined } from '@ant-design/icons';
import { CirclePicker } from 'react-color'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

function App({ language }) {

  const [form] = Form.useForm();
  const { Option } = Select;

  const [addTaskModalVisible, SetAddTaskModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("19-Jan-2022");
  const [selectedColour, setSelectedColour] = useState(null);
  const [addEntry, setAddEntry] = useState("");
  const [tasks, setTasks] = useState([
    {
      id : 1,
      task: "task 1",
      done: true,
      date: new Date(),
      colour: "#184CA7",
      info: "additional info",
    },
  ]);
  const onChangeAddTask = e => {
    setAddEntry(e.target.value);
  }

  const onClickAddTask = () => {
    console.log("onClickAddTask() - ", addEntry);
  }

  const onClickAddToTimeline = () => {
    SetAddTaskModalVisible(true);
  }

  const onChangeSelectDate = (date, dateString) => {
    setCurrentDate(dateString);
  }

  const onSelectColour = (colour, event) => {
    setSelectedColour(colour);
  }

  const onFinishAddTaskModal = values => {
    console.log(values);
  }



  return (
    <div>
      <div className='main-layout'>
        <div className='layout-background'>
          <div className='layout-content layout-background' >
            <Row gutter={24} >
              <Col span={12}>
                <Button className="custom-text-button">
                  Good Morning, John
                </Button>
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Button className="custom-text-button">
                  Timetable
                </Button>
              </Col>
            </Row>
            <Row gutter={24} className='container'>
              <Col span={12} className='container__child container__child--flex-vert'>
                <Card className="data-table" style={{ height: '70vh'}} title={<h3 className="text--ant-btn-padding text--bold">{'To-Do'}</h3>}>
                  <InfiniteScroll
                    dataLength={tasks.length}
                    scrollableTarget="scrollableDiv"
                  > 
                  {tasks.map(e => 
                  <Row key={e.id} container='container'>
                    <Checkbox>{e.task}</Checkbox>
                  </Row>
                  )}
                  </InfiniteScroll>
                  
                </Card>
                <div className='add-task'>
                  <Input className='add-task__input' size='large' onChange={onChangeAddTask}/>
                  <Button className='add-task__button' size='large' shape='circle' icon={<PlusOutlined />} onClick={onClickAddTask} />
                </div>
              </Col>
              <Col className='container__child' span={12} style={{ justifyContent:'end' }}>
                <Card className="data-table" style={{ height: '80vh' }}title={<h3 className="text--ant-btn-padding text--bold">{currentDate}</h3>}>
                  <Row className='container'>
                    <Button onClick={onClickAddToTimeline}>Add Task</Button>
                    <DatePicker onChange={onChangeSelectDate}></DatePicker>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Timeline className='timeline' mode='left'>
                        {tasks.map(e => 
                        <Timeline.Item className='timeline__item' >
                            {e.date.toTimeString().slice(0,5) + ' ' + e.task}
                        </Timeline.Item>)}
                      </Timeline>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Modal
              className='add-task-modal'
              centered 
              onCancel={() => SetAddTaskModalVisible(false)}
              visible={addTaskModalVisible} 
              title='Add Task'
              footer={null}
            >
              <Form form={form} requiredMark={false} onFinish={onFinishAddTaskModal}>
                <Row>
                  <Col span={6}>
                    Task
                  </Col>
                  <Col span={18}>
                    <Form.Item name='task'>
                      <Select 
                        showSearch 
                        showArrow={false} 
                        defaultActiveFirstOption={false}
                        notFoundContent={null}
                        placeholder='Enter new task or search for existing task'>
                        
                        {tasks.map(e =>
                        <Option key={e.id}>{e.task}</Option>  
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    Date
                  </Col>
                  <Col span={18}>
                    <Form.Item name='date'>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    Time
                  </Col>
                  <Col span={18}>
                    <Form.Item name='time'>
                      <TimePicker />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    Colour
                  </Col>
                  <Col span={18}>
                    <Form.Item name='colour'>
                      <CirclePicker />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    Additional Info
                  </Col>
                  <Col span={18}>
                    <Form.Item name='info'>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type='primary'  htmlType='submit'>Add Task</Button>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);