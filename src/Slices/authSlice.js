import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUserData, checkUser, checkUserName } from '../Api/UserHelpers/UsersConnection';


// Signup users
// export const signupUser = createAsyncThunk('auth/signupUser', async (userData,{rejectWithValue}) => {
//     try{
//         const user = await addUserData(userData);
//         console.log(user);
        
//         if(user){
//             const loginData = {username:user.username,password:user.password};
//             const isUserLogin = await checkUser(loginData);
//             console.log(isUserLogin);
            
//             return isUserLogin.data;
//         }
//     }catch (error){
//             return rejectWithValue("Alredy Taken");
//     }
// });

// Login users
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData,{rejectWithValue}) => {
    try{
        const isUserLogin = await checkUser(loginData);
        return isUserLogin.data;
    }catch (error){
       return rejectWithValue(error.response.data.message);
    } 
});



// Auth slice
const authSlice = createSlice({
    name:'auth',    
    initialState:{
        user:null,
        admin:null,
        loading:false,
        error:null,
    },
    reducers:{
        logOut:(state) => {
            state.user = null;
            state.admin = null;
            localStorage.removeItem('userRole');
            localStorage.removeItem('token');
            localStorage.removeItem('name');
        }
    },
    extraReducers:(builder) => {
        builder

        // // Sigin up user
        // .addCase(signupUser.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(signupUser.fulfilled, (state,action) => {
        //     const {token,user} = action.payload;
        //     console.log(action.payload);
            
        //     state.loading = false;
        //     state.user = user;
        //     localStorage.setItem('userRole',user.role);
        //     localStorage.setItem('token',token);
        // })
        // .addCase(signupUser.rejected, (state,action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })

        // Login user
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            const {token,user} = action.payload;
            state.loading = false;
            if(user.role === 'admin'){
                state.admin = user;
                localStorage.setItem('userRole',user.role);
                localStorage.setItem('token',token);
                localStorage.setItem('name',user.name);
            }else{
                state.user = user;
                localStorage.setItem('userRole',user.role);
                localStorage.setItem('token',token);
                localStorage.setItem('name',user.name);
            }
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {logOut} = authSlice.actions;
export default authSlice.reducer;