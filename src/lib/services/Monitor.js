import PropTypes from 'prop-types';

class Monitor extends React.PureComponent {
  onClick = event => {
    const { services, name, children } = this.props;

    const elem = React.Children.only(children);

    //bypass click...if present
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }

    services.map(service => {
      if (typeof service === 'function') {
        service(`clicked ${name}`);
      }
    });
  };

  render() {
    const { name: _name, services: _services, children, ...props } = this.props;

    const elem = React.Children.only(children);

    return React.cloneElement(elem, { ...props, onClick: this.onClick });
  }
}

Monitor.defaultProps = {
  name: undefined,
  services: undefined
};

Monitor.propTypes = {
  name: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired
};

export default Monitor;
