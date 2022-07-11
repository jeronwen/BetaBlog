import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export const EditPost = () => {
  let postId = useParams();
  React.useEffect(() => {
    setDisabledEdit(true);
    getPost();
  }, []);
  const { register, handleSubmit } = useForm();
  const [disabledEdit, setDisabledEdit] = React.useState(false);
  const [disabledUpload, setDisabledUpload] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [dataPost, setDataPost] = React.useState({
    title: "",
    description: "",
    text: "",
  });
  const getPost = async () => {
    try {
      const resp = await axios.get(
        `https://blog-api-semenov.herokuapp.com/posts/${postId.id}`
      );
      if (resp.statusText === "OK") {
        setDataPost({
          ...dataPost,
          title: resp.data.title,
          description: resp.data.description,
          text: resp.data.text,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editPost = (event) => {
    setDisabledEdit(false);
    setDataPost({ [event.target.name]: event.target.value });
  };
  const uploadFile = async () => {
    try {
      setDisabledUpload(true);
      const img = file[0];
      const formData = new FormData();
      formData.append("file", img);

      const res = await axios.post(
        "https://blog-api-semenov.herokuapp.com/posts/upload",
        formData,
        { headers: { "Content-type": "multipart/form-data" } }
      );
      if (res.statusText === "OK") {
        alert("Изображение загрузилось успешно!");
        setDisabledEdit(false);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
      setDisabledUpload(false);
      alert("Изображение не загрузилось!");
    }
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    setDisabledEdit(true);
    console.log(data);
    try {
      const reqPost = await axios.patch(
        `https://blog-api-semenov.herokuapp.com/posts/${postId.id}`,
        {
          title: data.title,
          text: data.text,
          description: data.description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (reqPost.statusText === "OK") {
        setDisabledEdit(false);
        alert("Статья изменена! :)");
      }
    } catch (err) {
      console.log(err);
      alert("Произошла ошибка");

      setDisabledEdit(false);
    }
  };
  return (
    <div className="create-post">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          <TextField
            {...register("title")}
            id="standard-multiline-flexible"
            label="Заголовок статьи"
            multiline
            maxRows={4}
            variant="standard"
            onChange={(e) => editPost(e)}
            value={dataPost.title}
          />
        </div>
        <br />

        <div className="short-desc">
          <h3>Короткое описание</h3>
          <TextareaAutosize
            {...register("description")}
            maxRows={4}
            style={{ width: 500, height: 100 }}
            onChange={(e) => editPost(e)}
            value={dataPost.description}
          />
        </div>
        <br />
        <h3>Изображение</h3>
        <div className="img">
          {/* <Input></Input> */}
          <Input
            onChange={() => {
              setFile();
            }}
            disabled={disabledUpload}
            className="file"
            type="file"
          ></Input>

          {/* <IconButton type="file" className="chooseFile" variant="contained">
            <AttachFileIcon></AttachFileIcon>
          </IconButton> */}
          <Button
            onClick={() => uploadFile()}
            variant="contained"
            disabled={disabledUpload}
          >
            Загрузить
          </Button>
        </div>
        <br />
        <h3>Полное описание</h3>
        <div className="full-desc">
          <TextareaAutosize
            {...register("text")}
            maxRows={4}
            style={{ width: 500, height: 100 }}
            onChange={(e) => editPost(e)}
            value={dataPost.text}
          />
        </div>
        <br />
        <Button type="submit" variant="contained" disabled={disabledEdit}>
          Опубликовать статью
        </Button>
      </form>
    </div>
  );
};