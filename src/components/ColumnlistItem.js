import MyTypography from './MyTypography';
import SubPageLink from './SubPageLink';
import pure from 'recompose/pure'

const ColumnlistItem = (props) => (
  <MyTypography template="LIH3">
    <SubPageLink {...props} />
  </MyTypography>
)

export default pure(ColumnlistItem)
