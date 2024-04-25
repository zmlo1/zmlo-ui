import _ from 'lodash-es'

export function getTableColumnProps(data: Record<string, any>) {
  return _.pick(data || {}, ['width', 'minWidth', 'maxWidth', 'fixed'])
}
