import iconeFuncionario1 from "./funcionario1.jpg";
import { useEffect, useState } from "react";

export default function Funcionario1({
  valorAividadesPendentes,
  handleReceberAtividadeFuncionario,
  handleConcluirAtividade,
  errorFuncionario,
  receberAtividadeLimitador,
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (receberAtividadeLimitador) {
      setError("Não é possível receber mais Atividades");
    } else {
      setError("");
    }
  }, [receberAtividadeLimitador]);

  return (
    <div
      style={{
        marginLeft: "4%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>Funcionario 1</div>
      <img src={iconeFuncionario1} alt=""></img>
      <button
        disabled={receberAtividadeLimitador}
        style={{ marginBottom: "10px" }}
        onClick={handleReceberAtividadeFuncionario}
      >
        Receber Atividade
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleConcluirAtividade}>Concluir Atividade</button>
      {errorFuncionario && <p style={{ color: "red" }}>{errorFuncionario}</p>}
      <span>Atividades Pendentes</span>
      <span style={{ fontWeight: "bold", fontSize: 50, textAlign: "center" }}>
        {valorAividadesPendentes}
      </span>
    </div>
  );
}
