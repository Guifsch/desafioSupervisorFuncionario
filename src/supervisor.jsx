import { useState, useEffect } from "react";
import supervisor from "./supervisor.jpg";

import Funcionario1 from "./funcionario1.jsx";
import Funcionario2 from "./funcionario2.jsx";

export default function Supervisor() {
  const [atividadesDia, setAtividadesDia] = useState(0);
  const [atividadesConcluidas, setAtividadesConcluidas] = useState(0);
  const [valorAividadesPendentes, setValorAividadesPendentes] = useState(0);
  const [valorAividadesPendentes2, setValorAividadesPendentes2] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [metaDoDia, setMetaDoDia] = useState(true);
  const [receberAtividadeLimitador, setReceberAtividadeLimitador] =
    useState(false);
  const [errorFuncionario, setErrorFuncionario] = useState("");
  const [errorFuncionario2, setErrorFuncionario2] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (atividadesConcluidas >= atividadesDia && atividadesDia > 0) {
      setMetaDoDia(true);
    } else {
      setMetaDoDia(false);
    }
  }, [atividadesDia, atividadesConcluidas]);

  useEffect(() => {
    const atividadesTotal = valorAividadesPendentes + valorAividadesPendentes2;
    if (atividadesTotal === atividadesDia) {
      setReceberAtividadeLimitador(true);
    } else {
      setReceberAtividadeLimitador(false);
    }
  }, [valorAividadesPendentes, valorAividadesPendentes2, atividadesDia]);

  const handleReceberAtividadeFuncionario = (funcionario) => {
    if (funcionario === "1") {
      setValorAividadesPendentes((prevValor) => prevValor + 1);
    } else if (funcionario === "2") {
      setValorAividadesPendentes2((prevValor) => prevValor + 1);
    }
  };

  const handleConcluirAtividade = (funcionario) => {
    if (funcionario === "1") {
      if (valorAividadesPendentes === 0) {
        setErrorFuncionario("Não é possível concluir a atividade");
      } else {
        setErrorFuncionario("");
        setValorAividadesPendentes((prevValor) => prevValor - 1);
        supervisorContador();
      }
    } else if (funcionario === "2") {
      if (valorAividadesPendentes2 === 0) {
        setErrorFuncionario2("Não é possível concluir a atividade");
      } else {
        setErrorFuncionario2("");
        setValorAividadesPendentes2((prevValor) => prevValor - 1);
        supervisorContador();
      }
    }
  };

  const supervisorContador = () => {
    setAtividadesConcluidas((prevContador) => prevContador + 1);
  };

  const handleReceberAtividade = () => {
    const valor = parseInt(inputValue);
    if (!isNaN(valor) && valor > 0) {
      setAtividadesDia(valor);
      setAtividadesConcluidas(0);
    }
  };

  const handleBlur = () => {
    if (parseFloat(inputValue) <= 0) {
      setError("O valor não pode ser zero ou menor que zero.");
    } else {
      setError("");
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          marginLeft: "4%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>Supervisor</div>
        <img src={supervisor} alt=""></img>
        <input
          type="number"
          onBlur={handleBlur}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginTop: 10, marginBottom: 10 }}
        ></input>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={handleReceberAtividade}
          style={{ marginBottom: "10px" }}
        >
          Receber Atividade
        </button>
        <span>Atividades do Dia</span>
        <span style={{ fontWeight: "bold", fontSize: 50, textAlign: "center" }}>
          {atividadesDia}
        </span>

        <span>Atividades Concluídas</span>
        <span style={{ fontWeight: "bold", fontSize: 50, textAlign: "center" }}>
          {atividadesConcluidas}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Funcionario1
          supervisorContador={supervisorContador}
          atividadesDia={atividadesDia}
          valorAividadesPendentes={valorAividadesPendentes}
          handleReceberAtividadeFuncionario={() =>
            handleReceberAtividadeFuncionario("1")
          }
          handleConcluirAtividade={() => handleConcluirAtividade("1")}
          errorFuncionario={errorFuncionario}
          receberAtividadeLimitador={receberAtividadeLimitador}
        />
        <Funcionario2
          supervisorContador={supervisorContador}
          atividadesDia={atividadesDia}
          valorAividadesPendentes={valorAividadesPendentes2}
          handleReceberAtividadeFuncionario={() =>
            handleReceberAtividadeFuncionario("2")
          }
          handleConcluirAtividade={() => handleConcluirAtividade("2")}
          errorFuncionario={errorFuncionario2}
          receberAtividadeLimitador={receberAtividadeLimitador}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {atividadesDia === 0 && atividadesConcluidas === 0 ? null : (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Meta do Dia
              </span>
              {metaDoDia ? (
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  Alcançada
                </span>
              ) : (
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  Não Alcançada
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
