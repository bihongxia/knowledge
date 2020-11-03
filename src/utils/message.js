import { Message } from 'element-ui'
/**
 * 消息提示
 * @param {string} str
 * @returns {Boolean}
 */
export function showSuccessMessage(str) {
  Message({
    message: str || '添加成功',
    type: 'success',
    duration: 5 * 1000
  })
}
