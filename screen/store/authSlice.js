import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user_id: null,        // Thêm user_id vào trạng thái ban đầu
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      const { token, user_id } = action.payload;  // Lấy token và user_id từ payload
      state.token = token;
      state.user_id = user_id;                   // Lưu user_id vào store
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user_id = null;                      // Xóa user_id khi đăng xuất
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
