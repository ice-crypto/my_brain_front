import { Form, Input, Button, Checkbox, Select} from 'antd';

const QuestionSelect = ({options, onChange, index}) => {
  return (
    <Form.Item
       name="answer"
       fieldKey={[index, 'answer']}
     >
       <Select
         showSearch
         style={{ width: 200 }}
         placeholder="Select answer"
         onChange={onChange}
         options={options}
       ></Select>
     </Form.Item>
  )
}
export default QuestionSelect;
