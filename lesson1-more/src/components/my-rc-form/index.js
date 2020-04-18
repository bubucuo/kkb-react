import React, {Component} from "react";

export default function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    handleChange = event => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    };

    setFieldsValue = newStore => {
      this.setState(newStore);
    };

    getFieldValue = field => {
      return this.state[field];
    };

    getFieldsValue = () => {
      return this.state;
    };

    getFieldDecorator = (field, option) => InputCmp => {
      this.options[field] = option;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || "",
        onChange: this.handleChange
      });
    };

    validateFields = callback => {
      const state = {...this.state};
      let err = [];
      for (let field in this.options) {
        if (state[field] === undefined) {
          err.push({
            [field]: "error"
          });
        }
      }
      callback(err.length === 0 ? null : err, state);
    };

    getForm = () => {
      return {
        setFieldsValue: this.setFieldsValue,
        getFieldsValue: this.getFieldsValue,
        getFieldValue: this.getFieldValue,

        getFieldDecorator: this.getFieldDecorator,
        validateFields: this.validateFields
      };
    };
    render() {
      const form = this.getForm();
      return (
        <div className="border">
          <Cmp form={form} />
        </div>
      );
    }
  };
}
