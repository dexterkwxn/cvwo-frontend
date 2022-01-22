import 'antd/dist/antd.css';
import './main.css';
import { Button, Modal, Row, Col, Input, Select, Card, Tag, Form, Checkbox, Timeline, DatePicker, TimePicker, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoginOutlined } from '@ant-design/icons';
import { CirclePicker } from 'react-color'
import moment from 'moment';
import { TaskAction } from './redux/action_creators';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

function App({ 
  fetchAll, 
  addTask, 
  updateTask, 
  removeTask, 
  tasksData, 
  fetchAllStatus, 
  fetchAllError, 
  addTaskStatus, 
  addTaskError, 
  updateTaskStatus, 
  updateTaskError, 
  removeTaskStatus, 
  removeTaskError }) {

  const [form] = Form.useForm();
  const { Option } = Select;

  const [addTaskModalVisible, SetAddTaskModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment().format('yyyy-MM-DD'));
  const [loading, setLoading] = useState(false);
  const [addEntry, setAddEntry] = useState("");
  const [tasks, setTasks] = useState([]);
  const [timelineTasks, setTimelineTasks] = useState([]);
  const [lastCheckedValues, setLastCheckValues] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    if (!!tasksData && tasksData.length > 0) {
      setTasks(tasksData.map(e => {
        return {
          id: e.id,
          task: e.task,
          done: e.done,
          date: moment(e.date),
          colour: e.colour,
          info: e.info
        }
      }));
    }
  }, [tasksData]);

  useEffect(() => {
    setTimelineTasks(tasks.filter(e => e.date.isSame(moment(currentDate), 'day')));
  }, [currentDate, tasks]);

  useEffect(() => {
    // waits for successful api call and then fetches updated information
    if (loading && updateTaskStatus) {
      setLoading(false);
      fetchAll();
      SetAddTaskModalVisible(false);
    }
  }, [updateTaskStatus]);

  useEffect(() => {
    // waits for successful api call and then fetches updated information
    if (loading && addTaskStatus) {
      setLoading(false);
      fetchAll();
      SetAddTaskModalVisible(false);
    }
  }, [addTaskStatus]);

  useEffect(() => {
    // waits for successful api call and then fetches updated information
    if (removeTaskStatus) {
      fetchAll();
    }
  }, [removeTaskStatus]);

  const onChangeCheckedTask = checkedValues => {
    // updates UI first
    let newTasks = JSON.parse(JSON.stringify(tasks)).map(item => {
      return {
        ...item,
        date: moment(item.date),
        done: checkedValues.includes(item.id) ? true : false, 
      }
    });
    setTasks(newTasks);
    // find id of item that was checked
    let id = checkedValues[0];
    // update item
    removeTask(id);
    setLastCheckValues([id]);

  }

  const onChangeAddTask = e => {
    // saves input in quick add input box
    setAddEntry(e.target.value);
  }

  const onClickAddTask = () => {
    if (addEntry) {
      console.log("onClickAddTask() - ", addEntry);
      let request = {
        task: addEntry,
        done: false,
        date: null,
        colour: null,
        info: null
      }
      setLoading(true);
      addTask(request);
    }
  }

  const onChangeTaskSelect = (value, option) => {
    if (!!option) {
      form.setFieldsValue({
        name: option.children
      });
    }
  }

  const onFinishAddTaskModal = values => {
    // concat the date field
    let f_date = moment(values.date);
    f_date.hour(values.time.hours());
    f_date.minutes(values.time.minutes());
    f_date.seconds(values.time.seconds());
    let request = {
      task: values.name,
      done: false,
      date: f_date.toJSON(),
      colour: values.colour.hex,
      info: values.info
    }
    // sets the loading flag and calls the api
    setLoading(true);
    if (!!values.task) {
      updateTask(values.task, request);
    } else {
      addTask(request);
    }
  }



  return (
    <div>
      <div className='main-layout'>
        <div className='layout-background'>
          <div className='layout-content layout-background' >
            <Row gutter={24} >
              <Col span={12}>
                <Button className="custom-text-button" style={{ marginLeft: '8px' }}>
                  Good Morning, John
                </Button>
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Button className="custom-text-button" style={{ marginRight: '8px' }}>
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
                    height='50vh'
                  > 
                    <Checkbox.Group onChange={onChangeCheckedTask}>
                      {tasks.filter(e => !e.done).map(e => 
                      <Row key={e.id} className='task-item'>
                        <Checkbox checked={e.done} value={e.id}>{e.task}</Checkbox>
                      </Row>
                      )}
                    </Checkbox.Group>
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
                    <Button className='custom-blue-button' type='primary' onClick={() => SetAddTaskModalVisible(true)}>Add Task</Button>
                    <DatePicker allowClear={false} onChange={(value, dateString) => setCurrentDate(dateString)}></DatePicker>
                  </Row>
                  <Row style={{ margin: '20px 0px'}}>
                    <Col span={24}>
                      <InfiniteScroll
                        dataLength={tasks.length}
                        scrollableTarget="scrollableDiv"
                        height='50vh'
                      > 
                        <Timeline className='timeline' mode='left'>
                          {timelineTasks.filter(e => !e.done).sort((a, b) => a.date.isBefore(b.date) ? -1 : 1).map(e => 
                          <Timeline.Item key={e.id} >
                              <Tag>{e.date.format('HH:mm') + ' '}</Tag>
                              <Tag className='timeline__item' color={e.colour}>{e.task}</Tag>
                          </Timeline.Item>)}
                        </Timeline>
                      </InfiniteScroll>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Modal
              className='add-task-modal'
              centered 
              maskClosable={false}
              onCancel={() => SetAddTaskModalVisible(false)}
              visible={addTaskModalVisible} 
              title='Add Task'
              footer={null}
            >
              <Spin spinning={loading}>
                <Form form={form} requiredMark={false} onFinish={onFinishAddTaskModal}>
                  <Row>
                    <Col span={6}>
                      Task (Optional)
                    </Col>
                    <Col span={18}>
                      <Form.Item name='task'>
                        <Select 
                          showSearch 
                          showArrow={false} 
                          allowClear
                          onChange={onChangeTaskSelect}
                          defaultActiveFirstOption={false}
                          notFoundContent={null}
                          placeholder='Select if task is already created'>
                          {tasks.map(e =>
                          <Option key={e.id}>{e.task}</Option>  
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      Task Name
                    </Col>
                    <Col span={18}>
                      <Form.Item name='name' rules={[{required: true, message: " "}]} >
                        <Input placeholder='Task Name'/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      Date
                    </Col>
                    <Col span={18}>
                      <Form.Item name='date' rules={[{required: true, message: " "}]} >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      Time
                    </Col>
                    <Col span={18}>
                      <Form.Item name='time' rules={[{required: true, message: " "}]} >
                        <TimePicker format={'HH:mm'}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      Colour
                    </Col>
                    <Col span={18}>
                      <Form.Item name='colour' rules={[{required: true, message: " "}]} >
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
                        <Input placeholder='Optional' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify='center'>
                    <Button className='custom-blue-button' type='primary' htmlType='submit'>Add Task</Button>
                  </Row>
                </Form>
              </Spin>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  tasksData: state.task.tasks,
  fetchAllStatus: state.task.fetchAllStatus,
  fetchAllError: state.task.fetchAllError,
  addTaskStatus: state.task.addTaskStatus,
  addTaskError: state.task.addTaskError,
  updateTaskStatus: state.task.updateTaskStatus,
  updateTaskError: state.task.updateTaskError,
  removeTaskStatus: state.task.removeTaskStatus,
  removeTaskError: state.task.removeTaskError,
});

const mapDispatchToProps = {
  fetchAll: TaskAction.fetchAll,
  addTask: TaskAction.addTask,
  updateTask: TaskAction.updateTask,
  removeTask: TaskAction.removeTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);