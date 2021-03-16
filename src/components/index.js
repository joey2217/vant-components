import Select from './select';
import DatePicker from './date-picker';
import DateRange from './date-range';

const components = [
  Select,
  DatePicker,
  DateRange,
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
  DateRange,
};
