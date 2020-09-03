import { getList } from './api'

class AdminDraft {
  static getDraftList = async () => {
    try {
      const res = await getList()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

export default AdminDraft
