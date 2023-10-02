import React, { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { SetAllSongs } from "../redux/userSlice";
import SongsList from "../components/SongsList";

function Home() {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getAllSongs = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/songs/get-all-songs', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(SetAllSongs(response.data.data));
      dispatch(HideLoading());
      console.log(response.data);
    }
    catch (err) {
      dispatch(HideLoading());
      console.log(err);
    }
  }

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <div className="flex justify-center p-10">
      <div className="text-center form-wrap flex flex-col p-10 mt-6 border border-gray-400">
        <h1 className="text-4xl font-bold p-4">Hello {user?.username}</h1>
        <SongsList/>
        <hr className="p-2" />
        <Link to="/register" className="text-gray-600 underline p-2">Register</Link>
        <Link to="/login" className="text-gray-600 underline">Login</Link>
      </div>
    </div>
  );
}

export default Home;
