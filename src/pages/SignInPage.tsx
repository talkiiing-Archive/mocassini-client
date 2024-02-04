import { FC, useState } from "react";
import { Button, Form, Input } from "react-daisyui";
import { client, LOCAL_STORAGE_TOKEN_KEY } from "../api/client.ts";

export const SignInPage: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
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
            Войти
          </Button>
        </div>

        <div className="form-control">
          <Button tag="a" href="/signup">
            У меня нет аккаунта
          </Button>
        </div>
      </Form>
    </div>
  );
};
