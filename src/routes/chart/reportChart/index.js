import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Button,Input,DatePicker,TreeSelect,Checkbox,Form } from 'antd'
import { color } from 'utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  Legend,
  Line
} from 'recharts'
import Container from '../Container'

const Search = Input.Search
const { MonthPicker, RangePicker } = DatePicker;


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  }, {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  }, {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  }, {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }, {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  }, {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  }, {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const mixData = [
  {
    name: 'Page A',
    uv: 4000,
    female: 2400,
    male: 2400,
  }, {
    name: 'Page B',
    uv: 3000,
    female: 1398,
    male: 2210,
  }, {
    name: 'Page C',
    uv: 2000,
    female: 9800,
    male: 2290,
  }, {
    name: 'Page D',
    uv: 2780,
    female: 3908,
    male: 2000,
  }, {
    name: 'Page E',
    uv: 1890,
    female: 4800,
    male: 2181,
  }, {
    name: 'Page F',
    uv: 2390,
    female: 3800,
    male: 2500,
  }, {
    name: 'Page G',
    uv: 3490,
    female: 4300,
    male: 2100,
  },
]
const colProps = {
  lg: 24,
}

const SimpleBarChart = ({barData=[],props=[]}) => (
  <Container>
    <ComposedChart data={barData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="month" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {
        props.map((v, i) => {
          if (v) {
            return (
              <Bar yAxisId="left" fill="#82ca9d"  dataKey={`items.${v}`} name="拆出资金"  />
            )
          }
        })
      }
      {
        props.map((v, i) => {
          if (v) {
            return (
            <Line yAxisId="right" stroke={color.purple} strokeWidth={3} dot={{ fill: color.purple }} activeDot={{ r: 5, strokeWidth: 0 }}  dataKey={`items.${v}yoy`} name={`${v}(同比)`}  />
          )
          }
        })
      }
      {
        props.map((v, i) => {
          if (v) {
            return (
              <Line yAxisId="right" stroke={color.red} strokeWidth={3} dot={{ fill: color.red }} activeDot={{ r: 5, strokeWidth: 0 }} dataKey={`items.${v}mom`} name={`${v}(环比)`} />
          )
          }
        })
      }
    </ComposedChart>
  </Container>
)

const StackedBarChart = () => (
  <Container>
    <BarChart data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="prop" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="items.拆出资金" name="拆出资金" stackId="a" fill="#8884d8" />
      <Bar yAxisId="left" dataKey="items.贵金属" name="贵金属" stackId="a" fill="#82ca9d" />
    </BarChart>
  </Container>
)

const MixBarChart = () => (
  <Container>
    <BarChart data={mixData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="female" stackId="a" fill="#8884d8" />
      <Bar dataKey="male" stackId="a" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#ffc658" />
    </BarChart>
  </Container>
)

// CustomShapeBarChart
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
        C${x + (width / 3)},${y + height} ${x + (width / 2)},${y + (height / 3)} ${x + (width / 2)}, ${y}
        C${x + (width / 2)},${y + (height / 3)} ${x + (2 * (width / 3))},${y + height} ${x + width}, ${y + height}
        Z`
}

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}



TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

const CustomShapeBarChart = () => (
  <Container>
    <BarChart data={mixData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label />
    </BarChart>
  </Container>
)


const EditorPage = ({
  report,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  }
}) => {


  function handleOk () {
    let fields = getFieldsValue();
    //dispatch({ type: 'report/prop', payload: {} })
    dispatch({ type: 'report/report', payload: getFieldsValue() })


  }

  const {code,props,date} = report.form;
  //

  return (
  <div className="content-inner">
    <Row gutter={24}  style={{marginBottom: 16}}>
      <Col span={8}>
        {getFieldDecorator('code', { initialValue: code })(<Search placeholder="股票编码"  />)}
      </Col>
    </Row>
    <Row gutter={24}  style={{marginBottom: 16}}>
      <Col span={8}>
        {getFieldDecorator('date', { initialValue: date })(<RangePicker/>)}
      </Col>
    </Row>
    <Row gutter={24} style={{marginBottom: 16}}>
      <Col span={16}>
        {getFieldDecorator('props', { initialValue: props })(<TreeSelect  placeholder="分析项目" treeData={report.prop}  multiple={true}
                    treeCheckable={true} style={{
          width: 600,
        }} />)}
      </Col>
      <Col span={8}>
        <Button type="primary" size="large" onClick={handleOk} >
          查询
        </Button>
      </Col>
    </Row>

    <Row gutter={32}>
      <Col span={4}>
        {
          report.form.props.map((v, i) => {
            if (v) {
              return (
                <p><h3>{v}</h3><br/>
                <Checkbox >同比</Checkbox><br/>
                <Checkbox >环比</Checkbox><br/></p>
              )
            }
          })
        }
      </Col>
      <Col span={20}>
        <Card>
          <SimpleBarChart barData={report.data} props={report.form.props} />
        </Card>
      </Col>
    </Row>
  </div>
)}

EditorPage.propTypes = {
  report: PropTypes.object,
}

export default connect(({ report }) => ({ report }))(Form.create()(EditorPage))
