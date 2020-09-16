import Select from './select';
import DatePicker from './date-picker';
import DatetimePicker from './datetime-picker';

const components = [
  Select,
  DatePicker,
  DatetimePicker,
];

const install = function(Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};

export {
  Select,
  DatePicker,
  DatetimePicker,
};
