import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile`,
        { headers: { Authorization: `Bearer ${token}`}}
    );
    return res.data;
});

const profileSlice = createSlice({
    name:"profile",
    initialState: {user:null, loading:false, error:null},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (s) => {s.loading=true})
            .addCase(fetchProfile.fulfilled, (s, a) =>{
                s.loading = false;
                s.user = a.payload;
            }) 
            .addCase(fetchProfile.rejected, (s) =>{
                s.loading = false;
                s.error = "Error loading profile";
            });
    }
    
});
export default profileSlice.reducer;
