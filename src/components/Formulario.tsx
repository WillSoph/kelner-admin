import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";
import SelectInput from "./SelectInput";
import { uploadImagem } from "../core/UploadImagem"
import { FaSpinner } from "react-icons/fa";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const [salvando, setSalvando] = useState(false);
    const id = props.cliente?.id
    const [categoria, setCategoria] = useState(props.cliente?.categoria ?? '')
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [descricao, setDescricao] = useState(props.cliente?.descricao ?? '')
    const [preco, setPreco] = useState(props.cliente?.preco ?? 0)
    const [imagem, setImagem] = useState<File | null>(null);

    const handleSalvar = async () => {
        setSalvando(true); // Define o estado para indicar que está salvando

        try {
            let clienteComImagem: Cliente;

            if (imagem instanceof File) {
                const urlImagem = await uploadImagem(imagem);
                clienteComImagem = new Cliente(nome, descricao, categoria, urlImagem, preco, id);
            } else if (typeof imagem === 'string') {
                clienteComImagem = new Cliente(nome, descricao, categoria, imagem, preco, id);
            } else {
                console.error('Imagem é nula.');
                return;
            }

            // Simula um atraso de 1 segundo para mostrar o loading
            // Em sua aplicação real, você substituirá isso pela lógica de salvamento real
            await new Promise((resolve) => setTimeout(resolve, 1000));

            props.clienteMudou?.(clienteComImagem);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        } finally {
            setSalvando(false); // Define o estado de volta para indicar que não está mais salvando
        }
    };

    return (
        <div>
            {id ? (
                <Entrada 
                    somenteLeitura
                    texto="Código" 
                    valor={id} 
                    className="mb-5"
                />
            ) : false}            
            <SelectInput 
                texto="Categoria" 
                tipo="select"
                valor={categoria} 
                valorMudou={setCategoria}
                className="mb-5"
            />
            <Entrada 
                texto="Nome" 
                valor={nome} 
                valorMudou={setNome}
                className="mb-5"
            />
            <Entrada 
                texto="Descrição" 
                valor={descricao} 
                valorMudou={setDescricao}
                className="mb-5"
            />
            <Entrada 
                texto="Preço" 
                tipo="number" 
                valor={preco} 
                valorMudou={setPreco}
                className="mb-5"
            />
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">
                    Imagem
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files?.[0] || null)}
                />
            </div>
            {props.cliente.imagemUrl && (
                <img src={props.cliente.imagemUrl} alt="Imagem do Cliente" className="w-32 h-32 object-cover mb-5" />
            )}
            <div className="flex justify-end mt-7">
                <button 
                    className="mr-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" 
                    onClick={handleSalvar}
                    disabled={salvando} // Desativa o botão enquanto estiver salvando
                >
                    {salvando ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" /> Salvando
                        </>
                    ) : (
                        id ? 'Alterar' : 'Salvar'
                    )}
                </button>
                <button onClick={props.cancelado} className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto">
                    Cancelar
                </button>
            </div>
        </div>
    )
}