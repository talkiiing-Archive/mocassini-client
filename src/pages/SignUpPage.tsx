import { FC, useState } from "react";
import { Button, Form, Input } from "react-daisyui";
import { client, LOCAL_STORAGE_TOKEN_KEY } from "../api/client.ts";

export const SignUpPage: FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await client.user.createUser({
      username,
      password,
      name,
      surname,
    });

    const auth = await client.user.authenticate({
      username,
      password,
    });

    if (!auth.data?.token) {
      return alert("Неверный логин или пароль");
    }

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, auth.data.token);
    window.location.href = "/";
  };

  console.log(password);

  return (
    <div className="w-full">
      <Form
        className="max-w-xs mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Никнейм</span>
          </label>
          <Input
            placeholder="Введите никнейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Имя</span>
          </label>
          <Input
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Фамилия</span>
          </label>
          <Input
            placeholder="Введите фамилию"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Пароль</span>
          </label>
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-control mt-6">
          <Button type="submit" color="primary">
            Зарегистрироваться
          </Button>
        </div>

        <div className="form-control">
          <Button tag="a" href="/signin">
            У меня есть аккаунт
          </Button>
        </div>
      </Form>
    </div>
  );
};
